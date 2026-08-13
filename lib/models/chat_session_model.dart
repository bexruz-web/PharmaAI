import 'dart:convert';

class ChatSession {
  final String id;
  final String userId;
  final String chatType;
  final String? pharmacyId;
  final String? lastMessage;
  final DateTime? updatedAt;

  const ChatSession({
    required this.id,
    required this.userId,
    required this.chatType,
    this.pharmacyId,
    this.lastMessage,
    this.updatedAt,
  });

  factory ChatSession.fromMap(Map<String, dynamic> map) {
    DateTime? parsedUpdated;
    final rawUpdated = map['updated_at'] ?? map['updatedAt'];
    if (rawUpdated != null) {
      if (rawUpdated is DateTime) {
        parsedUpdated = rawUpdated;
      } else {
        parsedUpdated = DateTime.tryParse(rawUpdated.toString());
      }
    }

    return ChatSession(
      id: map['id']?.toString() ?? '',
      userId: map['user_id']?.toString() ?? map['userId']?.toString() ?? '',
      chatType: map['chat_type']?.toString() ?? map['chatType']?.toString() ?? 'ai',
      pharmacyId: map['pharmacy_id']?.toString() ?? map['pharmacyId']?.toString(),
      lastMessage: map['last_message']?.toString() ?? map['lastMessage']?.toString(),
      updatedAt: parsedUpdated,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'user_id': userId,
      'chat_type': chatType,
      'pharmacy_id': pharmacyId,
      'last_message': lastMessage,
      'updated_at': updatedAt?.toIso8601String(),
    };
  }

  String toJson() => json.encode(toMap());

  factory ChatSession.fromJson(String source) => ChatSession.fromMap(json.decode(source) as Map<String, dynamic>);
}
