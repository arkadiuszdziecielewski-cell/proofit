import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Platform, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

const SPORTS = [
  { id: 'soccer', name: 'Piłka Nożna', icon: 'sports-soccer' },
  { id: 'tennis', name: 'Tenis', icon: 'sports-tennis' },
  { id: 'basketball', name: 'Koszykówka', icon: 'sports-basketball' },
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

  const stepWidth = (width - 48 - (32 * 4)) / 3;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Verifier</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Real-time market odds verification. No manipulation possible.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={styles.stepWrapper}>
            <View style={[
              styles.stepCircle, 
              { 
                backgroundColor: step >= s ? colors.tint : colors.card, 
                borderColor: step >= s ? colors.tint : colors.border 
              }
            ]}>
              {step > s ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text style={[styles.stepNumber, { color: step >= s ? '#fff' : colors.muted }]}>{s}</Text>
              )}
            </View>
            {s < 4 && <View style={[styles.stepLine, { width: stepWidth, backgroundColor: step > s ? colors.tint : colors.border }]} />}
          </View>
        ))}
      </View>

      {step === 1 && (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Choose Category</Text>
          <View style={styles.grid}>
            {SPORTS.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                style={[styles.sportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleSportSelect(sport.id)}
              >
                <View style={[styles.sportIconWrapper, { backgroundColor: colors.tint + '15' }]}>
                  <MaterialIcons name={sport.icon as any} size={36} color={colors.tint} />
                </View>
                <Text style={[styles.sportName, { color: colors.text }]}>{sport.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {step === 2 && selectedSport && (
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setStep(1)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={colors.tint} />
            <Text style={[styles.backText, { color: colors.tint }]}>Back to Categories</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Choose League</Text>
          {LEAGUES[selectedSport].map((league) => (
            <TouchableOpacity
              key={league}
              style={[styles.listItem, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleLeagueSelect(league)}
            >
              <Text style={[styles.listItemText, { color: colors.text }]}>{league}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 3 && isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
          <Text style={[styles.loadingText, { color: colors.muted }]}>Fetching live market data...</Text>
        </View>
      )}

      {step === 3 && !isLoading && selectedLeague && (
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={colors.tint} />
            <Text style={[styles.backText, { color: colors.tint }]}>Back to Leagues</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Select Match</Text>
          {MOCK_MATCHES[selectedLeague]?.map((match) => (
            <TouchableOpacity
              key={match.id}
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
          ))}
        </View>
      )}

      {step === 4 && selectedMatch && (
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setStep(3)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={colors.tint} />
            <Text style={[styles.backText, { color: colors.tint }]}>Back to Matches</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Finalize Prediction</Text>
          
          <View style={[styles.finalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <LinearGradient
              colors={[colors.tint + '20', 'transparent']}
              style={styles.finalCardGradient}
            >
              <Text style={[styles.finalLeague, { color: colors.tint }]}>{selectedLeague}</Text>
              <Text style={[styles.finalTeams, { color: colors.text }]}>{selectedMatch.teams}</Text>
            </LinearGradient>

            <View style={styles.marketGrid}>
              {Object.entries(selectedMatch.odds).map(([market, odds]) => (
                <TouchableOpacity
                  key={market}
                  style={[
                    styles.marketButton, 
                    { backgroundColor: colors.background, borderColor: selectedMarket === market ? colors.tint : colors.border }
                  ]}
                  onPress={() => setSelectedMarket(market)}
                >
                  <View>
                    <Text style={[styles.marketLabel, { color: colors.muted }]}>
                      {market === '1' ? 'Home' : market === 'X' ? 'Draw' : 'Away'}
                    </Text>
                    <Text style={[styles.marketName, { color: colors.text }]}>
                      {market === '1' ? selectedMatch.teams.split(' vs ')[0] : market === 'X' ? 'Tie Game' : selectedMatch.teams.split(' vs ')[1]}
                    </Text>
                  </View>
                  <Text style={[styles.marketOdds, { color: colors.tint }]}>{odds as string}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.verifiedBox, { backgroundColor: colors.success + '10' }]}>
              <MaterialCommunityIcons name="shield-check" size={20} color={colors.success} />
              <Text style={[styles.verifiedText, { color: colors.success }]}>ODDS FROZEN & VERIFIED</Text>
            </View>

            <TouchableOpacity
              style={[styles.publishButton, { backgroundColor: selectedMarket ? colors.tint : colors.muted + '20' }]}
              disabled={!selectedMarket}
              onPress={() => {
                alert('Tip published successfully!');
                reset();
              }}
            >
              <Text style={styles.publishButtonText}>Confirm & Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    lineHeight: 22,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '900',
  },
  stepLine: {
    height: 2,
    marginHorizontal: -2,
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sportCard: {
    width: '48%',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  sportIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sportName: {
    fontSize: 15,
    fontWeight: '800',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 6,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
  },
  listItemText: {
    fontSize: 17,
    fontWeight: '800',
  },
  loadingContainer: {
    padding: 80,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 15,
  },
  matchCard: {
    padding: 24,
    borderRadius: 28,
    marginBottom: 16,
    borderWidth: 1,
  },
  matchTeams: {
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  oddsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  miniOdd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  miniOddKey: {
    fontSize: 12,
    fontWeight: '800',
  },
  miniOddVal: {
    fontSize: 12,
    fontWeight: '900',
  },
  finalCard: {
    borderRadius: 32,
    borderWidth: 1,
    overflow: 'hidden',
  },
  finalCardGradient: {
    padding: 30,
    alignItems: 'center',
  },
  finalLeague: {
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  finalTeams: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  marketGrid: {
    padding: 24,
  },
  marketButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 12,
  },
  marketLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  marketName: {
    fontSize: 16,
    fontWeight: '800',
  },
  marketOdds: {
    fontSize: 20,
    fontWeight: '900',
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    padding: 14,
    borderRadius: 16,
    marginBottom: 24,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  publishButton: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
