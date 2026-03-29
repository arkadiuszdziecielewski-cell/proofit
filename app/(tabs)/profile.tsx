import * as React from 'react';
import { StyleSheet, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const USER_STATS = {
  name: 'Jan Bet',
  rank: 'Elita',
  avatar: 'https://i.pravatar.cc/150?u=1',
  yield: '+24.5%',
  avgOdds: '1.95',
  winRate: '68%',
  totalTips: 120,
  profit: '+1,450 PLN',
};

const CHART_DATA = [50, 40, 65, 55, 75, 85, 80, 100, 110, 105, 125, 140];

const HISTORY = [
  { id: '1', match: 'Real Madrid vs Barcelona', tip: 'Over 2.5', odds: '1.85', result: 'win', date: '2026-03-28' },
  { id: '2', match: 'Bayern vs BVB', tip: '1', odds: '1.60', result: 'loss', date: '2026-03-27' },
  { id: '3', match: 'Lakers vs Warriors', tip: 'Over 220.5', odds: '1.90', result: 'win', date: '2026-03-26' },
  { id: '4', match: 'Iga Świątek vs Aryna Sabalenka', tip: '1', odds: '1.65', result: 'win', date: '2026-03-25' },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  const renderHistoryItem = ({ item }: { item: typeof HISTORY[0] }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyStatus}>
        {item.result === 'win' ? (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="close-circle" size={24} color="#F44336" />
        )}
      </View>
      <View style={styles.historyContent}>
        <Text style={styles.historyMatch}>{item.match}</Text>
        <Text style={styles.historyTip}>Typ: {item.tip} @ {item.odds}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <View style={styles.historyOdds}>
        <Text style={[styles.historyResultText, { color: item.result === 'win' ? '#4CAF50' : '#F44336' }]}>
          {item.result === 'win' ? 'Zysk' : 'Strata'}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileMain}>
          <Image source={{ uri: USER_STATS.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{USER_STATS.name}</Text>
            <View style={[styles.rankBadge, { backgroundColor: tintColor }]}>
              <Text style={styles.rankText}>{USER_STATS.rank}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="settings-outline" size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{USER_STATS.yield}</Text>
          <Text style={styles.statLabel}>Yield</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{USER_STATS.winRate}</Text>
          <Text style={styles.statLabel}>Skuteczność</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{USER_STATS.avgOdds}</Text>
          <Text style={styles.statLabel}>Śr. Kurs</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{USER_STATS.totalTips}</Text>
          <Text style={styles.statLabel}>Typy</Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Wykres Kapitału</Text>
        <View style={styles.chartContainer}>
          <LineChart
            style={{ height: 180 }}
            data={CHART_DATA}
            svg={{ stroke: tintColor, strokeWidth: 3 }}
            contentInset={{ top: 20, bottom: 20 }}
            curve={shape.curveNatural}
          />
        </View>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Historia "Zamrożona"</Text>
        <FlatList
          data={HISTORY}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  profileMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  rankBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  rankText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statBox: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  chartSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chartContainer: {
    height: 200,
    backgroundColor: 'rgba(128,128,128,0.05)',
    borderRadius: 16,
    padding: 10,
    justifyContent: 'center',
  },
  historySection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.1)',
  },
  historyStatus: {
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyMatch: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  historyTip: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  historyDate: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  historyOdds: {
    alignItems: 'flex-end',
  },
  historyResultText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
