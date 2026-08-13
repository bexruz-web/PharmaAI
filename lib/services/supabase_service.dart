import 'dart:typed_data';
import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/models.dart';

/// Singleton Service to interact with Supabase Database and Storage
class SupabaseService {
  SupabaseService._internal();
  static final SupabaseService instance = SupabaseService._internal();

  SupabaseClient get client => Supabase.instance.client;

  /// Fetch categories from 'categories' table
  Future<List<Category>> fetchCategories() async {
    try {
      final response = await client
          .from('categories')
          .select('*')
          .order('name', ascending: true);

      final data = response as List<dynamic>;
      return data.map((item) => Category.fromMap(item as Map<String, dynamic>)).toList();
    } catch (e, stack) {
      debugPrint('SupabaseService.fetchCategories Error: $e');
      debugPrint(stack.toString());
      return [];
    }
  }

  /// Fetch medications with optional categoryId, pharmacyId, and searchQuery filters
  Future<List<Medication>> fetchMedications({
    dynamic categoryId,
    String? pharmacyId,
    String? searchQuery,
  }) async {
    try {
      var query = client.from('medications').select('*');

      if (categoryId != null) {
        query = query.eq('category_id', categoryId);
      }

      if (pharmacyId != null && pharmacyId.isNotEmpty) {
        query = query.eq('pharmacy_id', pharmacyId);
      }

      if (searchQuery != null && searchQuery.trim().isNotEmpty) {
        query = query.ilike('title', '%${searchQuery.trim()}%');
      }

      final response = await query;
      final data = response as List<dynamic>;
      return data.map((item) => Medication.fromMap(item as Map<String, dynamic>)).toList();
    } catch (e, stack) {
      debugPrint('SupabaseService.fetchMedications Error: $e');
      debugPrint(stack.toString());
      return [];
    }
  }

  /// Fetch pharmacies from 'pharmacies' table
  Future<List<Pharmacy>> fetchPharmacies() async {
    try {
      final response = await client
          .from('pharmacies')
          .select('*')
          .order('name', ascending: true);

      final data = response as List<dynamic>;
      return data.map((item) => Pharmacy.fromMap(item as Map<String, dynamic>)).toList();
    } catch (e, stack) {
      debugPrint('SupabaseService.fetchPharmacies Error: $e');
      debugPrint(stack.toString());
      return [];
    }
  }

  /// Get existing chat session or create a new one in 'chat_sessions' table
  Future<ChatSession?> getOrCreateChatSession(
    String userId,
    String chatType, {
    String? pharmacyId,
  }) async {
    try {
      var query = client
          .from('chat_sessions')
          .select('*')
          .eq('user_id', userId)
          .eq('chat_type', chatType);

      if (pharmacyId != null) {
        query = query.eq('pharmacy_id', pharmacyId);
      }

      final existing = await query.maybeSingle();
      if (existing != null) {
        return ChatSession.fromMap(existing as Map<String, dynamic>);
      }

      // Create new chat session if none exists
      final newSessionMap = {
        'user_id': userId,
        'chat_type': chatType,
        if (pharmacyId != null) 'pharmacy_id': pharmacyId,
        'updated_at': DateTime.now().toIso8601String(),
      };

      final inserted = await client
          .from('chat_sessions')
          .insert(newSessionMap)
          .select()
          .single();

      return ChatSession.fromMap(inserted as Map<String, dynamic>);
    } catch (e, stack) {
      debugPrint('SupabaseService.getOrCreateChatSession Error: $e');
      debugPrint(stack.toString());
      return null;
    }
  }

  /// Send chat message in 'chat_messages' table and update last_message in session
  Future<ChatMessage?> sendChatMessage(
    String sessionId,
    String senderId,
    String senderType,
    String text, {
    String? mediaUrl,
  }) async {
    try {
      final messageMap = {
        'session_id': sessionId,
        'sender_id': senderId,
        'sender_type': senderType,
        'message_text': text,
        if (mediaUrl != null) 'media_url': mediaUrl,
        'is_read': false,
        'created_at': DateTime.now().toIso8601String(),
      };

      final inserted = await client
          .from('chat_messages')
          .insert(messageMap)
          .select()
          .single();

      // Update session last_message and updated_at
      await client.from('chat_sessions').update({
        'last_message': text,
        'updated_at': DateTime.now().toIso8601String(),
      }).eq('id', sessionId);

      return ChatMessage.fromMap(inserted as Map<String, dynamic>);
    } catch (e, stack) {
      debugPrint('SupabaseService.sendChatMessage Error: $e');
      debugPrint(stack.toString());
      return null;
    }
  }

  /// Upload media file bytes to Supabase Storage bucket and return public URL
  Future<String?> uploadMediaToStorage(
    String bucketName,
    List<int> fileBytes,
    String fileName,
  ) async {
    try {
      final bytes = Uint8List.fromList(fileBytes);
      final path = 'uploads/$fileName';

      await client.storage.from(bucketName).uploadBinary(
            path,
            bytes,
            fileOptions: const FileOptions(cacheControl: '3600', upsert: true),
          );

      final publicUrl = client.storage.from(bucketName).getPublicUrl(path);
      return publicUrl;
    } catch (e, stack) {
      debugPrint('SupabaseService.uploadMediaToStorage Error: $e');
      debugPrint(stack.toString());
      return null;
    }
  }
}
