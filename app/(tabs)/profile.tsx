import * as React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Platform, useWindowDimensions, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { 
  Settings, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  History
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const USER_STATS = {
  name: 'Jan Bet',
  rank: 'Elite Analyst',
  avatar: 'https://i.pravatar.cc/150?u=1',
  yield: '+24.5%',
  winRate: '68%',
  totalTips: 120,
  balance: '14,250.00',
  currency: 'PLN',
  id: 'USER-8829-QX',
};

const CHART_DATA = [50, 40, 65, 55, 75, 85, 80, 100, 110, 105, 125, 140];

const HISTORY_DATA = [
  { id: '1', match: 'Real Madrid vs Barcelona', tip: 'Over 2.5', odds: '1.85', result: 'win', date: '28 Mar', profit: '+85.00' },
  { id: '2', match: 'Bayern vs BVB', tip: '1', odds: '1.60', result: 'loss', date: '27 Mar', profit: '-100.00' },
  { id: '3', match: 'Lakers vs Warriors', tip: 'Over 220.5', odds: '1.90', result: 'win', date: '26 Mar', profit: '+90.00' },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const Logo = () => (
    <View style={styles.logoContainer}>
      <LinearGradient
        colors={[colors.tint, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoIconBox}
      >
        <ShieldCheck size={18} color="#fff" strokeWidth={2.5} />
      </LinearGradient>
      <Text style={[styles.logoText, { color: colors.text }]}>
        PROO<Text style={{ color: colors.tint }}>FIT</Text>
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Logo />
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Settings size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.profileMain}>
            <Image source={{ uri: USER_STATS.avatar }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>{USER_STATS.name}</Text>
              <View style={styles.rankBadge}>
                <Text style={[styles.rankText, { color: colors.muted }]}>{USER_STATS.rank}</Text>
              </View>
              <Text style={[styles.userId, { color: colors.muted }]}>ID: {USER_STATS.id}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.editBtn, { borderColor: colors.border }]}>
            <Text style={[styles.editBtnText, { color: colors.text }]}>Edytuj</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.walletContainer}>
          <LinearGradient
            colors={[colors.tint, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.walletCard}
          >
            <View style={styles.walletHeader}>
              <View style={styles.walletIconBox}>
                <Wallet size={20} color="#fff" />
              </View>
              <Text style={styles.walletLabel}>Całkowite Saldo</Text>
            </View>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceVal}>{USER_STATS.balance}</Text>
              <Text style={styles.currency}>{USER_STATS.currency}</Text>
            </View>
            <View style={styles.walletFooter}>
              <TouchableOpacity style={styles.actionBtn}>
                <CreditCard size={18} color={colors.tint} />
                <Text style={[styles.actionBtnText, { color: colors.tint }]}>Wpłać</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnSecondary}>
                <ArrowUpRight size={18} color="#fff" />
                <Text style={styles.actionBtnTextSecondary}>Wypłać</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TrendingUp size={20} color={colors.success} style={{ marginBottom: 8 }} />
            <Text style={[styles.statLabel, { color: colors.muted }]}>Yield</Text>
            <Text style={[styles.statVal, { color: colors.success }]}>{USER_STATS.yield}</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <CheckCircle2 size={20} color={colors.tint} style={{ marginBottom: 8 }} />
            <Text style={[styles.statLabel, { color: colors.muted }]}>Skuteczność</Text>
            <Text style={[styles.statVal, { color: colors.text }]}>{USER_STATS.winRate}</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <History size={20} color={colors.muted} style={{ marginBottom: 8 }} />
            <Text style={[styles.statLabel, { color: colors.muted }]}>Typy</Text>
            <Text style={[styles.statVal, { color: colors.text }]}>{USER_STATS.totalTips}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Wzrost Kapitału</Text>
          <View style={[styles.chartBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <LineChart
              style={{ height: 160 }}
              data={CHART_DATA}
              svg={{ 
                stroke: colors.tint, 
                strokeWidth: 3,
              }}
              contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
              curve={shape.curveNatural}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Ostatnia Aktywność</Text>
            <TouchableOpacity><Text style={{ color: colors.tint, fontWeight: '600' }}>Zobacz wszystko</Text></TouchableOpacity>
          </View>
          <View style={[styles.historyList, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {HISTORY_DATA.map((item, idx) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.historyItem, { borderBottomColor: idx === HISTORY_DATA.length - 1 ? 'transparent' : colors.border }]}
              >
                <View style={[styles.historyIcon, { backgroundColor: item.result === 'win' ? colors.success + '15' : colors.error + '15' }]}>
                  {item.result === 'win' ? 
                    <CheckCircle2 size={18} color={colors.success} /> : 
                    <XCircle size={18} color={colors.error} />
                  }
                </View>
                <View style={styles.historyInfo}>
                  <Text style={[styles.historyMatch, { color: colors.text }]} numberOfLines={1}>{item.match}</Text>
                  <Text style={[styles.historySub, { color: colors.muted }]}>{item.tip} @ {item.odds} • {item.date}</Text>
                </View>
                <View style={styles.historyRight}>
                  <Text style={[styles.historyProfit, { color: item.result === 'win' ? colors.success : colors.error }]}>
                    {item.profit}
                  </Text>
                  <ChevronRight size={16} color={colors.muted} />
                </View>
              </TouchableOpacity>
            ))}
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
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
  },
  profileInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
  },
  rankBadge: {
    marginTop: 2,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
  },
  userId: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  walletContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  walletCard: {
    padding: 24,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  walletLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  balanceVal: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    color: '#fff',
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  walletFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
  actionBtnSecondary: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnTextSecondary: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 10,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  statVal: {
    fontSize: 17,
    fontWeight: '800',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  chartBox: {
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
  },
  historyList: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  historyMatch: {
    fontSize: 15,
    fontWeight: '600',
  },
  historySub: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  historyRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyProfit: {
    fontSize: 14,
    fontWeight: '700',
  },
});
