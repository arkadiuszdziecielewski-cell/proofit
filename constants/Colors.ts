const tintColorLight = '#007AFF'; // Profesjonalny błękit finansowy
const tintColorDark = '#0A84FF'; 

export default {
  light: {
    text: '#1C1C1E',
    background: '#F2F2F7',
    tint: tintColorLight,
    tabIconDefault: '#C7C7CC',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E5E5EA',
    muted: '#8E8E93',
    success: '#34C759',
    error: '#FF3B30',
    gold: '#FFCC00',
    accent: '#5856D6', // Purpura (Premium)
    glass: 'rgba(255, 255, 255, 0.8)',
    glassBorder: 'rgba(255, 255, 255, 0.3)',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: tintColorDark,
    tabIconDefault: '#3A3A3C',
    tabIconSelected: tintColorDark,
    card: '#1C1C1E',
    border: '#2C2C2E',
    muted: '#8E8E93',
    success: '#30D158',
    error: '#FF453A',
    gold: '#FFD60A',
    accent: '#5E5CE6',
    glass: 'rgba(28, 28, 30, 0.8)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },
};
