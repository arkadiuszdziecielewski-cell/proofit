import * as React from 'react';
import { StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { LinearGradient } from 'expo-linear-gradient';

const USER_STATS = {
  name: 'Jan Bet',
  rank: 'ELITE ANALYST',
  avatar: 'https://i.pravatar.cc/150?u=1',
  yield: '+24.5%',
  avgOdds: '1.95',
  winRate: '68%',
  totalTips: 120,
  profit: '+1,450 PLN',
};

const CHART_DATA = [50, 40, 65, 55, 75, 85, 80, 100, 110, 105, 125, 140];

const HISTORY = [
  { id: '1', match: 'Real Madrid vs Barcelona', tip: 'Over 2.5', odds: '1.85', result: 'win', date: '28 MAR' },
  { id: '2', match: 'Bayern vs BVB', tip: '1', odds: '1.60', result: 'loss', date: '27 MAR' },
  { id: '3', match: 'Lakers vs Warriors', tip: 'Over 220.5', odds: '1.90', result: 'win', date: '26 MAR' },
  { id: '4', match: 'Iga Świątek vs Aryna Sabalenka', tip: '1', odds: '1.65', result: 'win', date: '25 MAR' },
];

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const renderHistoryItem = ({ item }: { item: typeof HISTORY[0] }) => (
    <View style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.historyIcon, { backgroundColor: item.result === 'win' ? colors.success + '15' : colors.error + '15' }]}>
        <Ionicons 
          name={item.result === 'win' ? "trending-up" : "trending-down"} 
          size={20} 
          color={item.result === 'win' ? colors.success : colors.error} 
        />
      </View>
      <View style={styles.historyContent}>
        <Text style={[styles.historyMatch, { color: colors.text }]}>{item.match}</Text>
        <Text style={[styles.historyTip, { color: colors.muted }]}>{item.tip} @ {item.odds}</Text>
      </View>
      <View style={styles.historyRight}>
        <Text style={[styles.historyResult, { color: item.result === 'win' ? colors.success : colors.error }]}>
          {item.result === 'win' ? 'WIN' : 'LOSS'}
        </Text>
        <Text style={[styles.historyDate, { color: colors.muted }]}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.tint, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerBackground}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-social-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: USER_STATS.avatar }} style={styles.avatar} />
            <View style={[styles.onlineBadge, { borderColor: colors.accent }]} />
          </View>
          <Text style={styles.name}>{USER_STATS.name}</Text>
          <View style={[styles.rankBadge, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
            <MaterialCommunityIcons name="star-circle" size={16} color={colors.gold} />
            <Text style={[styles.rankText, { color: colors.gold }]}>{USER_STATS.rank}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={[styles.statsContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.success }]}>{USER_STATS.yield}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>YIELD</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>{USER_STATS.winRate}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>WIN RATE</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>{USER_STATS.avgOdds}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>AVG ODDS</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Capital Growth</Text>
          <View style={[styles.periodBadge, { backgroundColor: colors.tint + '15' }]}>
            <Text style={[styles.periodText, { color: colors.tint }]}>30D</Text>
          </View>
        </View>
        <View style={[styles.chartWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <LineChart
            style={{ height: 180 }}
            data={CHART_DATA}
            svg={{ 
              stroke: colors.tint, 
              strokeWidth: 4,
              strokeLinecap: 'round',
            }}
            contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
            curve={shape.curveNatural}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Verified History</Text>
          <TouchableOpacity>
            <Text style={[styles.seeMore, { color: colors.tint }]}>Full History</Text>
          </TouchableOpacity>
        </View>
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
  headerBackground: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 70,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
  },
  iconButton: {
    width: 40,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    borderWidth: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: -35,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '70%',
    alignSelf: 'center',
    opacity: 0.3,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 35,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  periodBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '800',
  },
  chartWrapper: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 14,
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  historyContent: {
    flex: 1,
  },
  historyMatch: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  historyTip: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyResult: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  historyDate: {
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '800',
  },
});
