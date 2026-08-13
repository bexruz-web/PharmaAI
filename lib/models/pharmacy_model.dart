import 'dart:convert';

class Pharmacy {
  final String id;
  final String name;
  final String? nameUz;
  final String? nameOz;
  final String? nameRu;
  final String? nameEn;
  final String? description;
  final String? descriptionUz;
  final String? descriptionOz;
  final String? descriptionRu;
  final String? descriptionEn;
  final String? logoUrl;
  final String? operatorPhone;
  final String? operatorUserId;
  final String? address;
  final double? locationLat;
  final double? locationLong;
  final double rating;
  final bool isOpen;

  const Pharmacy({
    required this.id,
    required this.name,
    this.nameUz,
    this.nameOz,
    this.nameRu,
    this.nameEn,
    this.description,
    this.descriptionUz,
    this.descriptionOz,
    this.descriptionRu,
    this.descriptionEn,
    this.logoUrl,
    this.operatorPhone,
    this.operatorUserId,
    this.address,
    this.locationLat,
    this.locationLong,
    this.rating = 0.0,
    this.isOpen = true,
  });

  String getName(String locale) {
    final loc = locale.toLowerCase();
    if (loc == 'ru' && nameRu != null && nameRu!.isNotEmpty) return nameRu!;
    if (loc == 'en' && nameEn != null && nameEn!.isNotEmpty) return nameEn!;
    if ((loc == 'oz' || loc == 'uz_cyrl') && nameOz != null && nameOz!.isNotEmpty) return nameOz!;
    if (nameUz != null && nameUz!.isNotEmpty) return nameUz!;
    return name;
  }

  String getDescription(String locale) {
    final loc = locale.toLowerCase();
    if (loc == 'ru' && descriptionRu != null && descriptionRu!.isNotEmpty) return descriptionRu!;
    if (loc == 'en' && descriptionEn != null && descriptionEn!.isNotEmpty) return descriptionEn!;
    if ((loc == 'oz' || loc == 'uz_cyrl') && descriptionOz != null && descriptionOz!.isNotEmpty) return descriptionOz!;
    if (descriptionUz != null && descriptionUz!.isNotEmpty) return descriptionUz!;
    return description ?? '';
  }

  factory Pharmacy.fromMap(Map<String, dynamic> map) {
    return Pharmacy(
      id: map['id']?.toString() ?? '',
      name: map['name']?.toString() ?? '',
      nameUz: map['name_uz']?.toString() ?? map['nameUz']?.toString() ?? map['name']?.toString(),
      nameOz: map['name_oz']?.toString() ?? map['nameOz']?.toString(),
      nameRu: map['name_ru']?.toString() ?? map['nameRu']?.toString(),
      nameEn: map['name_en']?.toString() ?? map['nameEn']?.toString(),
      description: map['description']?.toString(),
      descriptionUz: map['description_uz']?.toString() ?? map['descriptionUz']?.toString() ?? map['description']?.toString(),
      descriptionOz: map['description_oz']?.toString() ?? map['descriptionOz']?.toString(),
      descriptionRu: map['description_ru']?.toString() ?? map['descriptionRu']?.toString(),
      descriptionEn: map['description_en']?.toString() ?? map['descriptionEn']?.toString(),
      logoUrl: map['logo_url']?.toString() ?? map['logoUrl']?.toString(),
      operatorPhone: map['operator_phone']?.toString() ?? map['operatorPhone']?.toString(),
      operatorUserId: map['operator_user_id']?.toString() ?? map['operatorUserId']?.toString(),
      address: map['address']?.toString(),
      locationLat: (map['location_lat'] ?? map['locationLat']) != null
          ? double.tryParse((map['location_lat'] ?? map['locationLat']).toString())
          : null,
      locationLong: (map['location_long'] ?? map['locationLong']) != null
          ? double.tryParse((map['location_long'] ?? map['locationLong']).toString())
          : null,
      rating: double.tryParse((map['rating'] ?? 0.0).toString()) ?? 0.0,
      isOpen: map['is_open'] ?? map['isOpen'] ?? true,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'name_uz': nameUz,
      'name_oz': nameOz,
      'name_ru': nameRu,
      'name_en': nameEn,
      'description': description,
      'description_uz': descriptionUz,
      'description_oz': descriptionOz,
      'description_ru': descriptionRu,
      'description_en': descriptionEn,
      'logo_url': logoUrl,
      'operator_phone': operatorPhone,
      'operator_user_id': operatorUserId,
      'address': address,
      'location_lat': locationLat,
      'location_long': locationLong,
      'rating': rating,
      'is_open': isOpen,
    };
  }

  String toJson() => json.encode(toMap());

  factory Pharmacy.fromJson(String source) => Pharmacy.fromMap(json.decode(source) as Map<String, dynamic>);
}
