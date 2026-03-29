import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Platform, useWindowDimensions, View, TextInput } from 'react-native';
import { Text } from '@/components/Themed';
import { 
  Plus, 
  ChevronRight, 
  Check, 
  Trophy, 
  Activity, 
  Calendar,
  Lock,
  ArrowLeft,
  ShieldCheck,
  Zap,
  DollarSign
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, AnimatePresence } from 'moti';

const SPORTS = [
  { id: 'soccer', name: 'Piłka Nożna', icon: Trophy },
  { id: 'tennis', name: 'Tenis', icon: Activity },
  { id: 'basketball', name: 'Koszykówka', icon: Calendar },
];

const LEAGUES: Record<string, string[]> = {
  soccer: ['Premier League', 'La Liga', 'Ekstraklasa', 'Bundesliga'],
  tennis: ['ATP Miami', 'WTA Miami', 'Wimbledon'],
  basketball: ['NBA', 'Euroleague', 'PLK'],
};

const MOCK_MATCHES: Record<string, any[]> = {
  'Premier League': [
    { id: 'm1', teams: 'Liverpool vs Arsenal', odds: { '1': 1.85, 'X': 3.40, '2': 4.10 } },
    { id: 'm2', teams: 'Man City vs Chelsea', odds: { '1': 1.45, 'X': 4.50, '2': 7.00 } },
  ],
};

export default function AddTipScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [step, setStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [price, setPrice] = useState('Darmowy');

  const reset = () => {
    setStep(1);
    setSelectedSport(null);
    setSelectedLeague(null);
    setSelectedMatch(null);
    setSelectedMarket(null);
    setPrice('Darmowy');
  };

  const Logo = () => (
    <View style={styles.logoContainer}>
      <LinearGradient
        colors={[colors.tint, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoIconBox}
      >
        <ShieldCheck size={18} color="#fff" strokeWidth={2.5} />
      </LinearGradient>
      <Text style={[styles.logoText, { color: colors.text }]}>
        PROO<Text style={{ color: colors.tint }}>FIT</Text>
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        {step > 1 ? (
          <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backBtn}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <Logo />
        )}
        <Text style={[styles.headerTitle, { color: colors.text }]}>{step === 1 ? '' : 'Nowy Typ'}</Text>
        <View style={{ width: step > 1 ? 24 : 0 }} />
      </View>

      <View style={styles.progressContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <View 
            key={i} 
            style={[
              styles.progressDot, 
              { backgroundColor: i <= step ? colors.tint : colors.border }
            ]} 
          />
        ))}
      </View>

      <AnimatePresence exitBeforeEnter>
        {step === 1 && (
          <MotiView
            key="s1"
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: colors.text }]}>Wybierz Dyscyplinę</Text>
            <View style={styles.grid}>
              {SPORTS.map((sport) => (
                <TouchableOpacity
                  key={sport.id}
                  style={[styles.sportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => { setSelectedSport(sport.id); setStep(2); }}
                >
                  <View style={[styles.iconCircle, { backgroundColor: colors.tint + '10' }]}>
                    <sport.icon size={24} color={colors.tint} />
                  </View>
                  <Text style={[styles.sportName, { color: colors.text }]}>{sport.name}</Text>
                  <ChevronRight size={16} color={colors.muted} />
                </TouchableOpacity>
              ))}
            </View>
          </MotiView>
        )}

        {step === 2 && (
          <MotiView
            key="s2"
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -20 }}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: colors.text }]}>Wybierz Ligę</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {LEAGUES[selectedSport!]?.map((league) => (
                <TouchableOpacity
                  key={league}
                  style={[styles.listItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => { setSelectedLeague(league); setStep(3); }}
                >
                  <Text style={[styles.listText, { color: colors.text }]}>{league}</Text>
                  <ChevronRight size={16} color={colors.muted} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </MotiView>
        )}

        {step === 3 && (
          <MotiView
            key="s3"
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: colors.text }]}>Wybierz Mecz</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {MOCK_MATCHES[selectedLeague!]?.map((match) => (
                <TouchableOpacity
                  key={match.id}
                  style={[styles.matchCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => { setSelectedMatch(match); setStep(4); }}
                >
                  <View style={styles.matchHeader}>
                    <Zap size={14} color={colors.success} fill={colors.success} />
                    <Text style={[styles.matchLeagueText, { color: colors.muted }]}>{selectedLeague}</Text>
                  </View>
                  <Text style={[styles.matchTeams, { color: colors.text }]}>{match.teams}</Text>
                  <View style={styles.oddsPreview}>
                    {Object.entries(match.odds).map(([k, v]) => (
                      <View key={k} style={[styles.oddPill, { backgroundColor: colors.background }]}>
                        <Text style={[styles.oddPillText, { color: colors.muted }]}>{k}: {v as string}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </MotiView>
        )}

        {step === 4 && (
          <MotiView
            key="s4"
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: colors.text }]}>Twój Typ i Cena</Text>
            
            <View style={[styles.selectionSummary, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.summaryMatch, { color: colors.text }]}>{selectedMatch.teams}</Text>
              <Text style={[styles.summaryLeague, { color: colors.muted }]}>{selectedLeague}</Text>
            </View>

            <Text style={[styles.subLabel, { color: colors.muted }]}>WYBIERZ WYNIK</Text>
            <View style={styles.marketGrid}>
              {Object.entries(selectedMatch.odds).map(([m, o]) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setSelectedMarket(m)}
                  style={[
                    styles.marketBtn, 
                    { backgroundColor: colors.card, borderColor: selectedMarket === m ? colors.tint : colors.border }
                  ]}
                >
                  <Text style={[styles.marketM, { color: colors.muted }]}>{m === '1' ? 'Dom' : m === 'X' ? 'Remis' : 'Wyjazd'}</Text>
                  <Text style={[styles.marketO, { color: selectedMarket === m ? colors.tint : colors.text }]}>{o as string}</Text>
                  {selectedMarket === m && (
                    <View style={[styles.checkBadge, { backgroundColor: colors.tint }]}>
                      <Check size={12} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.subLabel, { color: colors.muted }]}>USTAL CENĘ (PLN)</Text>
            <View style={styles.priceContainer}>
              {['Darmowy', '9.99', '19.99', '29.99'].map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPrice(p)}
                  style={[
                    styles.pricePill,
                    { backgroundColor: price === p ? colors.tint : colors.card, borderColor: price === p ? colors.tint : colors.border }
                  ]}
                >
                  <Text style={[styles.pricePillText, { color: price === p ? '#fff' : colors.text }]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.commitBtn, { backgroundColor: selectedMarket ? colors.tint : colors.border, marginTop: 20 }]}
              disabled={!selectedMarket}
              onPress={() => setStep(5)}
            >
              <Text style={styles.commitBtnText}>Podsumowanie</Text>
              <ChevronRight size={18} color="#fff" />
            </TouchableOpacity>
          </MotiView>
        )}

        {step === 5 && (
          <MotiView
            key="s5"
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: colors.text }]}>Weryfikacja</Text>
            
            <View style={[styles.finalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.finalRow}>
                <Text style={[styles.finalLabel, { color: colors.muted }]}>WYDARZENIE</Text>
                <Text style={[styles.finalVal, { color: colors.text }]}>{selectedMatch.teams}</Text>
              </View>
              <View style={styles.finalDivider} />
              <View style={styles.finalRow}>
                <Text style={[styles.finalLabel, { color: colors.muted }]}>TWÓJ TYP</Text>
                <Text style={[styles.finalVal, { color: colors.tint }]}>{selectedMarket} (@{selectedMatch.odds[selectedMarket!]})</Text>
              </View>
              <View style={styles.finalDivider} />
              <View style={styles.finalRow}>
                <Text style={[styles.finalLabel, { color: colors.muted }]}>CENA SPRZEDAŻY</Text>
                <Text style={[styles.finalVal, { color: colors.success }]}>{price === 'Darmowy' ? '0.00 PLN' : `${price} PLN`}</Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Lock size={16} color={colors.muted} />
              <Text style={[styles.infoText, { color: colors.muted }]}>
                Po opublikowaniu, typ zostanie zablokowany i zweryfikowany automatycznie po zakończeniu meczu.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.commitBtn, { backgroundColor: colors.success }]}
              onPress={() => { alert('Typ został opublikowany!'); reset(); }}
            >
              <ShieldCheck size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.commitBtnText}>Opublikuj Typ</Text>
            </TouchableOpacity>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  backBtn: {
    padding: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  progressDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 24,
    letterSpacing: -1,
  },
  grid: {
    gap: 12,
  },
  sportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sportName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  matchCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 12,
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  matchLeagueText: {
    fontSize: 12,
    fontWeight: '600',
  },
  matchTeams: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  oddsPreview: {
    flexDirection: 'row',
    gap: 8,
  },
  oddPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  oddPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  selectionSummary: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  summaryMatch: {
    fontSize: 16,
    fontWeight: '700',
  },
  summaryLeague: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  subLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 10,
  },
  marketGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  marketBtn: {
    width: '31%',
    height: 80,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marketM: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  marketO: {
    fontSize: 18,
    fontWeight: '700',
  },
  checkBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  pricePill: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricePillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  commitBtn: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  commitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  finalCard: {
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 24,
  },
  finalRow: {
    marginVertical: 4,
  },
  finalLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  finalVal: {
    fontSize: 18,
    fontWeight: '800',
  },
  finalDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 15,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    marginBottom: 32,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
});
