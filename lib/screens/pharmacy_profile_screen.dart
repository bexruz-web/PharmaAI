import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/supabase_service.dart';
import 'medication_detail_screen.dart';

class PharmacyProfileScreen extends StatefulWidget {
  final Pharmacy pharmacy;
  final String locale;

  const PharmacyProfileScreen({
    super.key,
    required this.pharmacy,
    this.locale = 'uz',
  });

  @override
  State<PharmacyProfileScreen> createState() => _PharmacyProfileScreenState();
}

class _PharmacyProfileScreenState extends State<PharmacyProfileScreen> {
  late Future<List<Medication>> _medicationsFuture;

  @override
  void initState() {
    super.initState();
    _loadMedications();
  }

  void _loadMedications() {
    _medicationsFuture = SupabaseService.instance.fetchMedications(
      pharmacyId: widget.pharmacy.id,
    );
  }

  void _makePhoneCall(String? phoneNumber) {
    if (phoneNumber == null || phoneNumber.isEmpty) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Operator: $phoneNumber'),
        backgroundColor: const Color(0xFF10B981),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final pharmacyName = widget.pharmacy.getName(widget.locale);
    final pharmacyDesc = widget.pharmacy.getDescription(widget.locale);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: CustomScrollView(
        slivers: [
          // 1. Expanded Header Top Banner with dark modern gradient and logo
          SliverAppBar(
            expandedHeight: 220.0,
            pinned: true,
            backgroundColor: const Color(0xFF0F172A),
            leading: IconButton(
              icon: const Icon(Icons.arrow_back_ios_new, color: Colors.white, size: 20),
              onPressed: () => Navigator.of(context).pop(),
            ),
            flexibleSpace: FlexibleSpaceBar(
              title: Text(
                pharmacyName,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.extrabold,
                  fontSize: 16,
                ),
              ),
              background: Stack(
                fit: StackFit.expand,
                children: [
                  // Banner Background Image or Gradient
                  if (widget.pharmacy.logoUrl != null && widget.pharmacy.logoUrl!.isNotEmpty)
                    Image.network(
                      widget.pharmacy.logoUrl!,
                      fit: BoxFit.cover,
                      errorBuilder: (ctx, err, stack) => _buildBannerFallback(),
                    )
                  else
                    _buildBannerFallback(),

                  // Dark Overlay Gradient
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withOpacity(0.3),
                          const Color(0xFF0F172A).withOpacity(0.9),
                        ],
                      ),
                    ),
                  ),

                  // Center Logo Avatar
                  Positioned(
                    bottom: 50,
                    left: 20,
                    child: Container(
                      width: 64,
                      height: 64,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                        border: Border.all(color: const Color(0xFF10B981), width: 2.5),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.2),
                            blurRadius: 10,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: ClipOval(
                        child: widget.pharmacy.logoUrl != null && widget.pharmacy.logoUrl!.isNotEmpty
                            ? Image.network(
                                widget.pharmacy.logoUrl!,
                                fit: BoxFit.cover,
                                errorBuilder: (ctx, err, stack) => const Icon(
                                  Icons.local_pharmacy,
                                  color: Color(0xFF10B981),
                                  size: 32,
                                ),
                              )
                            : const Icon(
                                Icons.local_pharmacy,
                                color: Color(0xFF10B981),
                                size: 32,
                              ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // 2. Info Section Body
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Status & Rating Badges Row
                  Row(
                    children: [
                      // Open/Closed Badge
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: widget.pharmacy.isOpen
                              ? const Color(0xFFDCFCE7)
                              : const Color(0xFFFEE2E2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 6,
                              height: 6,
                              decoration: BoxDecoration(
                                color: widget.pharmacy.isOpen
                                    ? const Color(0xFF16A34A)
                                    : const Color(0xFFDC2626),
                                shape: BoxShape.circle,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              widget.pharmacy.isOpen ? 'Ochiq • Open' : 'Yopiq • Closed',
                              style: TextStyle(
                                color: widget.pharmacy.isOpen
                                    ? const Color(0xFF15803D)
                                    : const Color(0xFFB91C1C),
                                fontWeight: FontWeight.bold,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 10),

                      // Rating Badge
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFEF3C7),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.star_rounded, color: Color(0xFFD97706), size: 16),
                            const SizedBox(width: 4),
                            Text(
                              widget.pharmacy.rating.toStringAsFixed(1),
                              style: const TextStyle(
                                color: Color(0xFFB45309),
                                fontWeight: FontWeight.bold,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 14),

                  // Address
                  if (widget.pharmacy.address != null && widget.pharmacy.address!.isNotEmpty)
                    Row(
                      children: [
                        const Icon(Icons.location_on_outlined, color: Color(0xFF64748B), size: 18),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            widget.pharmacy.address!,
                            style: const TextStyle(
                              color: Color(0xFF475569),
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),

                  const SizedBox(height: 10),

                  // Operator Phone with direct tap-to-call action
                  if (widget.pharmacy.operatorPhone != null && widget.pharmacy.operatorPhone!.isNotEmpty)
                    InkWell(
                      onTap: () => _makePhoneCall(widget.pharmacy.operatorPhone),
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: const Color(0xFFECFDF5),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: const Color(0xFFA7F3D0)),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.phone_in_talk, color: Color(0xFF059669), size: 16),
                            const SizedBox(width: 8),
                            Text(
                              widget.pharmacy.operatorPhone!,
                              style: const TextStyle(
                                color: Color(0xFF047857),
                                fontWeight: FontWeight.bold,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                  if (pharmacyDesc.isNotEmpty) ...[
                    const SizedBox(height: 12),
                    Text(
                      pharmacyDesc,
                      style: const TextStyle(
                        color: Color(0xFF64748B),
                        fontSize: 13,
                        height: 1.4,
                      ),
                    ),
                  ],

                  const SizedBox(height: 24),

                  // Section Title: Available Medications
                  const Text(
                    'Mavjud Dorilar • Available Medications',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.extrabold,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 12),
                ],
              ),
            ),
          ),

          // 3. Filtered Medications List Grid
          FutureBuilder<List<Medication>>(
            future: _medicationsFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const SliverFillRemaining(
                  child: Center(
                    child: CircularProgressIndicator(color: Color(0xFF10B981)),
                  ),
                );
              }

              if (snapshot.hasError) {
                return SliverFillRemaining(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.error_outline, size: 48, color: Colors.redAccent),
                        const SizedBox(height: 12),
                        Text('Xatolik yuz berdi: ${snapshot.error}'),
                      ],
                    ),
                  ),
                );
              }

              final medications = snapshot.data ?? [];
              if (medications.isEmpty) {
                return const SliverFillRemaining(
                  hasScrollBody: false,
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: 40.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.inventory_2_outlined, size: 56, color: Color(0xFF94A3B8)),
                        SizedBox(height: 12),
                        Text(
                          'Hozircha dorilar topilmadi',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF64748B),
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }

              return SliverPadding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                sliver: SliverGrid(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.75,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                  ),
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final med = medications[index];
                      return _buildMedicationCard(context, med);
                    },
                    childCount: medications.length,
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildBannerFallback() {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
    );
  }

  Widget _buildMedicationCard(BuildContext context, Medication med) {
    final title = med.getTitle(widget.locale);

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
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFE2E8F0)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image Box with Conditional Rx Badge Stack
            Expanded(
              child: Container(
                width: double.infinity,
                decoration: const BoxDecoration(
                  color: Color(0xFFF1F5F9),
                  borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
                ),
                child: Stack(
                  children: [
                    Positioned.fill(
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
                                      width: 24,
                                      height: 24,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                        color: Color(0xFF10B981),
                                      ),
                                    ),
                                  );
                                },
                                errorBuilder: (ctx, err, stack) => const Icon(
                                  Icons.medication_outlined,
                                  size: 40,
                                  color: Color(0xFF94A3B8),
                                ),
                              )
                            : const Icon(
                                Icons.medication_outlined,
                                size: 40,
                                color: Color(0xFF94A3B8),
                              ),
                      ),
                    ),
                    // Render Rx badge ONLY IF prescriptionRequired is TRUE
                    if (med.prescriptionRequired)
                      Positioned(
                        top: 8,
                        left: 8,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                          decoration: BoxDecoration(
                            color: const Color(0xFFEF4444),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: const Text(
                            'Rx',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.extrabold,
                              fontSize: 10,
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),

            // Text Info
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
  }
}
