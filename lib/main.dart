import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await Supabase.initialize(
      url: 'https://mojuzlysxlydpjxfvwia.supabase.co',
      anonKey: 'sb_publishable_xztXiPxNsxkDwP6vK5Ikog_ebycVbyK',
    );
  } catch (e, stack) {
    debugPrint('Supabase Initialization Error: $e');
    debugPrint(stack.toString());
  }

  runApp(const PharmaAiApp());
}

class PharmaAiApp extends StatelessWidget {
  const PharmaAiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PharmaAI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF10B981)),
        useMaterial3: true,
      ),
      home: const Scaffold(
        body: Center(
          child: Text('PharmaAI Platform'),
        ),
      ),
    );
  }
}
