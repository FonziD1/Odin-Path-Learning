import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color primaryBlue = Color(0xFF4FC3F7);
  static const Color accentBlue = Color(0xFF00E5FF);
  static const Color backgroundLight = Color(0xFFF0F9FF);
  static const Color textDark = Color(0xFF263238);
  static const Color textLight = Color(0xFF78909C);
  
  static const List<Color> bgGradient = [
    Color(0xFFE1F5FE),
    Color(0xFFB3E5FC),
    Color(0xFF81D4FA),
  ];

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryBlue,
        brightness: Brightness.light,
      ),
      textTheme: GoogleFonts.outfitTextTheme().copyWith(
        displayLarge: GoogleFonts.outfit(
          color: textDark,
          fontWeight: FontWeight.bold,
        ),
        titleLarge: GoogleFonts.outfit(
          color: textDark,
          fontWeight: FontWeight.w600,
        ),
      ),
      scaffoldBackgroundColor: Colors.transparent,
    );
  }
}
