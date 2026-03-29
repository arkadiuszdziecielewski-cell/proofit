import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

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
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

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
    // Simulate API fetch
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weryfikator Typów</Text>
        <Text style={styles.subtitle}>Wybierz mecz i dodaj typ. Kursy są pobierane w czasie rzeczywistym.</Text>
      </View>

      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={[styles.stepDot, step >= s && { backgroundColor: tintColor }]} />
        ))}
      </View>

      {step === 1 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Krok 1: Wybierz dyscyplinę</Text>
          <View style={styles.grid}>
            {SPORTS.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                style={styles.sportCard}
                onPress={() => handleSportSelect(sport.id)}
              >
                <MaterialIcons name={sport.icon as any} size={40} color={tintColor} />
                <Text style={styles.sportName}>{sport.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {step === 2 && selectedSport && (
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setStep(1)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={tintColor} />
            <Text style={[styles.backText, { color: tintColor }]}>Wróć do dyscyplin</Text>
          </TouchableOpacity>
          <Text style={styles.sectionLabel}>Krok 2: Wybierz ligę</Text>
          {LEAGUES[selectedSport].map((league) => (
            <TouchableOpacity
              key={league}
              style={styles.listItem}
              onPress={() => handleLeagueSelect(league)}
            >
              <Text style={styles.listItemText}>{league}</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 3 && isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={tintColor} />
          <Text style={styles.loadingText}>Pobieranie kursów rynkowych...</Text>
        </View>
      )}

      {step === 3 && !isLoading && selectedLeague && (
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={tintColor} />
            <Text style={[styles.backText, { color: tintColor }]}>Wróć do lig</Text>
          </TouchableOpacity>
          <Text style={styles.sectionLabel}>Krok 3: Wybierz mecz</Text>
          {MOCK_MATCHES[selectedLeague]?.map((match) => (
            <TouchableOpacity
              key={match.id}
              style={styles.matchItem}
              onPress={() => handleMatchSelect(match)}
            >
              <Text style={styles.matchTeams}>{match.teams}</Text>
              <View style={styles.oddsRow}>
                <View style={styles.miniOdd}>
                  <Text style={styles.miniOddLabel}>1</Text>
                  <Text style={styles.miniOddValue}>{match.odds['1']}</Text>
                </View>
                <View style={styles.miniOdd}>
                  <Text style={styles.miniOddLabel}>X</Text>
                  <Text style={styles.miniOddValue}>{match.odds['X']}</Text>
                </View>
                <View style={styles.miniOdd}>
                  <Text style={styles.miniOddLabel}>2</Text>
                  <Text style={styles.miniOddValue}>{match.odds['2']}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {step === 4 && selectedMatch && (
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setStep(3)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={tintColor} />
            <Text style={[styles.backText, { color: tintColor }]}>Wróć do meczów</Text>
          </TouchableOpacity>
          <Text style={styles.sectionLabel}>Krok 4: Wybierz typ i zatwierdź</Text>
          <View style={styles.finalCard}>
            <Text style={styles.finalMatchTitle}>{selectedMatch.teams}</Text>
            <Text style={styles.finalLeague}>{selectedLeague}</Text>

            <View style={styles.marketSelector}>
              <Text style={styles.marketLabel}>Wybierz zdarzenie:</Text>
              {Object.entries(selectedMatch.odds).map(([market, odds]) => (
                <TouchableOpacity
                  key={market}
                  style={[styles.marketOption, selectedMarket === market && { borderColor: tintColor, backgroundColor: 'rgba(0,122,255,0.05)' }]}
                  onPress={() => setSelectedMarket(market)}
                >
                  <Text style={styles.marketName}>{market === '1' ? 'Wygrana Gospodarzy' : market === 'X' ? 'Remis' : 'Wygrana Gości'}</Text>
                  <Text style={[styles.marketOdds, { color: tintColor }]}>{odds as string}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.warningBox}>
              <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
              <Text style={styles.warningText}>Kurs został zamrożony. Nie możesz go zmienić.</Text>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, (!selectedMarket) && { opacity: 0.5 }, { backgroundColor: tintColor }]}
              disabled={!selectedMarket}
              onPress={() => {
                alert('Typ został dodany i zweryfikowany!');
                reset();
              }}
            >
              <Text style={styles.submitButtonText}>Zatwierdź i opublikuj</Text>
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
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
    lineHeight: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  stepDot: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#eee',
    marginHorizontal: 4,
  },
  section: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sportCard: {
    width: '48%',
    backgroundColor: 'rgba(128,128,128,0.05)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  sportName: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    marginLeft: 5,
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(128,128,128,0.03)',
    borderRadius: 12,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    color: '#888',
  },
  matchItem: {
    padding: 16,
    backgroundColor: 'rgba(128,128,128,0.03)',
    borderRadius: 12,
    marginBottom: 12,
  },
  matchTeams: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  oddsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  miniOdd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#eee',
  },
  miniOddLabel: {
    fontSize: 12,
    color: '#888',
  },
  miniOddValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  finalCard: {
    padding: 20,
    backgroundColor: 'rgba(128,128,128,0.05)',
    borderRadius: 20,
  },
  finalMatchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  finalLeague: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  marketSelector: {
    marginBottom: 20,
  },
  marketLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#666',
  },
  marketOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  marketName: {
    fontWeight: '500',
  },
  marketOdds: {
    fontWeight: 'bold',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76,175,80,0.1)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 12,
    color: '#2E7D32',
    marginLeft: 8,
    fontWeight: '500',
  },
  submitButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
