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
  Filter
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TOP_TYPERS = [
  { id: '1', name: 'Jan Bet', yield: '+24.5%', tips: 120, winRate: '68%', rank: 1, avatar: 'https://i.pravatar.cc/150?u=1', bio: 'Tennis Expert • ATP/WTA' },
  { id: '2', name: 'Marek Pro', yield: '+18.2%', tips: 85, winRate: '62%', rank: 2, avatar: 'https://i.pravatar.cc/150?u=2', bio: 'Premier League Specialist' },
  { id: '3', name: 'Zibi Tip', yield: '+15.1%', tips: 210, winRate: '58%', rank: 3, avatar: 'https://i.pravatar.cc/150?u=3', bio: 'NBA & Euroleague' },
];

const HOT_TIPS = [
  { id: '1', match: 'Real Madrid vs Barcelona', tip: 'Over 2.5', odds: '1.85', league: 'La Liga', type: 'LIVE', expert: 'Jan Bet' },
  { id: '2', match: 'Iga Świątek vs Sabalenka', tip: '1', odds: '1.65', league: 'WTA Miami', type: '20:45', expert: 'Marek Pro' },
  { id: '3', match: 'Legia vs Lech', tip: 'BTTS', odds: '1.92', league: 'Ekstraklasa', type: 'Tomorrow', expert: 'Zibi Tip' },
];

export default function ArenaScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const renderTyperCard = ({ item, index }: { item: typeof TOP_TYPERS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 100 }}
      style={styles.typerCardContainer}
    >
      <TouchableOpacity activeOpacity={0.7} style={[styles.typerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Image source={{ uri: item.avatar }} style={styles.typerAvatar} />
        <View style={styles.typerInfo}>
          <View style={styles.typerHeader}>
            <Text style={[styles.typerName, { color: colors.text }]}>{item.name}</Text>
            {item.rank === 1 && <Trophy size={14} color={colors.gold} />}
          </View>
          <Text style={[styles.typerBio, { color: colors.muted }]} numberOfLines={1}>{item.bio}</Text>
          <View style={styles.typerStats}>
            <View style={styles.statPill}>
              <TrendingUp size={12} color={colors.success} />
              <Text style={[styles.statText, { color: colors.success }]}>{item.yield}</Text>
            </View>
            <Text style={[styles.statSub, { color: colors.muted }]}>{item.winRate} WR</Text>
          </View>
        </View>
        <ArrowUpRight size={20} color={colors.muted} />
      </TouchableOpacity>
    </MotiView>
  );

  const renderTipCard = ({ item, index }: { item: typeof HOT_TIPS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
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
          <Users size={14} color={colors.muted} />
          <Text style={[styles.expertName, { color: colors.muted }]}>{item.expert}</Text>
        </View>
        <View style={[styles.oddsContainer, { backgroundColor: colors.tint }]}>
          <Text style={styles.oddsText}>{item.tip} @ {item.odds}</Text>
        </View>
      </View>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.muted }]}>Marketplace</Text>
            <Text style={[styles.title, { color: colors.text }]}>The Arena</Text>
          </View>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Analysts</Text>
            <TouchableOpacity><Text style={{ color: colors.tint, fontWeight: '600' }}>View all</Text></TouchableOpacity>
          </View>
          <FlatList
            data={TOP_TYPERS}
            renderItem={renderTyperCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleWithIcon}>
              <Flame size={18} color={colors.error} />
              <Text style={[styles.sectionTitle, { color: colors.text, marginLeft: 8 }]}>Hot Opportunities</Text>
            </View>
            <TouchableOpacity style={styles.filterBtn}>
              <Filter size={16} color={colors.muted} />
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
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  horizontalList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  typerCardContainer: {
    marginRight: 12,
  },
  typerCard: {
    width: 260,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  typerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  typerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 4,
  },
  typerName: {
    fontSize: 16,
    fontWeight: '700',
  },
  typerBio: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  typerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  statText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  statSub: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterBtn: {
    padding: 8,
  },
  tipCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 12,
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
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
  expertName: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  oddsContainer: {
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
