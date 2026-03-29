import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Platform, useWindowDimensions, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { 
  Search, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowUpRight, 
  Flame, 
  Trophy,
  Filter,
  Star
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TOP_TYPERS = [
  { 
    id: '1', 
    name: 'Kamil Bet', 
    yield: '+32.4%', 
    tips: 145, 
    winRate: '72%', 
    rank: 1, 
    avatar: 'https://i.pravatar.cc/150?u=11', 
    bio: 'Ekspert Tenis • ATP/WTA',
    profit: '12,450 PLN'
  },
  { 
    id: '2', 
    name: 'Marek Pro', 
    yield: '+21.2%', 
    tips: 92, 
    winRate: '65%', 
    rank: 2, 
    avatar: 'https://i.pravatar.cc/150?u=22', 
    bio: 'Premier League Specialist',
    profit: '8,200 PLN'
  },
  { 
    id: '3', 
    name: 'Zibi Tip', 
    yield: '+18.1%', 
    tips: 230, 
    winRate: '59%', 
    rank: 3, 
    avatar: 'https://i.pravatar.cc/150?u=33', 
    bio: 'NBA & Euroleague Expert',
    profit: '5,150 PLN'
  },
];

const HOT_TIPS = [
  { id: '1', match: 'Real Madrid vs Barcelona', tip: 'Over 2.5', odds: '1.85', league: 'La Liga', type: 'LIVE', expert: 'Kamil Bet', price: '29.99 PLN' },
  { id: '2', match: 'Iga Świątek vs Sabalenka', tip: '1', odds: '1.65', league: 'WTA Miami', type: '20:45', expert: 'Marek Pro', price: '19.99 PLN' },
  { id: '3', match: 'Legia vs Lech', tip: 'BTTS', odds: '1.92', league: 'Ekstraklasa', type: 'Jutro', expert: 'Zibi Tip', price: 'Darmowy' },
];

export default function ArenaScreen() {
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
        <ShieldCheck size={22} color="#fff" strokeWidth={2.5} />
      </LinearGradient>
      <View style={styles.logoTextContainer}>
        <Text style={[styles.logoText, { color: colors.text }]}>
          PROO<Text style={{ color: colors.tint }}>FIT</Text>
        </Text>
      </View>
    </View>
  );

  const renderTyperCard = ({ item, index }: { item: typeof TOP_TYPERS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 100, type: 'spring' }}
      style={styles.typerCardContainer}
    >
      <TouchableOpacity activeOpacity={0.8} style={[styles.typerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.typerCardTop}>
          <Image source={{ uri: item.avatar }} style={styles.typerAvatar} />
          <View style={styles.typerMainInfo}>
            <View style={styles.nameRow}>
              <Text style={[styles.typerName, { color: colors.text }]}>{item.name}</Text>
              {item.rank === 1 && <Trophy size={14} color={colors.gold} fill={colors.gold} />}
            </View>
            <Text style={[styles.typerBio, { color: colors.muted }]} numberOfLines={1}>{item.bio}</Text>
          </View>
          <View style={[styles.rankBadge, { backgroundColor: colors.background }]}>
            <Text style={[styles.rankText, { color: colors.tint }]}>#{item.rank}</Text>
          </View>
        </View>

        <View style={[styles.cardDivider, { backgroundColor: colors.border }]} />

        <View style={styles.typerStatsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.muted }]}>YIELD</Text>
            <Text style={[styles.statValue, { color: colors.success }]}>{item.yield}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.muted }]}>ZYSK</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{item.profit}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.muted }]}>SKUTECZNOŚĆ</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{item.winRate}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.followBtn, { backgroundColor: colors.tint }]}>
          <Text style={styles.followBtnText}>Zobacz Profil</Text>
          <ArrowUpRight size={16} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    </MotiView>
  );

  const renderTipCard = ({ item, index }: { item: typeof HOT_TIPS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 300 + index * 100 }}
      style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <View style={styles.tipHeader}>
        <View style={[styles.typeBadge, { backgroundColor: item.type === 'LIVE' ? colors.error : colors.background }]}>
          <Text style={[styles.typeText, { color: item.type === 'LIVE' ? '#fff' : colors.muted }]}>{item.type}</Text>
        </View>
        <Text style={[styles.tipLeague, { color: colors.muted }]}>{item.league}</Text>
      </View>

      <Text style={[styles.tipMatch, { color: colors.text }]}>{item.match}</Text>
      
      <View style={styles.tipFooter}>
        <View style={styles.expertRow}>
          <View style={[styles.expertAvatarMini, { backgroundColor: colors.border }]} />
          <Text style={[styles.expertName, { color: colors.muted }]}>{item.expert}</Text>
        </View>
        <View style={styles.tipAction}>
          <Text style={[styles.tipPrice, { color: colors.text }]}>{item.price}</Text>
          <TouchableOpacity style={[styles.oddsBadge, { backgroundColor: colors.tint }]}>
            <Text style={styles.oddsText}>{item.tip} @ {item.odds}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Logo />
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Search size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroSection}>
          <MotiText 
            from={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={[styles.greeting, { color: colors.muted }]}
          >
            Witaj w Proofit
          </MotiText>
          <MotiText 
            from={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 100 }}
            style={[styles.title, { color: colors.text }]}
          >
            Najlepsi Typerzy
          </MotiText>
        </View>

        <View style={styles.section}>
          <FlatList
            data={TOP_TYPERS}
            renderItem={renderTyperCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            snapToInterval={SCREEN_WIDTH * 0.85 + 20}
            decelerationRate="fast"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithIcon}>
              <Flame size={18} color={colors.error} fill={colors.error} />
              <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 8 }]}>Gorące Okazje</Text>
            </View>
            <TouchableOpacity>
              <Filter size={20} color={colors.muted} />
            </TouchableOpacity>
          </View>
          {HOT_TIPS.map((tip, idx) => renderTipCard({ item: tip, index: idx }))}
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
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoTextContainer: {
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  section: {
    marginBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  horizontalList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  typerCardContainer: {
    marginRight: 15,
  },
  typerCard: {
    width: SCREEN_WIDTH * 0.85,
    padding: 20,
    borderRadius: 28,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  typerCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  typerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  typerMainInfo: {
    flex: 1,
    marginLeft: 15,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typerName: {
    fontSize: 18,
    fontWeight: '700',
  },
  typerBio: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  rankBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '800',
  },
  cardDivider: {
    height: 1,
    width: '100%',
    marginBottom: 20,
  },
  typerStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  followBtn: {
    height: 50,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  followBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  tipCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 15,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tipLeague: {
    fontSize: 12,
    fontWeight: '600',
  },
  tipMatch: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 15,
  },
  tipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expertRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expertAvatarMini: {
    width: 24,
    height: 24,
    borderRadius: 8,
    marginRight: 8,
  },
  expertName: {
    fontSize: 13,
    fontWeight: '600',
  },
  tipAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipPrice: {
    fontSize: 13,
    fontWeight: '700',
  },
  oddsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  oddsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
