import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/supabase_service.dart';
import 'pharmacy_profile_screen.dart';
import 'medication_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _currentLocale = 'uz'; // 'uz', 'oz', 'ru', 'en'
  dynamic _selectedCategoryId;
  String _searchQuery = '';

  late Future<List<Category>> _categoriesFuture;
  late Future<List<Pharmacy>> _pharmaciesFuture;
  late Future<List<Medication>> _medicationsFuture;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  void _fetchData() {
    setState(() {
      _categoriesFuture = SupabaseService.instance.fetchCategories();
      _pharmaciesFuture = SupabaseService.instance.fetchPharmacies();
      _medicationsFuture = SupabaseService.instance.fetchMedications(
        categoryId: _selectedCategoryId,
        searchQuery: _searchQuery,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFFECFDF5),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(Icons.local_pharmacy, color: Color(0xFF10B981), size: 22),
            ),
            const SizedBox(width: 8),
            const Text(
              'PharmaAI',
              style: TextStyle(
                fontWeight: FontWeight.extrabold,
                fontSize: 18,
                color: Color(0xFF0F172A),
              ),
            ),
          ],
        ),
        actions: [
          // Dynamic Language Switcher Dropdown
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 10),
            decoration: BoxDecoration(
              color: const Color(0xFFF1F5F9),
              borderRadius: BorderRadius.circular(20),
            ),
            child: DropdownButtonHideUnderline(
              child: DropdownButton<String>(
                value: _currentLocale,
                icon: const Icon(Icons.keyboard_arrow_down, size: 18, color: Color(0xFF64748B)),
                style: const TextStyle(
                  fontWeight: FontWeight.extrabold,
                  fontSize: 12,
                  color: Color(0xFF0F172A),
                ),
                onChanged: (String? newLocale) {
                  if (newLocale != null) {
                    setState(() {
                      _currentLocale = newLocale;
                    });
                  }
                },
                items: const [
                  DropdownMenuItem(value: 'uz', child: Text('🇺🇿 UZ')),
                  DropdownMenuItem(value: 'oz', child: Text('🇺🇿 ЎЗ')),
                  DropdownMenuItem(value: 'ru', child: Text('🇷🇺 RU')),
                  DropdownMenuItem(value: 'en', child: Text('🇬🇧 EN')),
                ],
              ),
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        color: const Color(0xFF10B981),
        onRefresh: () async => _fetchData(),
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Search Bar Input
              Container(
                height: 48,
                padding: const EdgeInsets.symmetric(horizontal: 14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.02),
                      blurRadius: 6,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    const Icon(Icons.search, color: Color(0xFF94A3B8), size: 20),
                    const SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        onChanged: (val) {
                          _searchQuery = val;
                          _medicationsFuture = SupabaseService.instance.fetchMedications(
                            categoryId: _selectedCategoryId,
                            searchQuery: _searchQuery,
                          );
                          setState(() {});
                        },
                        decoration: const InputDecoration(
                          hintText: 'Dori yoki dorixona qidiring...',
                          hintStyle: TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
                          border: InputBorder.none,
                          isDense: true,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              // 2. Categories Horizontal List
              const Text(
                'Kategoriyalar • Categories',
                style: TextStyle(
                  fontWeight: FontWeight.extrabold,
                  fontSize: 15,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 10),

              FutureBuilder<List<Category>>(
                future: _categoriesFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const SizedBox(
                      height: 40,
                      child: Center(
                        child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF10B981)),
                      ),
                    );
                  }

                  final categories = snapshot.data ?? [];
                  return SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        // "All" Category Chip
                        _buildCategoryChip(
                          label: 'Barchasi',
                          isSelected: _selectedCategoryId == null,
                          onTap: () {
                            setState(() {
                              _selectedCategoryId = null;
                              _medicationsFuture = SupabaseService.instance.fetchMedications(
                                categoryId: null,
                                searchQuery: _searchQuery,
                              );
                            });
                          },
                        ),
                        ...categories.map((cat) {
                          final isSelected = _selectedCategoryId == cat.id;
                          return _buildCategoryChip(
                            label: cat.getName(_currentLocale),
                            isSelected: isSelected,
                            onTap: () {
                              setState(() {
                                _selectedCategoryId = cat.id;
                                _medicationsFuture = SupabaseService.instance.fetchMedications(
                                  categoryId: cat.id,
                                  searchQuery: _searchQuery,
                                );
                              });
                            },
                          );
                        }),
                      ],
                    ),
                  );
                },
              ),

              const SizedBox(height: 20),

              // 3. Pharmacies Section (Compact Logo Cards Horizontal List)
              const Text(
                'Yaqin Dorixonalar • Pharmacies',
                style: TextStyle(
                  fontWeight: FontWeight.extrabold,
                  fontSize: 15,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 10),

              FutureBuilder<List<Pharmacy>>(
                future: _pharmaciesFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const SizedBox(
                      height: 50,
                      child: Center(
                        child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF10B981)),
                      ),
                    );
                  }

                  final pharmacies = snapshot.data ?? [];
                  if (pharmacies.isEmpty) {
                    return const Text(
                      'Dorixonalar topilmadi',
                      style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                    );
                  }

                  return SizedBox(
                    height: 54,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: pharmacies.length,
                      separatorBuilder: (_, __) => const SizedBox(width: 10),
                      itemBuilder: (context, index) {
                        final pharmacy = pharmacies[index];
                        final name = pharmacy.getName(_currentLocale);

                        return InkWell(
                          onTap: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_) => PharmacyProfileScreen(
                                  pharmacy: pharmacy,
                                  locale: _currentLocale,
                                ),
                              ),
                            );
                          },
                          borderRadius: BorderRadius.circular(30),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(30),
                              border: Border.all(color: const Color(0xFFE2E8F0)),
                            ),
                            child: Row(
                              children: [
                                // Compact Circle Avatar Logo
                                Container(
                                  width: 32,
                                  height: 32,
                                  decoration: const BoxDecoration(
                                    color: Color(0xFFECFDF5),
                                    shape: BoxShape.circle,
                                  ),
                                  child: ClipOval(
                                    child: pharmacy.logoUrl != null && pharmacy.logoUrl!.isNotEmpty
                                        ? Image.network(
                                            pharmacy.logoUrl!,
                                            fit: BoxFit.cover,
                                            errorBuilder: (ctx, err, stack) => const Icon(
                                              Icons.local_pharmacy,
                                              size: 18,
                                              color: Color(0xFF10B981),
                                            ),
                                          )
                                        : const Icon(
                                            Icons.local_pharmacy,
                                            size: 18,
                                            color: Color(0xFF10B981),
                                          ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  name,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                    color: Color(0xFF0F172A),
                                  ),
                                ),
                                const SizedBox(width: 4),
                                const Icon(Icons.star_rounded, size: 14, color: Color(0xFFF59E0B)),
                                Text(
                                  pharmacy.rating.toStringAsFixed(1),
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 11,
                                    color: Color(0xFFD97706),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  );
                },
              ),

              const SizedBox(height: 20),

              // 4. Medications Grid Section
              const Text(
                'Ommabop Dorilar • Medications',
                style: TextStyle(
                  fontWeight: FontWeight.extrabold,
                  fontSize: 15,
                  color: Color(0xFF0F172A),
                ),
              ),
              const SizedBox(height: 12),

              FutureBuilder<List<Medication>>(
                future: _medicationsFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Padding(
                      padding: EdgeInsets.all(40.0),
                      child: Center(
                        child: CircularProgressIndicator(color: Color(0xFF10B981)),
                      ),
                    );
                  }

                  final medications = snapshot.data ?? [];
                  if (medications.isEmpty) {
                    return const Padding(
                      padding: EdgeInsets.symmetric(vertical: 30.0),
                      child: Center(
                        child: Column(
                          children: [
                            Icon(Icons.search_off_outlined, size: 48, color: Color(0xFF94A3B8)),
                            SizedBox(height: 8),
                            Text(
                              'Dorilar topilmadi',
                              style: TextStyle(
                                color: Color(0xFF64748B),
                                fontSize: 13,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }

                  return GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: medications.length,
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.76,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                    ),
                    itemBuilder: (context, index) {
                      final med = medications[index];
                      final title = med.getTitle(_currentLocale);

                      return InkWell(
                        onTap: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) => MedicationDetailScreen(
                                medication: med,
                                locale: _currentLocale,
                              ),
                            ),
                          );
                        },
                        borderRadius: BorderRadius.circular(16),
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: const Color(0xFFE2E8F0)),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.02),
                                blurRadius: 6,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Image Aspect Ratio Container with loading/error handlers
                              Expanded(
                                child: Container(
                                  width: double.infinity,
                                  decoration: const BoxDecoration(
                                    color: Color(0xFFF1F5F9),
                                    borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
                                  ),
                                  child: ClipRRect(
                                    borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                                    child: med.imageUrl != null && med.imageUrl!.isNotEmpty
                                        ? Image.network(
                                            med.imageUrl!,
                                            fit: BoxFit.contain,
                                            loadingBuilder: (ctx, child, progress) {
                                              if (progress == null) return child;
                                              return const Center(
                                                child: SizedBox(
                                                  width: 20,
                                                  height: 20,
                                                  child: CircularProgressIndicator(
                                                    strokeWidth: 2,
                                                    color: Color(0xFF10B981),
                                                  ),
                                                ),
                                              );
                                            },
                                            errorBuilder: (ctx, err, stack) => const Icon(
                                              Icons.medication_outlined,
                                              size: 36,
                                              color: Color(0xFF94A3B8),
                                            ),
                                          )
                                        : const Icon(
                                            Icons.medication_outlined,
                                            size: 36,
                                            color: Color(0xFF94A3B8),
                                          ),
                                  ),
                                ),
                              ),

                              // Text Content
                              Padding(
                                padding: const EdgeInsets.all(10.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      title,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 13,
                                        color: Color(0xFF0F172A),
                                      ),
                                    ),
                                    if (med.dosage != null) ...[
                                      const SizedBox(height: 2),
                                      Text(
                                        med.dosage!,
                                        style: const TextStyle(
                                          fontSize: 11,
                                          color: Color(0xFF64748B),
                                        ),
                                      ),
                                    ],
                                    const SizedBox(height: 6),
                                    Text(
                                      '${med.price.toStringAsFixed(0)} so\'m',
                                      style: const TextStyle(
                                        fontWeight: FontWeight.extrabold,
                                        fontSize: 13,
                                        color: Color(0xFF10B981),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryChip({
    required String label,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return Padding(
      padding: const EdgeInsets.only(right: 8.0),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFF10B981) : Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: isSelected ? const Color(0xFF10B981) : const Color(0xFFE2E8F0),
            ),
          ),
          child: Text(
            label,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 12,
              color: isSelected ? Colors.white : const Color(0xFF475569),
            ),
          ),
        ),
      ),
    );
  }
}
