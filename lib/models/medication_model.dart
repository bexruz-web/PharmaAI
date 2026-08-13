import 'dart:convert';

class Medication {
  final String id;
  final String? pharmacyId;
  final dynamic categoryId;
  final String title;
  final String? titleUz;
  final String? titleOz;
  final String? titleRu;
  final String? titleEn;
  final String? description;
  final String? descriptionUz;
  final String? descriptionOz;
  final String? descriptionRu;
  final String? descriptionEn;
  final double price;
  final String? dosage;
  final DateTime? expiryDate;
  final String? manufacturerCountry;
  final String? imageUrl;
  final bool prescriptionRequired;
  final String? audioGuideUrl;
  final String? barcode;
  final bool isInStock;

  const Medication({
    required this.id,
    this.pharmacyId,
    this.categoryId,
    required this.title,
    this.titleUz,
    this.titleOz,
    this.titleRu,
    this.titleEn,
    this.description,
    this.descriptionUz,
    this.descriptionOz,
    this.descriptionRu,
    this.descriptionEn,
    required this.price,
    this.dosage,
    this.expiryDate,
    this.manufacturerCountry,
    this.imageUrl,
    this.prescriptionRequired = false,
    this.audioGuideUrl,
    this.barcode,
    this.isInStock = true,
  });

  String getTitle(String locale) {
    final loc = locale.toLowerCase();
    if (loc == 'ru' && titleRu != null && titleRu!.isNotEmpty) return titleRu!;
    if (loc == 'en' && titleEn != null && titleEn!.isNotEmpty) return titleEn!;
    if ((loc == 'oz' || loc == 'uz_cyrl') && titleOz != null && titleOz!.isNotEmpty) return titleOz!;
    if (titleUz != null && titleUz!.isNotEmpty) return titleUz!;
    return title;
  }

  String getDescription(String locale) {
    final loc = locale.toLowerCase();
    if (loc == 'ru' && descriptionRu != null && descriptionRu!.isNotEmpty) return descriptionRu!;
    if (loc == 'en' && descriptionEn != null && descriptionEn!.isNotEmpty) return descriptionEn!;
    if ((loc == 'oz' || loc == 'uz_cyrl') && descriptionOz != null && descriptionOz!.isNotEmpty) return descriptionOz!;
    if (descriptionUz != null && descriptionUz!.isNotEmpty) return descriptionUz!;
    return description ?? '';
  }

  factory Medication.fromMap(Map<String, dynamic> map) {
    DateTime? parsedExpiry;
    final rawExpiry = map['expiry_date'] ?? map['expiryDate'];
    if (rawExpiry != null) {
      if (rawExpiry is DateTime) {
        parsedExpiry = rawExpiry;
      } else {
        parsedExpiry = DateTime.tryParse(rawExpiry.toString());
      }
    }

    return Medication(
      id: map['id']?.toString() ?? '',
      pharmacyId: map['pharmacy_id']?.toString() ?? map['pharmacyId']?.toString(),
      categoryId: map['category_id'] ?? map['categoryId'],
      title: map['title']?.toString() ?? map['name']?.toString() ?? '',
      titleUz: map['title_uz']?.toString() ?? map['titleUz']?.toString() ?? map['title']?.toString() ?? map['name']?.toString(),
      titleOz: map['title_oz']?.toString() ?? map['titleOz']?.toString(),
      titleRu: map['title_ru']?.toString() ?? map['titleRu']?.toString(),
      titleEn: map['title_en']?.toString() ?? map['titleEn']?.toString(),
      description: map['description']?.toString(),
      descriptionUz: map['description_uz']?.toString() ?? map['descriptionUz']?.toString() ?? map['description']?.toString(),
      descriptionOz: map['description_oz']?.toString() ?? map['descriptionOz']?.toString(),
      descriptionRu: map['description_ru']?.toString() ?? map['descriptionRu']?.toString(),
      descriptionEn: map['description_en']?.toString() ?? map['descriptionEn']?.toString(),
      price: double.tryParse((map['price'] ?? 0.0).toString()) ?? 0.0,
      dosage: map['dosage']?.toString(),
      expiryDate: parsedExpiry,
      manufacturerCountry: map['manufacturer_country']?.toString() ?? map['manufacturerCountry']?.toString(),
      imageUrl: map['image_url']?.toString() ?? map['imageUrl']?.toString(),
      prescriptionRequired: map['prescription_required'] ?? map['prescriptionRequired'] ?? false,
      audioGuideUrl: map['audio_guide_url']?.toString() ?? map['audioGuideUrl']?.toString(),
      barcode: map['barcode']?.toString(),
      isInStock: map['is_in_stock'] ?? map['isInStock'] ?? true,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'pharmacy_id': pharmacyId,
      'category_id': categoryId,
      'title': title,
      'title_uz': titleUz,
      'title_oz': titleOz,
      'title_ru': titleRu,
      'title_en': titleEn,
      'description': description,
      'description_uz': descriptionUz,
      'description_oz': descriptionOz,
      'description_ru': descriptionRu,
      'description_en': descriptionEn,
      'price': price,
      'dosage': dosage,
      'expiry_date': expiryDate?.toIso8601String(),
      'manufacturer_country': manufacturerCountry,
      'image_url': imageUrl,
      'prescription_required': prescriptionRequired,
      'audio_guide_url': audioGuideUrl,
      'barcode': barcode,
      'is_in_stock': isInStock,
    };
  }

  String toJson() => json.encode(toMap());

  factory Medication.fromJson(String source) => Medication.fromMap(json.decode(source) as Map<String, dynamic>);
}
