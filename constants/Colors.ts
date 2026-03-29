const tintColorLight = '#6366F1'; // Indigo 500
const tintColorDark = '#818CF8'; // Indigo 400

export default {
  light: {
    text: '#0F172A', // Slate 900
    background: '#F8FAFC', // Slate 50
    tint: tintColorLight,
    tabIconDefault: '#94A3B8', // Slate 400
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E2E8F0',
    muted: '#64748B',
    success: '#10B981', // Emerald 500
    error: '#EF4444', // Red 500
    gold: '#F59E0B', // Amber 500
    accent: '#06B6D4', // Cyan 500
  },
  dark: {
    text: '#F8FAFC', // Slate 50
    background: '#020617', // Slate 950 (Cyber Black)
    tint: tintColorDark,
    tabIconDefault: '#475569', // Slate 600
    tabIconSelected: tintColorDark,
    card: '#0F172A', // Slate 900
    border: '#1E293B', // Slate 800
    muted: '#94A3B8', // Slate 400
    success: '#34D399', // Emerald 400
    error: '#F87171', // Red 400
    gold: '#FBBF24', // Amber 400
    accent: '#22D3EE', // Cyan 400
  },
};
