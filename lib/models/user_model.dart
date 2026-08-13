import 'dart:convert';

class User {
  final String id;
  final String phoneNumber;
  final String? avatarUrl;
  final String role;
  final String language;

  const User({
    required this.id,
    required this.phoneNumber,
    this.avatarUrl,
    this.role = 'user',
    this.language = 'uz',
  });

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id']?.toString() ?? '',
      phoneNumber: map['phone_number']?.toString() ?? map['phoneNumber']?.toString() ?? '',
      avatarUrl: map['avatar_url']?.toString() ?? map['avatarUrl']?.toString(),
      role: map['role']?.toString() ?? 'user',
      language: map['language']?.toString() ?? 'uz',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'phone_number': phoneNumber,
      'avatar_url': avatarUrl,
      'role': role,
      'language': language,
    };
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source) as Map<String, dynamic>);

  User copyWith({
    String? id,
    String? phoneNumber,
    String? avatarUrl,
    String? role,
    String? language,
  }) {
    return User(
      id: id ?? this.id,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      role: role ?? this.role,
      language: language ?? this.language,
    );
  }
}
