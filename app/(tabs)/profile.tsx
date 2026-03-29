import * as React from 'react';
import { StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, Platform, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';

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

  const renderHistoryItem = ({ item, index }: { item: typeof HISTORY[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}
    >
      <TouchableOpacity style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
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
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.tint, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="share-social-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
            style={styles.avatarWrapper}
          >
            <Image source={{ uri: USER_STATS.avatar }} style={styles.avatar} />
            <MotiView 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ loop: true, duration: 2000 }}
              style={[styles.onlineIndicator, { borderColor: colors.accent }]} 
            />
          </MotiView>
          <MotiText from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} style={styles.userName}>{USER_STATS.name}</MotiText>
          <View style={styles.rankBadge}>
            <MaterialCommunityIcons name="star-circle" size={16} color={colors.gold} />
            <Text style={[styles.rankText, { color: colors.gold }]}>{USER_STATS.rank}</Text>
          </View>
        </View>
      </LinearGradient>

      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200 }}
        style={[styles.statsDashboard, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: colors.success }]}>{USER_STATS.yield}</Text>
          <Text style={[styles.statLab, { color: colors.muted }]}>YIELD</Text>
        </View>
        <View style={[styles.statSep, { backgroundColor: colors.border }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: colors.text }]}>{USER_STATS.winRate}</Text>
          <Text style={[styles.statLab, { color: colors.muted }]}>WIN RATE</Text>
        </View>
        <View style={[styles.statSep, { backgroundColor: colors.border }]} />
        <View style={styles.statBox}>
          <Text style={[styles.statVal, { color: colors.text }]}>{USER_STATS.avgOdds}</Text>
          <Text style={[styles.statLab, { color: colors.muted }]}>AVG ODDS</Text>
        </View>
      </MotiView>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Portfolio Growth</Text>
          <View style={[styles.periodBadge, { backgroundColor: colors.tint + '15' }]}>
            <Text style={[styles.periodText, { color: colors.tint }]}>LAST 30D</Text>
          </View>
        </View>
        <View style={[styles.chartContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <LineChart
            style={{ height: 160 }}
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
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Verified Activity</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={[styles.seeMore, { color: colors.tint }]}>Full Log</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.tint} />
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
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 80,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    borderWidth: 4,
  },
  userName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  statsDashboard: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: -40,
    borderRadius: 35,
    padding: 28,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statSep: {
    width: 1,
    height: '70%',
    alignSelf: 'center',
    opacity: 0.3,
  },
  statVal: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  statLab: {
    fontSize: 10,
    fontWeight: '900',
    marginTop: 8,
    letterSpacing: 1,
  },
  section: {
    marginTop: 45,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '900',
  },
  chartContainer: {
    borderRadius: 35,
    borderWidth: 1,
    padding: 24,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  historyIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  historyContent: {
    flex: 1,
  },
  historyMatch: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  historyTip: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyResult: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  historyDate: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '900',
    marginRight: 4,
  },
});
