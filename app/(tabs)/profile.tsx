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
import { BlurView } from 'expo-blur';

const USER_STATS = {
  name: 'JAN BET',
  rank: 'ELITE ANALYST',
  avatar: 'https://i.pravatar.cc/150?u=1',
  yield: '+24.5%',
  avgOdds: '1.95',
  winRate: '68%',
  totalTips: 120,
  balance: '14,250.00',
  currency: 'PLN',
  id: 'USER-8829-QX',
};

const CHART_DATA = [50, 40, 65, 55, 75, 85, 80, 100, 110, 105, 125, 140];

const HISTORY = [
  { id: '1', match: 'Real Madrid vs Barcelona', tip: 'Over 2.5', odds: '1.85', result: 'win', date: '28 MAR', profit: '+85.00' },
  { id: '2', match: 'Bayern vs BVB', tip: '1', odds: '1.60', result: 'loss', date: '27 MAR', profit: '-100.00' },
  { id: '3', match: 'Lakers vs Warriors', tip: 'Over 220.5', odds: '1.90', result: 'win', date: '26 MAR', profit: '+90.00' },
];

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.profileMeta}
          >
            <Text style={[styles.idText, { color: colors.cyber }]}>{USER_STATS.id}</Text>
            <View style={[styles.statusTag, { backgroundColor: colors.success + '20' }]}>
              <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
              <Text style={[styles.statusText, { color: colors.success }]}>ACTIVE</Text>
            </View>
          </MotiView>
        </View>

        <View style={styles.passportContainer}>
          <MotiView
            from={{ opacity: 0, rotateX: '45deg', scale: 0.9 }}
            animate={{ opacity: 1, rotateX: '0deg', scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            style={[styles.passport, { borderColor: colors.cyber + '40' }]}
          >
            <LinearGradient
              colors={[colors.cyber + '20', 'transparent', colors.plasma + '10']}
              style={StyleSheet.absoluteFill}
            />
            
            <View style={styles.passportTop}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: USER_STATS.avatar }} style={styles.avatar} />
                <View style={[styles.avatarFrame, { borderColor: colors.cyber }]} />
              </View>
              <View style={styles.mainInfo}>
                <Text style={styles.userName}>{USER_STATS.name}</Text>
                <View style={styles.rankBadge}>
                  <MaterialCommunityIcons name="seal-variant" size={14} color={colors.gold} />
                  <Text style={[styles.rankText, { color: colors.gold }]}>{USER_STATS.rank}</Text>
                </View>
                <Text style={[styles.memberSince, { color: colors.muted }]}>MEMBER SINCE 2024</Text>
              </View>
            </View>

            <View style={styles.passportDivider}>
              <View style={[styles.dot, { backgroundColor: colors.cyber }]} />
              <View style={[styles.line, { backgroundColor: colors.cyber + '20' }]} />
              <View style={[styles.dot, { backgroundColor: colors.cyber }]} />
            </View>

            <View style={styles.walletSection}>
              <View>
                <Text style={[styles.label, { color: colors.muted }]}>AVAILABLE CAPITAL</Text>
                <View style={styles.balanceRow}>
                  <Text style={styles.balance}>{USER_STATS.balance}</Text>
                  <Text style={[styles.currency, { color: colors.cyber }]}>{USER_STATS.currency}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.depositBtn, { backgroundColor: colors.cyber }]}>
                <Ionicons name="add" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.gridStats}>
              <View style={styles.gridItem}>
                <Text style={[styles.label, { color: colors.muted }]}>YIELD</Text>
                <Text style={[styles.gridVal, { color: colors.success }]}>{USER_STATS.yield}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={[styles.label, { color: colors.muted }]}>WIN RATE</Text>
                <Text style={styles.gridVal}>{USER_STATS.winRate}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={[styles.label, { color: colors.muted }]}>ODDS AVG</Text>
                <Text style={styles.gridVal}>{USER_STATS.avgOdds}</Text>
              </View>
            </View>
          </MotiView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>GROWTH TELEMETRY</Text>
            <View style={[styles.liveTag, { borderColor: colors.success }]}>
              <Text style={[styles.liveTagText, { color: colors.success }]}>LIVE</Text>
            </View>
          </View>
          
          <View style={[styles.chartContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <LineChart
              style={{ height: 180 }}
              data={CHART_DATA}
              svg={{ 
                stroke: colors.cyber, 
                strokeWidth: 4,
                strokeLinecap: 'round',
              }}
              contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
              curve={shape.curveNatural}
            />
            <LinearGradient
              colors={[colors.cyber + '15', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>IMMUTABLE TRANSACTION LOG</Text>
          <View style={[styles.logContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {HISTORY.map((item, idx) => (
              <MotiView
                key={item.id}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 300 + idx * 100 }}
                style={[styles.logItem, { borderBottomColor: colors.border }]}
              >
                <View style={styles.logLeft}>
                  <Text style={[styles.logMatch, { color: colors.text }]}>{item.match}</Text>
                  <Text style={[styles.logDetails, { color: colors.muted }]}>{item.tip} @ {item.odds}</Text>
                </View>
                <View style={styles.logRight}>
                  <Text style={[styles.logProfit, { color: item.result === 'win' ? colors.success : colors.error }]}>
                    {item.profit}
                  </Text>
                  <Text style={[styles.logDate, { color: colors.muted }]}>{item.date}</Text>
                </View>
              </MotiView>
            ))}
            <TouchableOpacity style={styles.viewMoreBtn}>
              <Text style={[styles.viewMoreText, { color: colors.cyber }]}>ACCESS FULL DATABASE</Text>
              <Ionicons name="chevron-down" size={16} color={colors.cyber} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingHorizontal: 25,
  },
  profileMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  passportContainer: {
    padding: 25,
    marginTop: 10,
  },
  passport: {
    borderRadius: 32,
    borderWidth: 1,
    padding: 25,
    overflow: 'hidden',
    backgroundColor: '#050505',
    ...Platform.select({
      ios: {
        shadowColor: '#00F2FF',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
    }),
  },
  passportTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  avatarFrame: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderWidth: 1,
    borderRadius: 24,
    opacity: 0.5,
  },
  mainInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 6,
    letterSpacing: 1,
  },
  memberSince: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 1,
  },
  passportDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  line: {
    flex: 1,
    height: 1,
    marginHorizontal: 10,
  },
  walletSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 6,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  balance: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  currency: {
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
  },
  depositBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
  },
  gridVal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  section: {
    paddingHorizontal: 25,
    marginBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 3,
  },
  liveTag: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveTagText: {
    fontSize: 8,
    fontWeight: '900',
  },
  chartContainer: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 15,
    overflow: 'hidden',
  },
  logContainer: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
  },
  logLeft: {
    flex: 1,
  },
  logMatch: {
    fontSize: 15,
    fontWeight: '900',
  },
  logDetails: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  logRight: {
    alignItems: 'flex-end',
  },
  logProfit: {
    fontSize: 14,
    fontWeight: '900',
  },
  logDate: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
  },
  viewMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  viewMoreText: {
    fontSize: 10,
    fontWeight: '900',
    marginRight: 8,
    letterSpacing: 1,
  },
});
