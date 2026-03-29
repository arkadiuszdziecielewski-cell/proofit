const tintColorLight = '#7C3AED'; // Vivid Purple 600
const tintColorDark = '#A78BFA'; // Vivid Purple 400

export default {
  light: {
    text: '#0F172A',
    background: '#F8FAFC',
    tint: tintColorLight,
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E2E8F0',
    muted: '#64748B',
    success: '#10B981',
    error: '#EF4444',
    gold: '#F59E0B',
    accent: '#06B6D4',
  },
  dark: {
    text: '#F8FAFC',
    background: '#030712', // Deep Space Black (Slate 950)
    tint: tintColorDark,
    tabIconDefault: '#475569',
    tabIconSelected: tintColorDark,
    card: '#111827', // Dark Slate 900
    border: '#1F2937', // Slate 800
    muted: '#9CA3AF', // Gray 400
    success: '#34D399',
    error: '#F87171',
    gold: '#FBBF24',
    accent: '#22D3EE', // Vivid Cyan 400
    purple: '#C084FC', // Electric Purple 400
  },
};
