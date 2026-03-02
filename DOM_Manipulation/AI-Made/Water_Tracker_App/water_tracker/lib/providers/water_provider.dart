import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/water_intake.dart';

final waterProvider =
    StateNotifierProvider<WaterNotifier, List<WaterIntake>>((ref) {
  return WaterNotifier();
});

class WaterNotifier extends StateNotifier<List<WaterIntake>> {
  WaterNotifier() : super([]) {
    _loadData();
  }

  static const _key = 'water_intake_logs';

  Future<void> _loadData() async {
    final prefs = await SharedPreferences.getInstance();
    final String? data = prefs.getString(_key);
    if (data != null) {
      final List<dynamic> decoded = jsonDecode(data);
      state = decoded
          .map((item) => WaterIntake.fromJson(item))
          .where((e) => e.amount.isFinite)
          .toList();
    }
  }

  Future<void> _saveData() async {
    final prefs = await SharedPreferences.getInstance();
    final String encoded = jsonEncode(state.map((e) => e.toJson()).toList());
    await prefs.setString(_key, encoded);
  }

  void addIntake(double amount) {
    final newItem = WaterIntake(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      amount: amount,
      timestamp: DateTime.now(),
    );
    state = [...state, newItem];
    _saveData();
  }

  void removeIntake(String id) {
    state = state.where((item) => item.id != id).toList();
    _saveData();
  }

  void resetAll() {
    state = [];
    _saveData();
  }

  double get todayTotal {
    final today = DateTime.now();
    return state
        .where((e) =>
            e.timestamp.year == today.year &&
            e.timestamp.month == today.month &&
            e.timestamp.day == today.day)
        .fold(0.0, (sum, item) => sum + item.amount);
  }
}
