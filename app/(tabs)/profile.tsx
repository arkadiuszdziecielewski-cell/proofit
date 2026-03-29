import * as React from 'react';
import { StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const USER_STATS = {
  name: 'Jan Bet',
  rank: 'PRO TYPER',
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
        colors={[colors.tint, colors.tint + 'dd']}
        style={styles.headerBackground}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-social-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: USER_STATS.avatar }} style={styles.avatar} />
            <View style={[styles.onlineBadge, { borderColor: colors.tint }]} />
          </View>
          <Text style={styles.name}>{USER_STATS.name}</Text>
          <View style={styles.rankBadge}>
            <MaterialCommunityIcons name="shield-check" size={16} color={colors.gold} />
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
          <Text style={[styles.statLabel, { color: colors.muted }]}>SKUTECZNOŚĆ</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>{USER_STATS.avgOdds}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>ŚR. KURS</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Wykres Portfela</Text>
          <View style={[styles.periodBadge, { backgroundColor: colors.tint + '15' }]}>
            <Text style={[styles.periodText, { color: colors.tint }]}>Ostatnie 30 dni</Text>
          </View>
        </View>
        <View style={[styles.chartWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <LineChart
            style={{ height: 160 }}
            data={CHART_DATA}
            svg={{ stroke: colors.tint, strokeWidth: 4 }}
            contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
            curve={shape.curveNatural}
          >
            <LinearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              {/* Note: SVG gradients are handled differently in Victory/SVGCharts, but this is a simplified version */}
            </LinearGradient>
          </LineChart>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Historia Typów</Text>
          <TouchableOpacity>
            <Text style={[styles.seeMore, { color: colors.tint }]}>Zobacz wszystko</Text>
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
    paddingBottom: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#34D399',
    borderWidth: 3,
  },
  name: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '60%',
    alignSelf: 'center',
    opacity: 0.5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  periodBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '700',
  },
  chartWrapper: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  historyIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  historyContent: {
    flex: 1,
  },
  historyMatch: {
    fontSize: 15,
    fontWeight: '800',
  },
  historyTip: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyResult: {
    fontSize: 14,
    fontWeight: '900',
  },
  historyDate: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '700',
  },
});
