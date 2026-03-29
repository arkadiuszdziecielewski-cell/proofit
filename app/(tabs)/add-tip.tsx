import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Platform, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText, AnimatePresence } from 'moti';

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

  const stepWidth = (width - 48 - (36 * 4)) / 3;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <MotiText 
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          style={[styles.title, { color: colors.text }]}
        >
          Verifier
        </MotiText>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Submit your expert analysis. Our system freezes odds to prevent any statistical manipulation.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={styles.stepWrapper}>
            <MotiView 
              animate={{ 
                backgroundColor: step >= s ? colors.tint : colors.card,
                borderColor: step >= s ? colors.tint : colors.border,
                scale: step === s ? 1.2 : 1
              }}
              style={styles.stepCircle}
            >
              {step > s ? (
                <Ionicons name="checkmark-sharp" size={18} color="#fff" />
              ) : (
                <Text style={[styles.stepNumber, { color: step >= s ? '#fff' : colors.muted }]}>{s}</Text>
              )}
            </MotiView>
            {s < 4 && (
              <View style={[styles.stepLine, { width: stepWidth, backgroundColor: colors.border }]}>
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
            key="step1"
            from={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -50 }}
            style={styles.section}
          >
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Select Discipline</Text>
            <View style={styles.grid}>
              {SPORTS.map((sport) => (
                <TouchableOpacity
                  key={sport.id}
                  style={[styles.sportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleSportSelect(sport.id)}
                >
                  <LinearGradient
                    colors={[colors.tint + '10', 'transparent']}
                    style={styles.sportIconWrapper}
                  >
                    <MaterialIcons name={sport.icon as any} size={38} color={colors.tint} />
                  </LinearGradient>
                  <Text style={[styles.sportName, { color: colors.text }]}>{sport.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </MotiView>
        )}

        {step === 2 && selectedSport && (
          <MotiView
            key="step2"
            from={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -50 }}
            style={styles.section}
          >
            <TouchableOpacity onPress={() => setStep(1)} style={styles.backButton}>
              <Ionicons name="arrow-back-circle" size={24} color={colors.tint} />
              <Text style={[styles.backText, { color: colors.tint }]}>Disciplines</Text>
            </TouchableOpacity>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Available Leagues</Text>
            {LEAGUES[selectedSport].map((league, idx) => (
              <MotiView
                key={league}
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: idx * 50 }}
              >
                <TouchableOpacity
                  style={[styles.listItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleLeagueSelect(league)}
                >
                  <Text style={[styles.listItemText, { color: colors.text }]}>{league}</Text>
                  <View style={[styles.chevronWrapper, { backgroundColor: colors.tint + '10' }]}>
                    <Ionicons name="chevron-forward" size={18} color={colors.tint} />
                  </View>
                </TouchableOpacity>
              </MotiView>
            ))}
          </MotiView>
        )}

        {step === 3 && (
          <MotiView
            key="step3"
            from={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -50 }}
            style={styles.section}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <MotiView
                  animate={{ rotate: '360deg' }}
                  transition={{ loop: true, duration: 1000, type: 'timing', easing: shape.curveLinear as any }}
                >
                  <Ionicons name="sync" size={48} color={colors.tint} />
                </MotiView>
                <Text style={[styles.loadingText, { color: colors.muted }]}>Scanning live markets...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity onPress={() => setStep(2)} style={styles.backButton}>
                  <Ionicons name="arrow-back-circle" size={24} color={colors.tint} />
                  <Text style={[styles.backText, { color: colors.tint }]}>Leagues</Text>
                </TouchableOpacity>
                <Text style={[styles.sectionLabel, { color: colors.text }]}>Active Events</Text>
                {MOCK_MATCHES[selectedLeague!]?.map((match, idx) => (
                  <MotiView
                    key={match.id}
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 100 }}
                  >
                    <TouchableOpacity
                      style={[styles.matchCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                      onPress={() => handleMatchSelect(match)}
                    >
                      <Text style={[styles.matchTeams, { color: colors.text }]}>{match.teams}</Text>
                      <View style={styles.oddsPreview}>
                        {Object.entries(match.odds).map(([key, val]) => (
                          <View key={key} style={[styles.miniOdd, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <Text style={[styles.miniOddKey, { color: colors.muted }]}>{key}</Text>
                            <Text style={[styles.miniOddVal, { color: colors.success }]}>{val as string}</Text>
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
            key="step4"
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.section}
          >
            <TouchableOpacity onPress={() => setStep(3)} style={styles.backButton}>
              <Ionicons name="arrow-back-circle" size={24} color={colors.tint} />
              <Text style={[styles.backText, { color: colors.tint }]}>Events</Text>
            </TouchableOpacity>
            
            <View style={[styles.finalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <LinearGradient
                colors={[colors.tint, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.finalCardGradient}
              >
                <Text style={styles.finalLeague}>{selectedLeague}</Text>
                <Text style={styles.finalTeams}>{selectedMatch.teams}</Text>
              </LinearGradient>

              <View style={styles.marketGrid}>
                {Object.entries(selectedMatch.odds).map(([market, odds]) => (
                  <TouchableOpacity
                    key={market}
                    style={[
                      styles.marketButton, 
                      { 
                        backgroundColor: selectedMarket === market ? colors.tint + '10' : colors.background, 
                        borderColor: selectedMarket === market ? colors.tint : colors.border 
                      }
                    ]}
                    onPress={() => setSelectedMarket(market)}
                  >
                    <View>
                      <Text style={[styles.marketLabel, { color: colors.muted }]}>
                        {market === '1' ? 'HOME' : market === 'X' ? 'DRAW' : 'AWAY'}
                      </Text>
                      <Text style={[styles.marketName, { color: colors.text }]}>
                        {market === '1' ? selectedMatch.teams.split(' vs ')[0] : market === 'X' ? 'Draw' : selectedMatch.teams.split(' vs ')[1]}
                      </Text>
                    </View>
                    <MotiText 
                      animate={{ scale: selectedMarket === market ? 1.2 : 1 }}
                      style={[styles.marketOdds, { color: colors.tint }]}
                    >
                      {odds as string}
                    </MotiText>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[styles.verifiedBox, { backgroundColor: colors.success + '10', borderColor: colors.success + '30' }]}>
                <MaterialCommunityIcons name="shield-check-outline" size={22} color={colors.success} />
                <Text style={[styles.verifiedText, { color: colors.success }]}>CRYPTO-VERIFIED ODDS</Text>
              </View>

              <TouchableOpacity
                style={[styles.publishButton, { backgroundColor: selectedMarket ? colors.tint : colors.muted + '20' }]}
                disabled={!selectedMarket}
                onPress={() => {
                  alert('Analysis published to the blockchain!');
                  reset();
                }}
              >
                <Text style={styles.publishButtonText}>PUBLISH ANALYSIS</Text>
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
    padding: 24,
    paddingTop: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10,
    lineHeight: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: '900',
  },
  stepLine: {
    height: 3,
    marginHorizontal: -2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  sectionLabel: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sportCard: {
    width: '48%',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  sportIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sportName: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    marginBottom: 14,
    borderWidth: 1,
  },
  listItemText: {
    fontSize: 18,
    fontWeight: '800',
  },
  chevronWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 100,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 24,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  matchCard: {
    padding: 24,
    borderRadius: 32,
    marginBottom: 18,
    borderWidth: 1,
  },
  matchTeams: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  oddsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  miniOdd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 16,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  miniOddKey: {
    fontSize: 12,
    fontWeight: '900',
  },
  miniOddVal: {
    fontSize: 13,
    fontWeight: '900',
  },
  finalCard: {
    borderRadius: 40,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  finalCardGradient: {
    padding: 40,
    alignItems: 'center',
  },
  finalLeague: {
    fontSize: 14,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  finalTeams: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -1,
  },
  marketGrid: {
    padding: 24,
  },
  marketButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    borderRadius: 24,
    borderWidth: 2,
    marginBottom: 14,
  },
  marketLabel: {
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 4,
    letterSpacing: 1,
  },
  marketName: {
    fontSize: 17,
    fontWeight: '800',
  },
  marketOdds: {
    fontSize: 24,
    fontWeight: '900',
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 10,
    letterSpacing: 1,
  },
  publishButton: {
    margin: 24,
    marginTop: 0,
    padding: 22,
    borderRadius: 24,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
