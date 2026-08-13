import 'dart:convert';

class Medication {
  final String id;
  final String? pharmacyId;
  final dynamic categoryId;
  final String title;
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
