import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Platform, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText, AnimatePresence } from 'moti';
import { Easing } from 'react-native-reanimated';

const SPORTS = [
  { id: 'soccer', name: 'Football', icon: 'sports-soccer' },
  { id: 'tennis', name: 'Tennis', icon: 'sports-tennis' },
  { id: 'basketball', name: 'Basketball', icon: 'sports-basketball' },
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
  'La Liga': [
    { id: 'm3', teams: 'Real Madrid vs Barcelona', odds: { '1': 2.10, 'X': 3.50, '2': 3.20 } },
  ],
};

export default function AddTipScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [step, setStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSportSelect = (sportId: string) => {
    setSelectedSport(sportId);
    setStep(2);
  };

  const handleLeagueSelect = (league: string) => {
    setSelectedLeague(league);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 800);
  };

  const handleMatchSelect = (match: any) => {
    setSelectedMatch(match);
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setSelectedSport(null);
    setSelectedLeague(null);
    setSelectedMatch(null);
    setSelectedMarket(null);
  };

  const stepWidth = (width - 48 - (40 * 4)) / 3;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <MotiText 
          from={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={[styles.title, { color: colors.text }]}
        >
          VERIFIER
        </MotiText>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Market-linked verification. Instant settlement.
        </Text>
      </View>

      <View style={styles.stepperContainer}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={styles.stepItem}>
            <MotiView 
              animate={{ 
                backgroundColor: step >= s ? colors.tint : colors.card,
                borderColor: step >= s ? colors.tint : colors.border,
                scale: step === s ? 1.15 : 1
              }}
              style={styles.stepCircle}
            >
              {step > s ? (
                <Ionicons name="checkmark-sharp" size={20} color="#fff" />
              ) : (
                <Text style={[styles.stepNum, { color: step >= s ? '#fff' : colors.muted }]}>{s}</Text>
              )}
            </MotiView>
            {s < 4 && (
              <View style={[styles.stepBar, { width: stepWidth, backgroundColor: colors.border }]}>
                <MotiView 
                  animate={{ width: step > s ? '100%' : '0%' }}
                  style={{ height: '100%', backgroundColor: colors.tint }} 
                />
              </View>
            )}
          </View>
        ))}
      </View>

      <AnimatePresence exitBeforeEnter>
        {step === 1 && (
          <MotiView
            key="s1"
            from={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={styles.pane}
          >
            <Text style={[styles.paneTitle, { color: colors.text }]}>Discipline</Text>
            <View style={styles.sportsGrid}>
              {SPORTS.map((sport) => (
                <TouchableOpacity
                  key={sport.id}
                  style={[styles.sportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleSportSelect(sport.id)}
                >
                  <LinearGradient
                    colors={[colors.tint + '15', 'transparent']}
                    style={styles.sportIconBox}
                  >
                    <MaterialIcons name={sport.icon as any} size={40} color={colors.tint} />
                  </LinearGradient>
                  <Text style={[styles.sportLabel, { color: colors.text }]}>{sport.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </MotiView>
        )}

        {step === 2 && selectedSport && (
          <MotiView
            key="s2"
            from={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={styles.pane}
          >
            <TouchableOpacity onPress={() => setStep(1)} style={styles.backLink}>
              <Ionicons name="chevron-back" size={20} color={colors.accent} />
              <Text style={[styles.backText, { color: colors.accent }]}>BACK</Text>
            </TouchableOpacity>
            <Text style={[styles.paneTitle, { color: colors.text }]}>League</Text>
            {LEAGUES[selectedSport].map((league, i) => (
              <MotiView key={league} from={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 50 }}>
                <TouchableOpacity
                  style={[styles.leagueRow, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleLeagueSelect(league)}
                >
                  <Text style={[styles.leagueName, { color: colors.text }]}>{league}</Text>
                  <View style={[styles.leagueIcon, { backgroundColor: colors.accent + '15' }]}>
                    <Ionicons name="arrow-forward" size={18} color={colors.accent} />
                  </View>
                </TouchableOpacity>
              </MotiView>
            ))}
          </MotiView>
        )}

        {step === 3 && (
          <MotiView
            key="s3"
            from={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            style={styles.pane}
          >
            {isLoading ? (
              <View style={styles.loader}>
                <MotiView
                  animate={{ rotate: '360deg' }}
                  transition={{ loop: true, duration: 800, type: 'timing', easing: Easing.linear }}
                >
                  <MaterialCommunityIcons name="loading" size={60} color={colors.tint} />
                </MotiView>
                <Text style={[styles.loaderText, { color: colors.muted }]}>FETCHING MARKET RATES...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity onPress={() => setStep(2)} style={styles.backLink}>
                  <Ionicons name="chevron-back" size={20} color={colors.accent} />
                  <Text style={[styles.backText, { color: colors.accent }]}>BACK</Text>
                </TouchableOpacity>
                <Text style={[styles.paneTitle, { color: colors.text }]}>Match</Text>
                {MOCK_MATCHES[selectedLeague!]?.map((match, i) => (
                  <MotiView key={match.id} from={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 100 }}>
                    <TouchableOpacity
                      style={[styles.matchCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                      onPress={() => handleMatchSelect(match)}
                    >
                      <Text style={[styles.matchInfo, { color: colors.text }]}>{match.teams}</Text>
                      <View style={styles.oddsLine}>
                        {Object.entries(match.odds).map(([k, v]) => (
                          <View key={k} style={[styles.oddSmall, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <Text style={[styles.oddSmallK, { color: colors.muted }]}>{k}</Text>
                            <Text style={[styles.oddSmallV, { color: colors.success }]}>{v as string}</Text>
                          </View>
                        ))}
                      </View>
                    </TouchableOpacity>
                  </MotiView>
                ))}
              </>
            )}
          </MotiView>
        )}

        {step === 4 && selectedMatch && (
          <MotiView
            key="s4"
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.pane}
          >
            <TouchableOpacity onPress={() => setStep(3)} style={styles.backLink}>
              <Ionicons name="chevron-back" size={20} color={colors.accent} />
              <Text style={[styles.backText, { color: colors.accent }]}>BACK</Text>
            </TouchableOpacity>
            
            <View style={[styles.confirmCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <LinearGradient
                colors={[colors.tint, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.confirmHeader}
              >
                <Text style={styles.confirmLeague}>{selectedLeague}</Text>
                <Text style={styles.confirmTeams}>{selectedMatch.teams}</Text>
              </LinearGradient>

              <View style={styles.pickGrid}>
                {Object.entries(selectedMatch.odds).map(([market, odds]) => (
                  <TouchableOpacity
                    key={market}
                    style={[
                      styles.pickBtn, 
                      { 
                        backgroundColor: selectedMarket === market ? colors.tint + '10' : colors.background, 
                        borderColor: selectedMarket === market ? colors.tint : colors.border 
                      }
                    ]}
                    onPress={() => setSelectedMarket(market)}
                  >
                    <View>
                      <Text style={[styles.pickLab, { color: colors.muted }]}>
                        {market === '1' ? 'HOME' : market === 'X' ? 'DRAW' : 'AWAY'}
                      </Text>
                      <Text style={[styles.pickName, { color: colors.text }]}>
                        {market === '1' ? selectedMatch.teams.split(' vs ')[0] : market === 'X' ? 'Tie' : selectedMatch.teams.split(' vs ')[1]}
                      </Text>
                    </View>
                    <MotiText 
                      animate={{ scale: selectedMarket === market ? 1.25 : 1 }}
                      style={[styles.pickOdds, { color: colors.tint }]}
                    >
                      {odds as string}
                    </MotiText>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[styles.auditBox, { backgroundColor: colors.success + '10', borderColor: colors.success + '30' }]}>
                <MaterialCommunityIcons name="shield-lock" size={24} color={colors.success} />
                <Text style={[styles.auditText, { color: colors.success }]}>REAL-TIME AUDIT SECURED</Text>
              </View>

              <TouchableOpacity
                style={[styles.submitBtn, { backgroundColor: selectedMarket ? colors.tint : colors.muted + '20' }]}
                disabled={!selectedMarket}
                onPress={() => {
                  alert('Analysis locked and published!');
                  reset();
                }}
              >
                <LinearGradient
                  colors={selectedMarket ? [colors.tint, colors.accent] : ['transparent', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitBtnGrad}
                >
                  <Text style={styles.submitBtnText}>LOCK ANALYSIS</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 28,
    paddingTop: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -2,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    lineHeight: 24,
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 45,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  stepNum: {
    fontSize: 16,
    fontWeight: '900',
  },
  stepBar: {
    height: 4,
    marginHorizontal: -2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  pane: {
    paddingHorizontal: 28,
    paddingBottom: 60,
  },
  paneTitle: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 28,
    letterSpacing: -0.5,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sportCard: {
    width: '48%',
    borderRadius: 35,
    padding: 28,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 25,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  sportIconBox: {
    width: 80,
    height: 80,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sportLabel: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  backText: {
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 6,
    letterSpacing: 1,
  },
  leagueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 28,
    borderRadius: 30,
    marginBottom: 16,
    borderWidth: 1,
  },
  leagueName: {
    fontSize: 19,
    fontWeight: '900',
  },
  leagueIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    padding: 120,
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 30,
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 2,
  },
  matchCard: {
    padding: 28,
    borderRadius: 35,
    marginBottom: 20,
    borderWidth: 1,
  },
  matchInfo: {
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 28,
    letterSpacing: -0.5,
  },
  oddsLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oddSmall: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 18,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  oddSmallK: {
    fontSize: 12,
    fontWeight: '900',
  },
  oddSmallV: {
    fontSize: 14,
    fontWeight: '900',
  },
  confirmCard: {
    borderRadius: 45,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 0.3,
        shadowRadius: 50,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  confirmHeader: {
    padding: 45,
    alignItems: 'center',
  },
  confirmLeague: {
    fontSize: 14,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 15,
  },
  confirmTeams: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -1,
  },
  pickGrid: {
    padding: 28,
  },
  pickBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderRadius: 28,
    borderWidth: 2,
    marginBottom: 16,
  },
  pickLab: {
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 6,
    letterSpacing: 1.5,
  },
  pickName: {
    fontSize: 18,
    fontWeight: '900',
  },
  pickOdds: {
    fontSize: 26,
    fontWeight: '900',
  },
  auditBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 28,
    padding: 20,
    borderRadius: 24,
    marginBottom: 28,
    borderWidth: 1,
  },
  auditText: {
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 12,
    letterSpacing: 1.5,
  },
  submitBtn: {
    margin: 28,
    marginTop: 0,
    borderRadius: 28,
    overflow: 'hidden',
  },
  submitBtnGrad: {
    padding: 24,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
