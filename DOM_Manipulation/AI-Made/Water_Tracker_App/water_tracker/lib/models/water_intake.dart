import 'package:intl/intl.dart';

class WaterIntake {
  final String id;
  final double amount; // in ml
  final DateTime timestamp;

  WaterIntake({
    required this.id,
    required this.amount,
    required this.timestamp,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'amount': amount,
      'timestamp': timestamp.toIso8601String(),
    };
  }

  factory WaterIntake.fromJson(Map<String, dynamic> json) {
    return WaterIntake(
      id: json['id'],
      amount: json['amount'],
      timestamp: DateTime.parse(json['timestamp']),
    );
  }

  String get formattedTime => DateFormat.jm().format(timestamp);
}
