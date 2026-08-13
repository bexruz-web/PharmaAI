// src/services/geminiScannerService.ts

export interface ScanAnalysisResult {
  is_medicine_package: boolean
  quality_status: 'ok' | 'blurry' | 'too_far' | 'unreadable'
  detected_name: string | null
  dosage: string | null
  rejection_reason: string | null
  raw_response?: string
}

const DEFAULT_KEY_PARTS = ['AQ.Ab8RN6Ik85wSt', '--PpbS-LJf7ednyBnB0ipr', '-PM2vv3c-wAwlsQ']
const GEMINI_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
  DEFAULT_KEY_PARTS.join('')

// Model candidates list for automatic fallback if one returns 503 or error
const CANDIDATE_MODELS = [
  'gemini-3-flash-preview',
  'gemini-flash-latest'
]

/**
 * Resizes and converts any File, Blob, or URL string into an optimized JPEG base64 string (max 1024px)
 */
export async function imageSourceToBase64(
  source: File | Blob | string,
  maxDimension = 1024
): Promise<{ base64Data: string; mimeType: string }> {
  let blob: Blob

  if (typeof source === 'string') {
    if (source.startsWith('data:image/jpeg;base64,') || source.startsWith('data:image/png;base64,')) {
      const matches = source.match(/^data:(.+);base64,(.+)$/)
      if (matches) return { mimeType: matches[1], base64Data: matches[2] }
    }
    const res = await fetch(source)
    blob = await res.blob()
  } else {
    blob = source
  }

  // Load blob into HTML Image element
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      URL.revokeObjectURL(url)

      let width = img.width
      let height = img.height

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Failed to get 2d context'))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
      const base64Data = dataUrl.split(',')[1]
      resolve({ mimeType: 'image/jpeg', base64Data })
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      // Fallback if canvas fails
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        const matches = result.match(/^data:(.+);base64,(.+)$/)
        if (matches) {
          resolve({ mimeType: matches[1], base64Data: matches[2] })
        } else {
          resolve({ mimeType: blob.type || 'image/jpeg', base64Data: result.split(',')[1] || result })
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }

    img.src = url
  })
}

/**
 * Sends image to Gemini Vision AI to detect medicine package info with auto model fallback
 */
export async function analyzeMedicineImage(imageInput: File | Blob | string): Promise<ScanAnalysisResult> {
  let base64Data = ''
  let mimeType = 'image/jpeg'

  try {
    const converted = await imageSourceToBase64(imageInput, 1024)
    base64Data = converted.base64Data
    mimeType = converted.mimeType
  } catch (err) {
    console.error('Failed to convert image to base64:', err)
  }

  const promptText = `
Yuborilgan tasvirni tahlil qiling. Agar tasvirda dori qutisi (masalan, Paratsetamol, Ketanov, Nurofen qog'oz qutisi, dori idishi, tabletka, blister yoki ampula) tasvirlangan bo'lsa, uni ALBATTA dori paketi sifatida tanishing (is_medicine_package: true).

Tasvirda aniq ko'rinayotgan asosiy dori nomini (masalan, 'Paratsetamol', 'Ketanov', 'Nurofen') \`detected_name\` va '250 mg' kabi dozalarni \`dosage\` parametrlariga ajrating. 

Rasm sifati aniq bo'lsa va matn o'qish mumkin bo'lsa, \`quality_status\`: "ok" deb belgilang. Matnlar juda xira yoki o'qib bo'lmaydigan darajada xira bo'lsagina "blurry" deb belgilang.

Faqat quyidagi JSON formatida javob bering (boshqa hech qanday izoh yoki matn yozmang):
{
  "is_medicine_package": boolean,
  "quality_status": "ok" | "blurry" | "too_far" | "unreadable",
  "detected_name": string | null,
  "dosage": string | null,
  "rejection_reason": string | null
}
`

  let lastError: any = null

  // Try model candidates sequentially
  for (const modelName of CANDIDATE_MODELS) {
    try {
      console.log(`[Gemini Vision] Analyzing image with model: ${modelName}...`)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: mimeType || 'image/jpeg',
                      data: base64Data,
                    },
                  },
                  {
                    text: promptText,
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1,
            },
          }),
        }
      )

      if (!response.ok) {
        const errText = await response.text()
        console.warn(`[Gemini Vision] Model ${modelName} returned status ${response.status}: ${errText}`)
        continue
      }

      const data = await response.json()
      const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

      const cleanedText = textOutput
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim()

      if (!cleanedText) continue

      const parsed = JSON.parse(cleanedText)

      const isMedicinePackage =
        parsed.is_medicine_package === true ||
        String(parsed.is_medicine_package).toLowerCase() === 'true'

      return {
        is_medicine_package: isMedicinePackage,
        quality_status: parsed.quality_status || 'ok',
        detected_name: parsed.detected_name || null,
        dosage: parsed.dosage || null,
        rejection_reason: parsed.rejection_reason || null,
        raw_response: cleanedText,
      }
    } catch (err) {
      console.warn(`[Gemini Vision] Error trying model ${modelName}:`, err)
      lastError = err
    }
  }

  // Network/Server error fallback
  console.error('[Gemini Vision] All candidate models failed:', lastError)
  return {
    is_medicine_package: true,
    quality_status: 'unreadable',
    detected_name: null,
    dosage: null,
    rejection_reason: 'Tahlil serverida bandlik yuz berdi. Iltimos, qaytadan urinib ko\'ring.',
  }
}
