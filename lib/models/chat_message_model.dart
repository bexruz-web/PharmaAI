import 'dart:convert';

class ChatMessage {
  final String id;
  final String sessionId;
  final String senderId;
  final String senderType;
  final String messageText;
  final String? mediaUrl;
  final bool isRead;
  final DateTime? createdAt;

  const ChatMessage({
    required this.id,
    required this.sessionId,
    required this.senderId,
    required this.senderType,
    required this.messageText,
    this.mediaUrl,
    this.isRead = false,
    this.createdAt,
  });

  factory ChatMessage.fromMap(Map<String, dynamic> map) {
    DateTime? parsedCreated;
    final rawCreated = map['created_at'] ?? map['createdAt'];
    if (rawCreated != null) {
      if (rawCreated is DateTime) {
        parsedCreated = rawCreated;
      } else {
        parsedCreated = DateTime.tryParse(rawCreated.toString());
      }
    }

    return ChatMessage(
      id: map['id']?.toString() ?? '',
      sessionId: map['session_id']?.toString() ?? map['sessionId']?.toString() ?? '',
      senderId: map['sender_id']?.toString() ?? map['senderId']?.toString() ?? '',
      senderType: map['sender_type']?.toString() ?? map['senderType']?.toString() ?? 'user',
      messageText: map['message_text']?.toString() ?? map['messageText']?.toString() ?? '',
      mediaUrl: map['media_url']?.toString() ?? map['mediaUrl']?.toString(),
      isRead: map['is_read'] ?? map['isRead'] ?? false,
      createdAt: parsedCreated,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'session_id': sessionId,
      'sender_id': senderId,
      'sender_type': senderType,
      'message_text': messageText,
      'media_url': mediaUrl,
      'is_read': isRead,
      'created_at': createdAt?.toIso8601String(),
    };
  }

  String toJson() => json.encode(toMap());

  factory ChatMessage.fromJson(String source) => ChatMessage.fromMap(json.decode(source) as Map<String, dynamic>);
}
