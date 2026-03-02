import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import '../providers/water_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/glass_card.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final logs = ref.watch(waterProvider);

    // Calculate total from watched logs for better reactivity
    final today = DateTime.now();
    final total = logs
        .where((e) =>
            e.timestamp.year == today.year &&
            e.timestamp.month == today.month &&
            e.timestamp.day == today.day)
        .fold(0.0, (sum, item) => sum + item.amount);

    const goal = 2500.0;
    final progress =
        (goal > 0 && total.isFinite) ? (total / goal).clamp(0.0, 1.0) : 0.0;

    // Safety check for display
    final totalDisplay = total.isFinite ? total.toInt() : 0;
    final goalDisplay = goal.isFinite ? goal.toInt() : 2500;

    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: AppTheme.bgGradient,
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Gap(20),
                Text(
                  'Stay Hydrated',
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: AppTheme.textDark,
                      ),
                ),
                Text(
                  'Track your daily water intake',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: AppTheme.textLight,
                      ),
                ),
                const Gap(30),
                GlassCard(
                  height: 240,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Stack(
                        alignment: Alignment.center,
                        children: [
                          SizedBox(
                            height: 120,
                            width: 120,
                            child: CircularProgressIndicator(
                              value: progress,
                              strokeWidth: 12,
                              backgroundColor: Colors.white.withAlpha(40),
                              color: AppTheme.primaryBlue,
                              strokeCap: StrokeCap.round,
                            ),
                          ),
                          Column(
                            children: [
                              Text(
                                '$totalDisplay',
                                style: Theme.of(context)
                                    .textTheme
                                    .headlineMedium
                                    ?.copyWith(
                                      fontWeight: FontWeight.bold,
                                      color: AppTheme.textDark,
                                    ),
                              ),
                              Text(
                                'ml',
                                style: Theme.of(context)
                                    .textTheme
                                    .bodyMedium
                                    ?.copyWith(
                                      color: AppTheme.textLight,
                                    ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const Gap(20),
                      Text(
                        'Daily Goal: $goalDisplay ml',
                        style:
                            Theme.of(context).textTheme.titleMedium?.copyWith(
                                  color: AppTheme.textDark.withAlpha(180),
                                ),
                      ),
                    ],
                  ),
                ),
                const Gap(30),
                Text(
                  'Recent Logs',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const Gap(10),
                Expanded(
                  child: logs.isEmpty
                      ? Center(
                          child: Text(
                            'No logs yet. Start drinking!',
                            style: TextStyle(color: AppTheme.textLight),
                          ),
                        )
                      : ListView.builder(
                          physics: const BouncingScrollPhysics(),
                          itemCount: logs.length,
                          itemBuilder: (context, index) {
                            final log = logs[logs.length - 1 - index];
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 12),
                              child: GlassCard(
                                height: 70,
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 20),
                                borderRadius: 16,
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      children: [
                                        const Icon(Icons.water_drop,
                                            color: AppTheme.primaryBlue),
                                        const Gap(15),
                                        Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              '${log.amount.isFinite ? log.amount.toInt() : 0} ml',
                                              style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                                fontSize: 16,
                                              ),
                                            ),
                                            Text(
                                              log.formattedTime,
                                              style: TextStyle(
                                                color: AppTheme.textLight,
                                                fontSize: 12,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.delete_outline,
                                          color: Colors.redAccent, size: 20),
                                      onPressed: () => ref
                                          .read(waterProvider.notifier)
                                          .removeIntake(log.id),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                ),
              ],
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () => _showAddDialog(context, ref),
          backgroundColor: Colors.white.withAlpha(180),
          elevation: 0,
          label: const Text('Add Water',
              style: TextStyle(
                  color: AppTheme.textDark, fontWeight: FontWeight.bold)),
          icon: const Icon(Icons.add, color: AppTheme.primaryBlue),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
            side: BorderSide(color: Colors.white.withAlpha(80), width: 1.5),
          ),
        ),
      ),
    );
  }

  void _showAddDialog(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.transparent,
        contentPadding: EdgeInsets.zero,
        content: GlassCard(
          height: 300,
          width: 300,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Add Intake',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Gap(20),
              Wrap(
                spacing: 15,
                runSpacing: 15,
                children: [250, 500, 750, 1000].map((amount) {
                  return ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primaryBlue.withAlpha(50),
                      foregroundColor: AppTheme.textDark,
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    onPressed: () {
                      ref
                          .read(waterProvider.notifier)
                          .addIntake(amount.toDouble());
                      Navigator.pop(context);
                    },
                    child: Text('${amount}ml'),
                  );
                }).toList(),
              ),
              const Gap(20),
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('Cancel',
                    style: TextStyle(color: Colors.redAccent)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
