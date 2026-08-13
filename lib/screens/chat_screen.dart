import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/supabase_service.dart';

class ChatScreen extends StatefulWidget {
  final String userId;
  final String chatType;
  final String? pharmacyId;
  final String locale;

  const ChatScreen({
    super.key,
    required this.userId,
    this.chatType = 'ai',
    this.pharmacyId,
    this.locale = 'uz',
  });

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _messageController = TextEditingController();
  ChatSession? _session;
  List<ChatMessage> _messages = [];
  bool _isLoading = true;
  bool _isSending = false;

  @override
  void initState() {
    super.initState();
    _initChat();
  }

  Future<void> _initChat() async {
    setState(() => _isLoading = true);
    final session = await SupabaseService.instance.getOrCreateChatSession(
      widget.userId,
      widget.chatType,
      pharmacyId: widget.pharmacyId,
    );

    if (session != null) {
      _session = session;
      await _loadMessages(session.id);
    }
    if (mounted) setState(() => _isLoading = false);
  }

  Future<void> _loadMessages(String sessionId) async {
    try {
      final response = await SupabaseService.instance.client
          .from('chat_messages')
          .select('*')
          .eq('session_id', sessionId)
          .order('created_at', ascending: true);

      final data = response as List<dynamic>;
      if (mounted) {
        setState(() {
          _messages = data.map((map) => ChatMessage.fromMap(map as Map<String, dynamic>)).toList();
        });
      }
    } catch (e) {
      debugPrint('Error loading chat messages: $e');
    }
  }

  Future<void> _sendMessage() async {
    final text = _messageController.text.trim();
    if (text.isEmpty || _session == null || _isSending) return;

    _messageController.clear();
    setState(() => _isSending = true);

    final sentMessage = await SupabaseService.instance.sendChatMessage(
      _session!.id,
      widget.userId,
      'user',
      text,
    );

    if (sentMessage != null && mounted) {
      setState(() {
        _messages.add(sentMessage);
      });
    }

    if (mounted) setState(() => _isSending = false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        title: Text(
          widget.chatType == 'ai' ? 'AI Konsultant • AI Chat' : 'Farmatsevt • Pharmacist',
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.extrabold,
            color: Color(0xFF0F172A),
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Color(0xFF0F172A), size: 18),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator(color: Color(0xFF10B981)))
          : Column(
              children: [
                Expanded(
                  child: _messages.isEmpty
                      ? const Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.chat_bubble_outline_rounded, size: 56, color: Color(0xFF94A3B8)),
                              SizedBox(height: 12),
                              Text(
                                'Savolingizni yo\'llang',
                                style: TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF64748B),
                                ),
                              ),
                            ],
                          ),
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(16),
                          itemCount: _messages.length,
                          itemBuilder: (context, index) {
                            final msg = _messages[index];
                            final isMe = msg.senderId == widget.userId;

                            return Align(
                              alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                              child: Container(
                                margin: const EdgeInsets.only(bottom: 10),
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                                decoration: BoxDecoration(
                                  color: isMe ? const Color(0xFF10B981) : Colors.white,
                                  borderRadius: BorderRadius.circular(16),
                                  border: isMe ? null : Border.all(color: const Color(0xFFE2E8F0)),
                                ),
                                child: Text(
                                  msg.messageText,
                                  style: TextStyle(
                                    fontSize: 13,
                                    color: isMe ? Colors.white : const Color(0xFF0F172A),
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                ),
                Container(
                  padding: const EdgeInsets.all(12),
                  color: Colors.white,
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _messageController,
                          decoration: InputDecoration(
                            hintText: 'Xabar yozing...',
                            hintStyle: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
                            filled: true,
                            fillColor: const Color(0xFFF1F5F9),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(24),
                              borderSide: BorderSide.none,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      IconButton(
                        onPressed: _sendMessage,
                        icon: const Icon(Icons.send_rounded, color: Color(0xFF10B981)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}
