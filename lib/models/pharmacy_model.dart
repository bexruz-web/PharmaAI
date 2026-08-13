import 'dart:convert';

class Pharmacy {
  final String id;
  final String name;
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
    this.logoUrl,
    this.operatorPhone,
    this.operatorUserId,
    this.address,
    this.locationLat,
    this.locationLong,
    this.rating = 0.0,
    this.isOpen = true,
  });

  factory Pharmacy.fromMap(Map<String, dynamic> map) {
    return Pharmacy(
      id: map['id']?.toString() ?? '',
      name: map['name']?.toString() ?? '',
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
