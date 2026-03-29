import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

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

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Weryfikator</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Kursy mrożone w czasie rzeczywistym. Brak możliwości manipulacji.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={styles.stepWrapper}>
            <View style={[
              styles.stepCircle, 
              { backgroundColor: step >= s ? colors.tint : colors.card, borderColor: step >= s ? colors.tint : colors.border }
            ]}>
              {step > s ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Text style={[styles.stepNumber, { color: step >= s ? '#fff' : colors.muted }]}>{s}</Text>
              )}
            </View>
            {s < 4 && <View style={[styles.stepLine, { backgroundColor: step > s ? colors.tint : colors.border }]} />}
          </View>
        ))}
      </View>

      {step === 1 && (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Wybierz dyscyplinę</Text>
          <View style={styles.grid}>
            {SPORTS.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                style={[styles.sportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleSportSelect(sport.id)}
              >
                <View style={[styles.sportIconWrapper, { backgroundColor: colors.tint + '15' }]}>
                  <MaterialIcons name={sport.icon as any} size={32} color={colors.tint} />
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
            <Text style={[styles.backText, { color: colors.tint }]}>Dyscypliny</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Wybierz ligę</Text>
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
          <Text style={[styles.loadingText, { color: colors.muted }]}>Pobieranie kursów rynkowych...</Text>
        </View>
      )}

      {step === 3 && !isLoading && selectedLeague && (
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={colors.tint} />
            <Text style={[styles.backText, { color: colors.tint }]}>Ligi</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Wybierz mecz</Text>
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
            <Text style={[styles.backText, { color: colors.tint }]}>Mecze</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Twój Typ</Text>
          
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
                  <Text style={[styles.marketLabel, { color: colors.muted }]}>
                    {market === '1' ? 'Gospodarze' : market === 'X' ? 'Remis' : 'Goście'}
                  </Text>
                  <Text style={[styles.marketOdds, { color: colors.text }]}>{odds as string}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.verifiedBox, { backgroundColor: colors.success + '10' }]}>
              <MaterialIcons name="verified-user" size={20} color={colors.success} />
              <Text style={[styles.verifiedText, { color: colors.success }]}>Kurs zweryfikowany i zamrożony</Text>
            </View>

            <TouchableOpacity
              style={[styles.publishButton, { backgroundColor: selectedMarket ? colors.tint : colors.muted + '40' }]}
              disabled={!selectedMarket}
              onPress={() => {
                alert('Typ został dodany!');
                reset();
              }}
            >
              <Text style={styles.publishButtonText}>Opublikuj Typ</Text>
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
    marginTop: 6,
    lineHeight: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '800',
  },
  stepLine: {
    width: (width - 60 - (32 * 4)) / 3,
    height: 2,
    marginHorizontal: -2,
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sportCard: {
    width: '48%',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sportIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  sportName: {
    fontSize: 14,
    fontWeight: '700',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '700',
  },
  loadingContainer: {
    padding: 60,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontWeight: '600',
  },
  matchCard: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
  },
  matchTeams: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  oddsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  miniOdd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  miniOddKey: {
    fontSize: 12,
    fontWeight: '700',
  },
  miniOddVal: {
    fontSize: 12,
    fontWeight: '800',
  },
  finalCard: {
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
  },
  finalCardGradient: {
    padding: 24,
    alignItems: 'center',
  },
  finalLeague: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  finalTeams: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  marketGrid: {
    padding: 20,
  },
  marketButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 18,
    borderWidth: 2,
    marginBottom: 10,
  },
  marketLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  marketOdds: {
    fontSize: 18,
    fontWeight: '900',
  },
  verifiedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  publishButton: {
    margin: 20,
    marginTop: 0,
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});
