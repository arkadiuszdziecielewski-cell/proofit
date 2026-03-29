import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

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
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  const renderTyper = ({ item }: { item: typeof TOP_TYPERS[0] }) => (
    <TouchableOpacity style={styles.typerCard}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>{item.rank}</Text>
      </View>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.typerInfo}>
        <Text style={styles.typerName}>{item.name}</Text>
        <Text style={styles.typerStats}>{item.tips} typów • {item.winRate} winrate</Text>
      </View>
      <View style={styles.yieldContainer}>
        <Text style={styles.yieldText}>{item.yield}</Text>
        <Text style={styles.yieldLabel}>Yield (30d)</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHotTip = ({ item }: { item: typeof HOT_TIPS[0] }) => (
    <TouchableOpacity style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <Text style={styles.leagueText}>{item.league}</Text>
        <View style={styles.oddsBadge}>
          <Text style={styles.oddsText}>{item.odds}</Text>
        </View>
      </View>
      <Text style={styles.matchText}>{item.match}</Text>
      <Text style={styles.tipText}>Typ: {item.tip}</Text>
      <View style={styles.tipFooter}>
        <View style={styles.buyerContainer}>
          <FontAwesome5 name="users" size={12} color="#888" />
          <Text style={styles.buyerText}>{item.buyers} kupiło</Text>
        </View>
        <TouchableOpacity style={[styles.buyButton, { backgroundColor: tintColor }]}>
          <Text style={styles.buyButtonText}>Odblokuj</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Arena Liderów</Text>
        <Text style={styles.subtitle}>Giełda zweryfikowanych typów</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {FILTERS.map((filter, index) => (
          <TouchableOpacity key={index} style={[styles.filterChip, index === 0 && { backgroundColor: tintColor }]}>
            <Text style={[styles.filterText, index === 0 && { color: '#fff' }]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Typerzy (30 dni)</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: tintColor }]}>Zobacz ranking</Text>
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
          <Text style={styles.sectionTitle}>Gorące Typy</Text>
          <MaterialCommunityIcons name="fire" size={24} color="#FF4500" />
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
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  filterContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  filterText: {
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontWeight: '600',
  },
  typerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(128,128,128,0.05)',
    marginBottom: 10,
  },
  rankBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  typerInfo: {
    flex: 1,
  },
  typerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  typerStats: {
    fontSize: 12,
    color: '#888',
  },
  yieldContainer: {
    alignItems: 'flex-end',
  },
  yieldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  yieldLabel: {
    fontSize: 10,
    color: '#888',
  },
  tipCard: {
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.1)',
    marginBottom: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  leagueText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  oddsBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  oddsText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 12,
  },
  matchText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
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
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  buyButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
