import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Platform, useWindowDimensions, View } from 'react-native';
import { Text } from '@/components/Themed';
import { 
  Plus, 
  ChevronRight, 
  Check, 
  Trophy, 
  Activity, 
  Calendar,
  Lock,
  ArrowLeft
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, AnimatePresence } from 'moti';

const SPORTS = [
  { id: 'soccer', name: 'Football', icon: Trophy },
  { id: 'tennis', name: 'Tennis', icon: Activity },
  { id: 'basketball', name: 'Basketball', icon: Calendar },
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
  const { height } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [step, setStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  const reset = () => {
    setStep(1);
    setSelectedSport(null);
    setSelectedLeague(null);
    setSelectedMatch(null);
    setSelectedMarket(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        {step > 1 && (
          <TouchableOpacity onPress={() => setStep(step - 1)} style={styles.backBtn}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <Text style={[styles.headerTitle, { color: colors.text }]}>Add Tip</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map((i) => (
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
            <Text style={[styles.stepTitle, { color: colors.text }]}>Select Sport</Text>
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
            <Text style={[styles.stepTitle, { color: colors.text }]}>Select League</Text>
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
            <Text style={[styles.stepTitle, { color: colors.text }]}>Select Match</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {MOCK_MATCHES[selectedLeague!]?.map((match) => (
                <TouchableOpacity
                  key={match.id}
                  style={[styles.matchCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => { setSelectedMatch(match); setStep(4); }}
                >
                  <Text style={[styles.matchTeams, { color: colors.text }]}>{match.teams}</Text>
                  <View style={styles.oddsPreview}>
                    {Object.entries(match.odds).map(([k, v]) => (
                      <Text key={k} style={[styles.oddsPreviewText, { color: colors.muted }]}>{k}: {v as string}</Text>
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
            <Text style={[styles.stepTitle, { color: colors.text }]}>Confirm Selection</Text>
            <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.muted }]}>Match</Text>
                <Text style={[styles.summaryVal, { color: colors.text }]}>{selectedMatch.teams}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.muted }]}>League</Text>
                <Text style={[styles.summaryVal, { color: colors.text }]}>{selectedLeague}</Text>
              </View>
            </View>

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
                  <Text style={[styles.marketM, { color: colors.muted }]}>{m === '1' ? 'Home' : m === 'X' ? 'Draw' : 'Away'}</Text>
                  <Text style={[styles.marketO, { color: selectedMarket === m ? colors.tint : colors.text }]}>{o as string}</Text>
                  {selectedMarket === m && (
                    <View style={[styles.checkBadge, { backgroundColor: colors.tint }]}>
                      <Check size={12} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.commitBtn, { backgroundColor: selectedMarket ? colors.tint : colors.border }]}
              disabled={!selectedMarket}
              onPress={() => { alert('Tip verified and locked.'); reset(); }}
            >
              <Lock size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.commitBtnText}>Verify & Post Tip</Text>
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
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 24,
    letterSpacing: -0.5,
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
  matchTeams: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  oddsPreview: {
    flexDirection: 'row',
    gap: 12,
  },
  oddsPreviewText: {
    fontSize: 13,
    fontWeight: '600',
  },
  summaryCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 24,
  },
  summaryRow: {
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryVal: {
    fontSize: 16,
    fontWeight: '700',
  },
  marketGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  marketBtn: {
    width: '31%',
    height: 90,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marketM: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  marketO: {
    fontSize: 20,
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
  commitBtn: {
    height: 60,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
