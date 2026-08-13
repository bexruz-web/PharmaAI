import 'dart:convert';

class Category {
  final dynamic id;
  final String name;
  final String? nameUz;
  final String? nameOz;
  final String? nameRu;
  final String? nameEn;

  const Category({
    required this.id,
    required this.name,
    this.nameUz,
    this.nameOz,
    this.nameRu,
    this.nameEn,
  });

  String getName(String locale) {
    final loc = locale.toLowerCase();
    if (loc == 'ru' && nameRu != null && nameRu!.isNotEmpty) return nameRu!;
    if (loc == 'en' && nameEn != null && nameEn!.isNotEmpty) return nameEn!;
    if ((loc == 'oz' || loc == 'uz_cyrl') && nameOz != null && nameOz!.isNotEmpty) return nameOz!;
    if (nameUz != null && nameUz!.isNotEmpty) return nameUz!;
    return name;
  }

  factory Category.fromMap(Map<String, dynamic> map) {
    return Category(
      id: map['id'],
      name: map['name']?.toString() ?? '',
      nameUz: map['name_uz']?.toString() ?? map['nameUz']?.toString() ?? map['name']?.toString(),
      nameOz: map['name_oz']?.toString() ?? map['nameOz']?.toString(),
      nameRu: map['name_ru']?.toString() ?? map['nameRu']?.toString(),
      nameEn: map['name_en']?.toString() ?? map['nameEn']?.toString(),
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
    };
  }

  String toJson() => json.encode(toMap());

  factory Category.fromJson(String source) => Category.fromMap(json.decode(source) as Map<String, dynamic>);
}
