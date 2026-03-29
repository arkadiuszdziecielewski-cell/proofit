const tintColorLight = '#00F2FF'; 
const tintColorDark = '#00F2FF'; 

export default {
  light: {
    text: '#050505',
    background: '#FFFFFF',
    tint: tintColorLight,
    tabIconDefault: '#CCC',
    tabIconSelected: tintColorLight,
    card: '#F5F5F5',
    border: '#EEE',
    muted: '#666',
    success: '#00FF94',
    error: '#FF005C',
    gold: '#FFD700',
    accent: '#FF00E5',
    glass: 'rgba(255, 255, 255, 0.03)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
  },
  dark: {
    text: '#FFFFFF',
    background: '#020202', // Nawet głębsza czerń
    tint: tintColorDark,
    tabIconDefault: '#1A1A1A',
    tabIconSelected: tintColorDark,
    card: '#080808', // Bardziej techniczna szarość
    border: '#151515',
    muted: '#555',
    success: '#00FF94', // Neon Green
    error: '#FF005C', // Neon Red/Pink
    gold: '#FFD700', 
    accent: '#FF00E5', // Neon Magenta
    cyber: '#00F2FF', // Electric Cyan
    plasma: '#7000FF', // Plasma Purple
    matrix: '#00FF41', // Matrix Green
    glass: 'rgba(255, 255, 255, 0.02)',
    glassBorder: 'rgba(255, 255, 255, 0.05)',
  },
};
