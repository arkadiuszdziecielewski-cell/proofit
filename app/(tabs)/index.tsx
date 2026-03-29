import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Platform, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

const TOP_TYPERS = [
  { id: '1', name: 'Jan Bet', yield: '+24.5%', tips: 120, winRate: '68%', rank: 1, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Marek Pro', yield: '+18.2%', tips: 85, winRate: '62%', rank: 2, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Zibi Tip', yield: '+15.1%', tips: 210, winRate: '58%', rank: 3, avatar: 'https://i.pravatar.cc/150?u=3' },
];

const HOT_TIPS = [
  { id: '1', match: 'Real Madrid vs Barcelona', tip: 'Over 2.5', odds: '1.85', buyers: 124, league: 'La Liga' },
  { id: '2', match: 'Iga Świątek vs Aryna Sabalenka', tip: '1', odds: '1.65', buyers: 89, league: 'WTA Miami' },
  { id: '3', match: 'Legia Warszawa vs Lech Poznań', tip: 'BTTS', odds: '1.92', buyers: 56, league: 'Ekstraklasa' },
];

const FILTERS = ['All', 'Football', 'Tennis', 'Basketball', 'E-sport'];

export default function ArenaScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const renderTyper = ({ item }: { item: typeof TOP_TYPERS[0] }) => (
    <TouchableOpacity style={[styles.typerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.rankBadge, { backgroundColor: item.rank === 1 ? colors.gold : colors.muted + '20' }]}>
        <Text style={[styles.rankText, { color: item.rank === 1 ? '#000' : colors.text }]}>{item.rank}</Text>
      </View>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.typerInfo}>
        <Text style={[styles.typerName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.typerStats, { color: colors.muted }]}>{item.tips} tips • {item.winRate} winrate</Text>
      </View>
      <View style={styles.yieldContainer}>
        <Text style={[styles.yieldText, { color: colors.success }]}>{item.yield}</Text>
        <Text style={[styles.yieldLabel, { color: colors.muted }]}>YIELD</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHotTip = ({ item }: { item: typeof HOT_TIPS[0] }) => (
    <TouchableOpacity style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.tipHeader}>
        <View style={[styles.leagueBadge, { backgroundColor: colors.tint + '15' }]}>
          <Text style={[styles.leagueText, { color: colors.tint }]}>{item.league}</Text>
        </View>
        <View style={[styles.oddsBadge, { backgroundColor: colors.success + '15' }]}>
          <Text style={[styles.oddsText, { color: colors.success }]}>{item.odds}</Text>
        </View>
      </View>
      <Text style={[styles.matchText, { color: colors.text }]}>{item.match}</Text>
      <View style={styles.tipDetailRow}>
        <Text style={[styles.tipLabel, { color: colors.muted }]}>Prediction:</Text>
        <Text style={[styles.tipValue, { color: colors.text }]}>{item.tip}</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.tipFooter}>
        <View style={styles.buyerContainer}>
          <FontAwesome5 name="users" size={12} color={colors.muted} />
          <Text style={[styles.buyerText, { color: colors.muted }]}>{item.buyers} unlocked</Text>
        </View>
        <TouchableOpacity style={[styles.buyButton, { backgroundColor: colors.tint }]}>
          <Text style={styles.buyButtonText}>Unlock Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.tint + '20', 'transparent']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Arena</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>Verified Tip Marketplace</Text>
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer} contentContainerStyle={styles.filterContent}>
        {FILTERS.map((filter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.filterChip, 
              { 
                backgroundColor: index === 0 ? colors.tint : colors.card, 
                borderColor: index === 0 ? colors.tint : colors.border 
              },
              index === 0 && styles.activeFilterChip
            ]}
          >
            <Text style={[styles.filterText, { color: index === 0 ? '#fff' : colors.muted }]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Leaderboard</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: colors.tint }]}>Ranking</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={TOP_TYPERS}
          renderItem={renderTyper}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.row}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Trending Predictions</Text>
            <MaterialCommunityIcons name="fire" size={24} color={colors.error} style={{ marginLeft: 8 }} />
          </View>
        </View>
        <FlatList
          data={HOT_TIPS}
          renderItem={renderHotTip}
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
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 25,
  },
  header: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
    fontWeight: '600',
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterContent: {
    paddingHorizontal: 18,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  activeFilterChip: {
    shadowOpacity: 0.25,
    shadowColor: '#6366F1',
  },
  filterText: {
    fontWeight: '800',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 35,
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
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  seeAll: {
    fontWeight: '800',
    fontSize: 14,
  },
  typerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 14,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '900',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(128,128,128,0.1)',
  },
  typerInfo: {
    flex: 1,
  },
  typerName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  typerStats: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  yieldContainer: {
    alignItems: 'flex-end',
  },
  yieldText: {
    fontSize: 20,
    fontWeight: '900',
  },
  yieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipCard: {
    padding: 22,
    borderRadius: 30,
    borderWidth: 1,
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leagueBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  leagueText: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  oddsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  oddsText: {
    fontWeight: '900',
    fontSize: 14,
  },
  matchText: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  tipDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  tipLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 8,
  },
  tipValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    marginBottom: 18,
    opacity: 0.2,
  },
  tipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buyerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyerText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  buyButton: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
});
