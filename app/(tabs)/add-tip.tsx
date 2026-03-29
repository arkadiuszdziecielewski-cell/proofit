import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Platform, useWindowDimensions, View } from 'react-native';
import { Text } from '@/components/Themed';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText, AnimatePresence } from 'moti';
import { Easing } from 'react-native-reanimated';

const SPORTS = [
  { id: 'soccer', name: 'FOOTBALL', icon: 'sports-soccer', code: 'S-01' },
  { id: 'tennis', name: 'TENNIS', icon: 'sports-tennis', code: 'T-04' },
  { id: 'basketball', name: 'BASKETBALL', icon: 'sports-basketball', code: 'B-09' },
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
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'dark';
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
    }, 1500);
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Persistent HUD Elements */}
      <View style={[styles.hudCorner, { top: 40, left: 20, borderTopWidth: 1, borderLeftWidth: 1, borderColor: colors.cyber + '40' }]} />
      <View style={[styles.hudCorner, { top: 40, right: 20, borderTopWidth: 1, borderRightWidth: 1, borderColor: colors.cyber + '40' }]} />
      <View style={[styles.hudCorner, { bottom: 40, left: 20, borderBottomWidth: 1, borderLeftWidth: 1, borderColor: colors.cyber + '40' }]} />
      <View style={[styles.hudCorner, { bottom: 40, right: 20, borderBottomWidth: 1, borderRightWidth: 1, borderColor: colors.cyber + '40' }]} />

      <AnimatePresence exitBeforeEnter>
        {step === 1 && (
          <MotiView
            key="s1"
            from={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={[styles.fullPane, { height }]}
          >
            <View style={styles.scannerHeader}>
              <View style={styles.headerLine}>
                <MotiView 
                  animate={{ width: ['0%', '100%'] }} 
                  transition={{ duration: 2000, loop: true }}
                  style={[styles.scanLine, { backgroundColor: colors.cyber }]} 
                />
              </View>
              <Text style={[styles.scannerTitle, { color: colors.text }]}>INITIALIZING<Text style={{ color: colors.cyber }}> SCAN</Text></Text>
              <Text style={[styles.scannerSubtitle, { color: colors.muted }]}>ACCESSING GLOBAL ODDS FEED...</Text>
            </View>

            <View style={styles.sportsGrid}>
              {SPORTS.map((sport, idx) => (
                <MotiView 
                  key={sport.id}
                  from={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ delay: idx * 100, type: 'spring' }}
                  style={styles.sportCardWrapper}
                >
                  <TouchableOpacity
                    style={[styles.sportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                    onPress={() => handleSportSelect(sport.id)}
                  >
                    <LinearGradient
                      colors={[colors.cyber + '05', 'transparent']}
                      style={StyleSheet.absoluteFill}
                    />
                    <MaterialIcons name={sport.icon as any} size={42} color={colors.cyber} />
                    <Text style={[styles.sportLabel, { color: colors.text }]}>{sport.name}</Text>
                    <Text style={[styles.sportCode, { color: colors.muted }]}>{sport.code}</Text>
                    
                    <View style={[styles.cardAccent, { bottom: 15, right: 15, backgroundColor: colors.cyber }]} />
                  </TouchableOpacity>
                </MotiView>
              ))}
            </View>
          </MotiView>
        )}

        {step === 2 && (
          <MotiView
            key="s2"
            from={{ opacity: 0, translateX: 300 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -300 }}
            style={[styles.fullPane, { height }]}
          >
            <View style={styles.scannerHeader}>
              <TouchableOpacity onPress={() => setStep(1)} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={24} color={colors.cyber} />
                <Text style={[styles.backText, { color: colors.cyber }]}>RETURN</Text>
              </TouchableOpacity>
              <Text style={[styles.scannerTitle, { color: colors.text }]}>SELECT<Text style={{ color: colors.cyber }}> REGION</Text></Text>
            </View>

            <ScrollView contentContainerStyle={styles.listPadding}>
              {LEAGUES[selectedSport!].map((league, idx) => (
                <MotiView
                  key={league}
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 50 }}
                >
                  <TouchableOpacity
                    style={[styles.leagueRow, { borderColor: colors.border }]}
                    onPress={() => handleLeagueSelect(league)}
                  >
                    <View style={styles.leagueInfo}>
                      <Text style={[styles.leagueCode, { color: colors.cyber }]}>L-{100 + idx}</Text>
                      <Text style={[styles.leagueText, { color: colors.text }]}>{league.toUpperCase()}</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-double-right" size={20} color={colors.cyber} />
                  </TouchableOpacity>
                </MotiView>
              ))}
            </ScrollView>
          </MotiView>
        )}

        {step === 3 && (
          <MotiView
            key="s3"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={[styles.fullPane, { height }]}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <MotiView
                  animate={{ 
                    scale: [1, 1.5, 1],
                    rotate: ['0deg', '180deg', '360deg'],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ loop: true, duration: 2000 }}
                  style={[styles.loadingHex, { borderColor: colors.cyber }]}
                />
                <Text style={[styles.loadingText, { color: colors.cyber }]}>DECRYPTING DATA STREAM...</Text>
              </View>
            ) : (
              <>
                <View style={styles.scannerHeader}>
                  <TouchableOpacity onPress={() => setStep(2)} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={colors.cyber} />
                    <Text style={[styles.backText, { color: colors.cyber }]}>REGION</Text>
                  </TouchableOpacity>
                  <Text style={[styles.scannerTitle, { color: colors.text }]}>LIVE<Text style={{ color: colors.cyber }}> EVENTS</Text></Text>
                </View>
                <ScrollView contentContainerStyle={styles.listPadding}>
                  {MOCK_MATCHES[selectedLeague!]?.map((match, idx) => (
                    <TouchableOpacity
                      key={match.id}
                      style={[styles.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                      onPress={() => handleMatchSelect(match)}
                    >
                      <View style={styles.eventHeader}>
                        <View style={[styles.liveIndicator, { backgroundColor: colors.success }]} />
                        <Text style={[styles.eventTime, { color: colors.muted }]}>SIGNAL DETECTED</Text>
                      </View>
                      <Text style={[styles.eventTitle, { color: colors.text }]}>{match.teams}</Text>
                      <View style={styles.oddsGrid}>
                        {Object.entries(match.odds).map(([k, v]) => (
                          <View key={k} style={styles.oddSlot}>
                            <Text style={[styles.oddKey, { color: colors.muted }]}>{k}</Text>
                            <Text style={[styles.oddValue, { color: colors.cyber }]}>{v as string}</Text>
                          </View>
                        ))}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
          </MotiView>
        )}

        {step === 4 && (
          <MotiView
            key="s4"
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={[styles.fullPane, { height }]}
          >
            <View style={styles.verificationHeader}>
              <MotiView
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ loop: true, duration: 1500 }}
              >
                <MaterialCommunityIcons name="shield-lock-outline" size={80} color={colors.cyber} />
              </MotiView>
              <Text style={[styles.vTitle, { color: colors.text }]}>SECURITY<Text style={{ color: colors.cyber }}> LOCK</Text></Text>
              <Text style={[styles.vSubtitle, { color: colors.muted }]}>PREDICTION WILL BE IMMUTABLE ONCE COMMITTED</Text>
            </View>

            <View style={styles.vContent}>
              <View style={[styles.summaryPanel, { borderColor: colors.cyber + '40' }]}>
                <LinearGradient
                  colors={[colors.cyber + '10', 'transparent']}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryLabel, { color: colors.muted }]}>TARGET EVENT</Text>
                  <Text style={[styles.summaryValue, { color: colors.text }]}>{selectedMatch.teams}</Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryLabel, { color: colors.muted }]}>DATA SOURCE</Text>
                  <Text style={[styles.summaryValue, { color: colors.text }]}>{selectedLeague?.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.marketGrid}>
                {Object.entries(selectedMatch.odds).map(([m, o]) => (
                  <TouchableOpacity
                    key={m}
                    onPress={() => setSelectedMarket(m)}
                    style={[
                      styles.marketChoice, 
                      { backgroundColor: colors.card, borderColor: selectedMarket === m ? colors.cyber : colors.border }
                    ]}
                  >
                    <Text style={[styles.marketM, { color: colors.muted }]}>{m === '1' ? 'HOME' : m === 'X' ? 'DRAW' : 'AWAY'}</Text>
                    <Text style={[styles.marketO, { color: selectedMarket === m ? colors.cyber : colors.text }]}>{o as string}</Text>
                    {selectedMarket === m && (
                      <MotiView 
                        from={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        style={[styles.marketCheck, { backgroundColor: colors.cyber }]}
                      >
                        <Ionicons name="checkmark" size={14} color="#000" />
                      </MotiView>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.commitBtn, { opacity: selectedMarket ? 1 : 0.3 }]}
                disabled={!selectedMarket}
                onPress={() => { alert('ANALYSIS SECURED ON-CHAIN'); reset(); }}
              >
                <LinearGradient
                  colors={[colors.cyber, colors.plasma]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.commitGrad}
                >
                  <Text style={styles.commitText}>COMMIT TO SYSTEM</Text>
                  <MaterialCommunityIcons name="database-lock" size={20} color="#000" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hudCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    zIndex: 10,
  },
  fullPane: {
    width: '100%',
    paddingTop: 100,
  },
  scannerHeader: {
    paddingHorizontal: 35,
    marginBottom: 40,
  },
  headerLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  scanLine: {
    height: '100%',
    width: '30%',
  },
  scannerTitle: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  scannerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 2,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 25,
  },
  sportCardWrapper: {
    width: '50%',
    padding: 10,
  },
  sportCard: {
    height: 160,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  sportLabel: {
    fontSize: 14,
    fontWeight: '900',
    marginTop: 15,
    letterSpacing: 1,
  },
  sportCode: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  cardAccent: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 10,
    letterSpacing: 1,
  },
  listPadding: {
    paddingHorizontal: 35,
    paddingBottom: 100,
  },
  leagueRow: {
    height: 80,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  leagueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueCode: {
    fontSize: 10,
    fontWeight: '900',
    marginRight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  leagueText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  loadingHex: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
  },
  loadingText: {
    marginTop: 50,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 3,
  },
  eventCard: {
    padding: 25,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  eventTime: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
  },
  oddsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oddSlot: {
    alignItems: 'center',
  },
  oddKey: {
    fontSize: 9,
    fontWeight: '900',
    marginBottom: 4,
  },
  oddValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  verificationHeader: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  vTitle: {
    fontSize: 32,
    fontWeight: '900',
    marginTop: 20,
    letterSpacing: -1,
  },
  vSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 16,
    letterSpacing: 1,
  },
  vContent: {
    paddingHorizontal: 35,
  },
  summaryPanel: {
    padding: 25,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 30,
    overflow: 'hidden',
  },
  summaryItem: {
    marginVertical: 5,
  },
  summaryLabel: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '900',
  },
  summaryDivider: {
    height: 1,
    marginVertical: 15,
    opacity: 0.5,
  },
  marketGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  marketChoice: {
    width: '31%',
    height: 90,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marketM: {
    fontSize: 9,
    fontWeight: '900',
    marginBottom: 4,
  },
  marketO: {
    fontSize: 20,
    fontWeight: '900',
  },
  marketCheck: {
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
    height: 70,
    borderRadius: 20,
    overflow: 'hidden',
  },
  commitGrad: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commitText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    marginRight: 10,
  },
});
