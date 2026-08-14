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

export const MOCK_PHARMACIES: PharmacyData[] = [
  {
    id: 'pharm-1',
    name: 'Grand Pharm',
    name_uz: 'Grand Pharm',
    name_ru: 'Гранд Фарм',
    name_en: 'Grand Pharm',
    logo_url: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=200&auto=format&fit=crop&q=80',
    address: 'Toshkent sh., Yunusobod t., Amir Temur ko\'chasi 45',
    rating: 4.9,
    is_open: true,
  },
  {
    id: 'pharm-2',
    name: 'Best Pharm',
    name_uz: 'Best Pharm',
    name_ru: 'Бест Фарм',
    name_en: 'Best Pharm',
    logo_url: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=200&auto=format&fit=crop&q=80',
    address: 'Toshkent sh., Chilonzor t., Muqimiy ko\'chasi 12',
    rating: 4.8,
    is_open: true,
  },
  {
    id: 'pharm-3',
    name: 'Oksimed',
    name_uz: 'Oksimed',
    name_ru: 'Оксимед',
    name_en: 'Oksimed',
    logo_url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200&auto=format&fit=crop&q=80',
    address: 'Toshkent sh., Mirzo Ulug\'bek t., Mustaqillik shoh ko\'chasi 88',
    rating: 4.7,
    is_open: true,
  },
  {
    id: 'pharm-4',
    name: '999 Dorixona',
    name_uz: '999 Dorixona',
    name_ru: 'Аптека 999',
    name_en: '999 Pharmacy',
    logo_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&auto=format&fit=crop&q=80',
    address: 'Toshkent sh., Shayxontohur t., Navoiy ko\'chasi 21',
    rating: 4.6,
    is_open: true,
  },
]

export const MOCK_CATEGORIES: CategoryData[] = [
  { id: 'cat-1', name: 'Og\'riqqoldiruvchi', name_uz: 'Og\'riqqoldiruvchi', name_ru: 'Обезболивающие', name_en: 'Painkillers' },
  { id: 'cat-2', name: 'Antibiotiklar', name_uz: 'Antibiotiklar', name_ru: 'Антибиотики', name_en: 'Antibiotics' },
  { id: 'cat-3', name: 'Vitamolar', name_uz: 'Vitamolar va Minerallar', name_ru: 'Витамины и минералы', name_en: 'Vitamins & Minerals' },
  { id: 'cat-4', name: 'Oshqozon-ichak', name_uz: 'Oshqozon-ichak', name_ru: 'ЖКТ', name_en: 'Digestive System' },
  { id: 'cat-5', name: 'Grip va Shamollash', name_uz: 'Grip va Shamollash', name_ru: 'Простуда и грипп', name_en: 'Cold & Flu' },
]

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: 'med-paracetamol-250',
    title: 'Paratsetamol 250 mg',
    title_uz: 'Paratsetamol rektal shamchalar 250 mg',
    title_ru: 'Парацетамол суппозитории 250 мг',
    title_en: 'Paracetamol suppositories 250 mg',
    brand_name: 'Radiks',
    price: 14500,
    dosage: '250 mg',
    is_in_stock: true,
    prescription_required: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    categories: MOCK_CATEGORIES[0],
    pharmacies: MOCK_PHARMACIES[0]
  },
  {
    id: 'med-paracetamol-500',
    title: 'Paratsetamol 500 mg',
    title_uz: 'Paratsetamol 500 mg tabletka',
    title_ru: 'Парацетамол 500 мг таблетки',
    title_en: 'Paracetamol 500 mg tablets',
    brand_name: 'PharmStandard',
    price: 9000,
    dosage: '500 mg',
    is_in_stock: true,
    prescription_required: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    categories: MOCK_CATEGORIES[0],
    pharmacies: MOCK_PHARMACIES[1]
  },
  {
    id: 'med-ketanov',
    title: 'Ketanov 10 mg',
    title_uz: 'Ketanov 10 mg tabletka',
    title_ru: 'Кетанов 10 мг таблетки',
    title_en: 'Ketanov 10 mg tablets',
    brand_name: 'Ranbaxy',
    price: 22000,
    dosage: '10 mg',
    is_in_stock: true,
    prescription_required: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80',
    categories: MOCK_CATEGORIES[0],
    pharmacies: MOCK_PHARMACIES[1]
  },
  {
    id: 'med-nurofen',
    title: 'Nurofen Express 200 mg',
    title_uz: 'Nurofen Express 200 mg kapsula',
    title_ru: 'Нурофен Экспресс 200 мг капсулы',
    title_en: 'Nurofen Express 200 mg capsules',
    brand_name: 'Reckitt Benckiser',
    price: 35000,
    dosage: '200 mg',
    is_in_stock: true,
    prescription_required: false,
    image_url: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=80',
    categories: MOCK_CATEGORIES[0],
    pharmacies: MOCK_PHARMACIES[0]
  },
  {
    id: 'med-aspirin',
    title: 'Aspirin 500 mg',
    title_uz: 'Aspirin 500 mg tabletka',
    title_ru: 'Аспирин 500 мг таблетки',
    title_en: 'Aspirin 500 mg tablets',
    brand_name: 'Bayer',
    price: 18000,
    dosage: '500 mg',
    is_in_stock: true,
    prescription_required: false,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=80',
    categories: MOCK_CATEGORIES[0],
    pharmacies: MOCK_PHARMACIES[2]
  },
  {
    id: 'med-noshpa',
    title: 'No-Shpa 40 mg',
    title_uz: 'No-Shpa 40 mg tabletka',
    title_ru: 'Но-шпа 40 мг таблетки',
    title_en: 'No-Shpa 40 mg tablets',
    brand_name: 'Chinoin',
    price: 26000,
    dosage: '40 mg',
    is_in_stock: true,
    prescription_required: false,
    image_url: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&auto=format&fit=crop&q=80',
    categories: MOCK_CATEGORIES[3],
    pharmacies: MOCK_PHARMACIES[3]
  }
]

export const fetchMedications = async (): Promise<Medication[]> => {
  try {
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

    if (!error && data && data.length > 0) {
      return data as Medication[]
    }
  } catch (err) {
    console.warn('Error fetching medications from Supabase, using mock dataset:', err)
  }

  return MOCK_MEDICATIONS
}

export const fetchCategories = async (): Promise<CategoryData[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')

    if (!error && data && data.length > 0) {
      return data as CategoryData[]
    }
  } catch (err) {
    console.warn('Error fetching categories from Supabase, using mock dataset:', err)
  }

  return MOCK_CATEGORIES
}

export const fetchPharmacies = async (): Promise<PharmacyData[]> => {
  try {
    const { data, error } = await supabase
      .from('pharmacies')
      .select('*')

    if (!error && data && data.length > 0) {
      return data as PharmacyData[]
    }
  } catch (err) {
    console.warn('Error fetching pharmacies from Supabase, using mock dataset:', err)
  }

  return MOCK_PHARMACIES
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
  if (!pharmRelation) return 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=200&auto=format&fit=crop&q=80'
  const pharm = Array.isArray(pharmRelation) ? pharmRelation[0] : pharmRelation
  if (pharm?.logo_url && pharm.logo_url.trim() !== '') {
    return pharm.logo_url
  }
  const pharmName = (pharm?.name || pharm?.name_uz || '').toLowerCase()
  if (pharmName.includes('grand')) return 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=200&auto=format&fit=crop&q=80'
  if (pharmName.includes('best')) return 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=200&auto=format&fit=crop&q=80'
  if (pharmName.includes('oksi')) return 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200&auto=format&fit=crop&q=80'
  if (pharmName.includes('999')) return 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&auto=format&fit=crop&q=80'
  return 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=200&auto=format&fit=crop&q=80'
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
