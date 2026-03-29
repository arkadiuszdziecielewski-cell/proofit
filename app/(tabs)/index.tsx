import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
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

const FILTERS = ['Wszystkie', 'Piłka Nożna', 'Tenis', 'Koszykówka', 'E-sport'];

export default function ArenaScreen() {
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
        <Text style={[styles.typerStats, { color: colors.muted }]}>{item.tips} typów • {item.winRate} winrate</Text>
      </View>
      <View style={styles.yieldContainer}>
        <Text style={[styles.yieldText, { color: colors.success }]}>{item.yield}</Text>
        <Text style={[styles.yieldLabel, { color: colors.muted }]}>Yield (30d)</Text>
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
        <Text style={[styles.tipLabel, { color: colors.muted }]}>Typ:</Text>
        <Text style={[styles.tipValue, { color: colors.text }]}>{item.tip}</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.tipFooter}>
        <View style={styles.buyerContainer}>
          <FontAwesome5 name="users" size={12} color={colors.muted} />
          <Text style={[styles.buyerText, { color: colors.muted }]}>{item.buyers} kupiło</Text>
        </View>
        <TouchableOpacity style={[styles.buyButton, { backgroundColor: colors.tint }]}>
          <Text style={styles.buyButtonText}>Odblokuj</Text>
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
          <Text style={[styles.title, { color: colors.text }]}>Arena Liderów</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>Jedyna giełda z gwarancją statystyk</Text>
        </View>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer} contentContainerStyle={styles.filterContent}>
        {FILTERS.map((filter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.filterChip, 
              { backgroundColor: index === 0 ? colors.tint : colors.card, borderColor: colors.border },
              index === 0 && styles.activeFilterChip
            ]}
          >
            <Text style={[styles.filterText, { color: index === 0 ? '#fff' : colors.muted }]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Typerzy</Text>
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
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Gorące Typy</Text>
            <MaterialCommunityIcons name="fire" size={24} color="#FF4500" style={{ marginLeft: 8 }} />
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
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
    fontWeight: '500',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingHorizontal: 15,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 5,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activeFilterChip: {
    shadowOpacity: 0.3,
    shadowColor: '#10B981',
  },
  filterText: {
    fontWeight: '700',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  seeAll: {
    fontWeight: '700',
    fontSize: 14,
  },
  typerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '800',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
    borderWidth: 2,
    borderColor: 'rgba(128,128,128,0.1)',
  },
  typerInfo: {
    flex: 1,
  },
  typerName: {
    fontSize: 17,
    fontWeight: '700',
  },
  typerStats: {
    fontSize: 13,
    marginTop: 2,
  },
  yieldContainer: {
    alignItems: 'flex-end',
  },
  yieldText: {
    fontSize: 18,
    fontWeight: '900',
  },
  yieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tipCard: {
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  leagueBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  leagueText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  oddsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  oddsText: {
    fontWeight: '900',
    fontSize: 13,
  },
  matchText: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  tipDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  tipValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginBottom: 16,
    opacity: 0.5,
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
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  buyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
});
