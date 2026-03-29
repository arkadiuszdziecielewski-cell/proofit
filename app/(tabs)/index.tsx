import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Platform, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';

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

  const renderTyper = ({ item, index }: { item: typeof TOP_TYPERS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 100, type: 'timing' }}
    >
      <TouchableOpacity style={[styles.typerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[styles.rankBadge, { backgroundColor: item.rank === 1 ? colors.gold : 'rgba(255,255,255,0.05)' }]}>
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
    </MotiView>
  );

  const renderHotTip = ({ item, index }: { item: typeof HOT_TIPS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 400 + index * 100, type: 'spring' }}
    >
      <TouchableOpacity style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <LinearGradient
          colors={['rgba(255,255,255,0.02)', 'transparent']}
          style={styles.cardGradient}
        >
          <View style={styles.tipHeader}>
            <View style={[styles.leagueBadge, { backgroundColor: colors.tint + '20' }]}>
              <Text style={[styles.leagueText, { color: colors.tint }]}>{item.league}</Text>
            </View>
            <View style={[styles.oddsBadge, { backgroundColor: colors.accent + '20' }]}>
              <Text style={[styles.oddsText, { color: colors.accent }]}>{item.odds}</Text>
            </View>
          </View>
          <Text style={[styles.matchText, { color: colors.text }]}>{item.match}</Text>
          <View style={styles.tipDetailRow}>
            <Text style={[styles.tipLabel, { color: colors.muted }]}>PREDICTION</Text>
            <Text style={[styles.tipValue, { color: colors.text }]}>{item.tip}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.tipFooter}>
            <View style={styles.buyerContainer}>
              <FontAwesome5 name="fire" size={14} color={colors.error} />
              <Text style={[styles.buyerText, { color: colors.muted }]}>{item.buyers} ACTIVE</Text>
            </View>
            <TouchableOpacity style={[styles.buyButton, { backgroundColor: colors.tint }]}>
              <LinearGradient
                colors={[colors.tint, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buyButtonGradient}
              >
                <Text style={styles.buyButtonText}>UNLOCK ACCESS</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
          <MotiView from={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="trending-up" size={30} color="#fff" />
            </View>
          </MotiView>
          <View style={styles.headerTitleContainer}>
            <MotiText from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} style={styles.logoText}>PROOFIT</MotiText>
            <Text style={styles.headerSubtitle}>Elite Betting Exchange</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer} contentContainerStyle={styles.filterContent}>
          {FILTERS.map((filter, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.filterChip, 
                { 
                  backgroundColor: index === 0 ? colors.tint : colors.card, 
                  borderColor: index === 0 ? colors.tint : colors.border 
                }
              ]}
            >
              <Text style={[styles.filterText, { color: index === 0 ? '#fff' : colors.muted }]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Elite Board</Text>
            <TouchableOpacity style={styles.row}>
              <Text style={[styles.seeAll, { color: colors.accent }]}>Ranking</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.accent} />
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
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Live Opportunities</Text>
              <MotiView
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ loop: true, duration: 2000 }}
                style={styles.liveDot}
              />
            </View>
          </View>
          <FlatList
            data={HOT_TIPS}
            renderItem={renderHotTip}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
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
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: -25,
  },
  filterContainer: {
    marginBottom: 30,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 22,
    marginHorizontal: 6,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  filterText: {
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 40,
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
    fontWeight: '900',
    fontSize: 14,
    marginRight: 4,
  },
  typerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '900',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    marginRight: 16,
  },
  typerInfo: {
    flex: 1,
  },
  typerName: {
    fontSize: 18,
    fontWeight: '900',
  },
  typerStats: {
    fontSize: 13,
    fontWeight: '700',
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
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  tipCard: {
    borderRadius: 36,
    borderWidth: 1,
    marginBottom: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  cardGradient: {
    padding: 24,
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
    fontSize: 15,
  },
  matchText: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  tipDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tipLabel: {
    fontSize: 12,
    fontWeight: '900',
    marginRight: 10,
    letterSpacing: 1,
  },
  tipValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    marginBottom: 20,
    opacity: 0.1,
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
    fontWeight: '900',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  buyButton: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  buyButtonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    marginLeft: 10,
  },
});
