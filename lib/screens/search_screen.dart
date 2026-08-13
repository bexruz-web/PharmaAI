import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/supabase_service.dart';
import '../widgets/shimmer_loading.dart';
import 'medication_detail_screen.dart';

class SearchScreen extends StatefulWidget {
  final String locale;

  const SearchScreen({super.key, this.locale = 'uz'});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _query = '';
  dynamic _selectedCategoryId;

  late Future<List<Category>> _categoriesFuture;
  late Future<List<Medication>> _searchResultsFuture;

  @override
  void initState() {
    super.initState();
    _categoriesFuture = SupabaseService.instance.fetchCategories();
    _performSearch();
  }

  void _performSearch() {
    setState(() {
      _searchResultsFuture = SupabaseService.instance.fetchMedications(
        categoryId: _selectedCategoryId,
        searchQuery: _query,
      );
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Color(0xFF0F172A), size: 18),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Container(
          height: 44,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            color: const Color(0xFFF1F5F9),
            borderRadius: BorderRadius.circular(14),
          ),
          child: TextField(
            controller: _searchController,
            autofocus: true,
            onChanged: (val) {
              _query = val;
              _performSearch();
            },
            decoration: InputDecoration(
              hintText: 'Dori yoki faol modda qidiring...',
              hintStyle: const TextStyle(color: Color(0xFF94A3B8), fontSize: 13),
              border: InputBorder.none,
              isDense: true,
              suffixIcon: _query.isNotEmpty
                  ? IconButton(
                      icon: const Icon(Icons.clear, size: 18, color: Color(0xFF64748B)),
                      onPressed: () {
                        _searchController.clear();
                        _query = '';
                        _performSearch();
                      },
                    )
                  : null,
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          // Filter Chips Row
          FutureBuilder<List<Category>>(
            future: _categoriesFuture,
            builder: (context, snapshot) {
              if (!snapshot.hasData) return const SizedBox.shrink();

              final categories = snapshot.data!;
              return SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                child: Row(
                  children: [
                    ChoiceChip(
                      label: const Text('Barchasi • All', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                      selected: _selectedCategoryId == null,
                      selectedColor: const Color(0xFF10B981),
                      backgroundColor: Colors.white,
                      labelStyle: TextStyle(
                        color: _selectedCategoryId == null ? Colors.white : const Color(0xFF475569),
                      ),
                      onSelected: (selected) {
                        if (selected) {
                          _selectedCategoryId = null;
                          _performSearch();
                        }
                      },
                    ),
                    const SizedBox(width: 8),
                    ...categories.map((cat) {
                      final isSelected = _selectedCategoryId == cat.id;
                      return Padding(
                        padding: const EdgeInsets.only(right: 8.0),
                        child: ChoiceChip(
                          label: Text(
                            cat.getName(widget.locale),
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                          selected: isSelected,
                          selectedColor: const Color(0xFF10B981),
                          backgroundColor: Colors.white,
                          labelStyle: TextStyle(
                            color: isSelected ? Colors.white : const Color(0xFF475569),
                          ),
                          onSelected: (sel) {
                            _selectedCategoryId = sel ? cat.id : null;
                            _performSearch();
                          },
                        ),
                      );
                    }),
                  ],
                ),
              );
            },
          ),

          // Search Results
          Expanded(
            child: FutureBuilder<List<Medication>>(
              future: _searchResultsFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: 6,
                    itemBuilder: (_, __) => const Padding(
                      padding: EdgeInsets.only(bottom: 12.0),
                      child: ShimmerBox(width: double.infinity, height: 80, borderRadius: 16),
                    ),
                  );
                }

                final results = snapshot.data ?? [];
                if (results.isEmpty) {
                  return const Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.search_off_rounded, size: 64, color: Color(0xFF94A3B8)),
                        SizedBox(height: 12),
                        Text(
                          'Hech narsa topilmadi',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF64748B),
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'No medications match your query',
                          style: TextStyle(fontSize: 12, color: Color(0xFF94A3B8)),
                        ),
                      ],
                    ),
                  );
                }

                return ListView.separated(
                  padding: const EdgeInsets.all(16),
                  itemCount: results.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final med = results[index];
                    return InkWell(
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => MedicationDetailScreen(medication: med, locale: widget.locale),
                          ),
                        );
                      },
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: const Color(0xFFE2E8F0)),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 60,
                              height: 60,
                              decoration: BoxDecoration(
                                color: const Color(0xFFF1F5F9),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Stack(
                                children: [
                                  Positioned.fill(
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(12),
                                      child: med.imageUrl != null && med.imageUrl!.isNotEmpty
                                          ? Image.network(med.imageUrl!, fit: BoxFit.contain)
                                          : const Icon(Icons.medication_outlined, color: Color(0xFF94A3B8)),
                                    ),
                                  ),
                                  if (med.prescriptionRequired)
                                    Positioned(
                                      top: 4,
                                      left: 4,
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: const Color(0xFFEF4444),
                                          borderRadius: BorderRadius.circular(4),
                                        ),
                                        child: const Text(
                                          'Rx',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.extrabold,
                                            fontSize: 8,
                                          ),
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    med.getTitle(widget.locale),
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                      color: Color(0xFF0F172A),
                                    ),
                                  ),
                                  if (med.dosage != null)
                                    Text(
                                      med.dosage!,
                                      style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                                    ),
                                  const SizedBox(height: 4),
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
                            const Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFF94A3B8)),
                          ],
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
