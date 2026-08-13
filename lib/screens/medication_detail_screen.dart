import 'package:flutter/material.dart';
import '../models/models.dart';

class MedicationDetailScreen extends StatelessWidget {
  final Medication medication;
  final String locale;

  const MedicationDetailScreen({
    super.key,
    required this.medication,
    this.locale = 'uz',
  });

  String _formatDate(DateTime? dt) {
    if (dt == null) return 'Noma\'lum';
    final y = dt.year.toString().padLeft(4, '0');
    final m = dt.month.toString().padLeft(2, '0');
    final d = dt.day.toString().padLeft(2, '0');
    return '$y-$m-$d';
  }

  @override
  Widget build(BuildContext context) {
    final title = medication.getTitle(locale);
    final description = medication.getDescription(locale);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.extrabold,
            fontSize: 16,
            color: Color(0xFF0F172A),
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Color(0xFF0F172A), size: 18),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 1. High-Quality Image Box Container with Aspect Ratio
            AspectRatio(
              aspectRatio: 1.2,
              child: Container(
                width: double.infinity,
                margin: const EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.04),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: medication.imageUrl != null && medication.imageUrl!.isNotEmpty
                      ? Image.network(
                          medication.imageUrl!,
                          fit: BoxFit.contain,
                          loadingBuilder: (ctx, child, progress) {
                            if (progress == null) return child;
                            return const Center(
                              child: CircularProgressIndicator(color: Color(0xFF10B981)),
                            );
                          },
                          errorBuilder: (ctx, err, stack) => const Icon(
                            Icons.medication_liquid_outlined,
                            size: 80,
                            color: Color(0xFF94A3B8),
                          ),
                        )
                      : const Icon(
                          Icons.medication_liquid_outlined,
                          size: 80,
                          color: Color(0xFF94A3B8),
                        ),
                ),
              ),
            ),

            // 2. Main Details Section
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Badges Row (Rx/OTC & InStock)
                  Row(
                    children: [
                      // Prescription Status Badge
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: medication.prescriptionRequired
                              ? const Color(0xFFFEE2E2)
                              : const Color(0xFFE0F2FE),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          medication.prescriptionRequired ? 'Rx • Retseptli' : 'OTC • Retseptsiz',
                          style: TextStyle(
                            color: medication.prescriptionRequired
                                ? const Color(0xFFB91C1C)
                                : const Color(0xFF0369A1),
                            fontWeight: FontWeight.extrabold,
                            fontSize: 11,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),

                      // Stock Badge
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: medication.isInStock
                              ? const Color(0xFFDCFCE7)
                              : const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          medication.isInStock ? 'Mavjud • In Stock' : 'Tugagan • Out of stock',
                          style: TextStyle(
                            color: medication.isInStock
                                ? const Color(0xFF15803D)
                                : const Color(0xFF64748B),
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 12),

                  // Title
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.extrabold,
                      color: Color(0xFF0F172A),
                    ),
                  ),

                  const SizedBox(height: 6),

                  // Price
                  Text(
                    '${medication.price.toStringAsFixed(0)} so\'m',
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.extrabold,
                      color: Color(0xFF10B981),
                    ),
                  ),

                  const SizedBox(height: 16),
                  const Divider(color: Color(0xFFE2E8F0)),
                  const SizedBox(height: 16),

                  // Metadata Cards Grid / List
                  const Text(
                    'Ma\'lumotlar • Specifications',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  const SizedBox(height: 12),

                  _buildMetaTile(
                    icon: Icons.science_outlined,
                    label: 'Dozasi / Dosage',
                    value: medication.dosage ?? 'Noma\'lum',
                  ),
                  _buildMetaTile(
                    icon: Icons.public_outlined,
                    label: 'Ishlab chiqaruvchi / Country',
                    value: medication.manufacturerCountry ?? 'Noma\'lum',
                  ),
                  _buildMetaTile(
                    icon: Icons.calendar_today_outlined,
                    label: 'Yaroqlilik muddati / Expiry Date',
                    value: _formatDate(medication.expiryDate),
                  ),
                  if (medication.barcode != null && medication.barcode!.isNotEmpty)
                    _buildMetaTile(
                      icon: Icons.qr_code_outlined,
                      label: 'Shtrix-kod / Barcode',
                      value: medication.barcode!,
                    ),

                  const SizedBox(height: 16),

                  // Description
                  if (description.isNotEmpty) ...[
                    const Text(
                      'Tavsif • Description',
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF0F172A),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      description,
                      style: const TextStyle(
                        fontSize: 13,
                        color: Color(0xFF475569),
                        height: 1.5,
                      ),
                    ),
                  ],

                  const SizedBox(height: 40),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMetaTile({
    required IconData icon,
    required String label,
    required String value,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFF1F5F9)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFFECFDF5),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: const Color(0xFF10B981), size: 18),
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: const TextStyle(
                  fontSize: 11,
                  color: Color(0xFF64748B),
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF0F172A),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
