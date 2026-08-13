// src/services/medicationService.ts
import { supabase } from '../lib/supabase'

export interface CategoryData {
  id?: string
  name?: string | null
  name_uz?: string | null
  name_ru?: string | null
  name_en?: string | null
}

export interface PharmacyData {
  id?: string
  name?: string | null
  name_uz?: string | null
  name_ru?: string | null
  name_en?: string | null
  logo_url?: string | null
  address?: string | null
  rating?: number | null
  is_open?: boolean | null
}

export interface Medication {
  id: string
  title?: string | null
  title_uz?: string | null
  title_ru?: string | null
  title_en?: string | null
  brand_name?: string | null
  form_uz?: string | null
  form_ru?: string | null
  form_en?: string | null
  price: number
  dosage?: string | null
  manufacturer_country?: string | null
  is_in_stock: boolean
  description_uz?: string | null
  description_ru?: string | null
  description_en?: string | null
  prescription_required?: boolean | null
  image_url?: string | null
  expiry_date?: string | null
  category_id?: string | null
  pharmacy_id?: string | null
  categories?: CategoryData | CategoryData[] | null
  pharmacies?: PharmacyData | PharmacyData[] | null
}

export const fetchMedications = async (): Promise<Medication[]> => {
  const { data, error } = await supabase
    .from('medications')
    .select(`
      id,
      title,
      title_uz,
      title_ru,
      title_en,
      brand_name,
      form_uz,
      form_ru,
      form_en,
      price,
      dosage,
      manufacturer_country,
      is_in_stock,
      description_uz,
      description_ru,
      description_en,
      prescription_required,
      image_url,
      expiry_date,
      category_id,
      pharmacy_id,
      categories (
        id,
        name,
        name_uz,
        name_ru,
        name_en
      ),
      pharmacies (
        id,
        name,
        name_uz,
        name_ru,
        name_en,
        logo_url
      )
    `)

  if (error) {
    console.error('Error fetching medications from Supabase:', error)
    throw error
  }

  return (data as Medication[]) || []
}

export const fetchCategories = async (): Promise<CategoryData[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')

  if (error) {
    console.error('Error fetching categories from Supabase:', error)
    return []
  }

  return (data as CategoryData[]) || []
}

export const fetchPharmacies = async (): Promise<PharmacyData[]> => {
  const { data, error } = await supabase
    .from('pharmacies')
    .select('*')

  if (error) {
    console.error('Error fetching pharmacies from Supabase:', error)
    return []
  }

  return (data as PharmacyData[]) || []
}

// Fallback high-quality pharmaceutical images by category
const FALLBACK_IMAGES: Record<string, string> = {
  default: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
  pain: 'https://images.unsplash.com/photo-1550572017-edf7b64a4208?w=500&auto=format&fit=crop&q=80',
  antibiotic: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80',
  vitamin: 'https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?w=500&auto=format&fit=crop&q=80',
  digestive: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&auto=format&fit=crop&q=80',
  cold: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&auto=format&fit=crop&q=80',
}

export const getMedicationImage = (med: Medication): string => {
  if (med.image_url && med.image_url.trim() !== '') {
    return med.image_url
  }
  const catName = getCategoryName(med.categories, 'uz').toLowerCase()
  if (catName.includes('og\'riq') || catName.includes('боль')) return FALLBACK_IMAGES.pain
  if (catName.includes('antibiotik') || catName.includes('антибиоти')) return FALLBACK_IMAGES.antibiotic
  if (catName.includes('vitamin') || catName.includes('витамин')) return FALLBACK_IMAGES.vitamin
  if (catName.includes('oshqozon') || catName.includes('пищеварен')) return FALLBACK_IMAGES.digestive
  if (catName.includes('grip') || catName.includes('простуд')) return FALLBACK_IMAGES.cold
  return FALLBACK_IMAGES.default
}

export const getPharmacyLogo = (pharmRelation: PharmacyData | PharmacyData[] | null | undefined): string | null => {
  if (!pharmRelation) return null
  const pharm = Array.isArray(pharmRelation) ? pharmRelation[0] : pharmRelation
  return pharm?.logo_url || null
}

// Language helpers
export const getLocalizedTitle = (med: Medication, lang: string): string => {
  const l = lang.toLowerCase()
  if (l === 'uz' && med.title_uz) return med.title_uz
  if (l === 'ru' && med.title_ru) return med.title_ru
  if (l === 'en' && med.title_en) return med.title_en
  return med.title_uz || med.title || med.title_ru || med.title_en || 'Dori'
}

export const getLocalizedForm = (med: Medication, lang: string): string | null => {
  const l = lang.toLowerCase()
  if (l === 'uz' && med.form_uz) return med.form_uz
  if (l === 'ru' && med.form_ru) return med.form_ru
  if (l === 'en' && med.form_en) return med.form_en
  return med.form_uz || med.form_ru || med.form_en || null
}

export const getLocalizedDescription = (med: Medication, lang: string): string | null => {
  const l = lang.toLowerCase()
  if (l === 'uz' && med.description_uz) return med.description_uz
  if (l === 'ru' && med.description_ru) return med.description_ru
  if (l === 'en' && med.description_en) return med.description_en
  return med.description_uz || med.description_ru || med.description_en || null
}

export const getCategoryName = (catRelation: CategoryData | CategoryData[] | null | undefined, lang: string): string => {
  if (!catRelation) return ''
  const cat = Array.isArray(catRelation) ? catRelation[0] : catRelation
  if (!cat) return ''
  const l = lang.toLowerCase()
  if (l === 'uz' && cat.name_uz) return cat.name_uz
  if (l === 'ru' && cat.name_ru) return cat.name_ru
  if (l === 'en' && cat.name_en) return cat.name_en
  return cat.name_uz || cat.name || cat.name_ru || cat.name_en || ''
}

export const getPharmacyName = (pharmRelation: PharmacyData | PharmacyData[] | null | undefined): string => {
  if (!pharmRelation) return ''
  const pharm = Array.isArray(pharmRelation) ? pharmRelation[0] : pharmRelation
  return pharm?.name || pharm?.name_uz || pharm?.name_ru || pharm?.name_en || ''
}
