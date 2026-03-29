import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Platform, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: index * 100, type: 'timing' }}
    >
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
    </MotiView>
  );

  const renderHotTip = ({ item, index }: { item: typeof HOT_TIPS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 300 + index * 100, type: 'spring' }}
    >
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
    </MotiView>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={[colors.tint, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
            style={styles.logoWrapper}
          >
            <MaterialCommunityIcons name="trending-up" size={32} color="#fff" />
          </MotiView>
          <View>
            <MotiText
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              style={styles.logoText}
            >
              PROOFIT
            </MotiText>
            <Text style={styles.headerTagline}>Verified Statistics Hub</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.mainContent}>
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
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Elite Leaderboard</Text>
            <TouchableOpacity style={styles.row}>
              <Text style={[styles.seeAll, { color: colors.tint }]}>Full View</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.tint} />
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
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Hot Picks</Text>
              <MotiView
                from={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ loop: true, duration: 1500 }}
              >
                <MaterialCommunityIcons name="fire" size={24} color={colors.error} style={{ marginLeft: 8 }} />
              </MotiView>
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
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },
  headerTagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: -2,
  },
  mainContent: {
    marginTop: -20,
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 6,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
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
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  seeAll: {
    fontWeight: '800',
    fontSize: 14,
    marginRight: 4,
  },
  typerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 14,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '900',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    marginRight: 16,
  },
  typerInfo: {
    flex: 1,
  },
  typerName: {
    fontSize: 17,
    fontWeight: '800',
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
    fontSize: 19,
    fontWeight: '900',
  },
  yieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  tipCard: {
    padding: 24,
    borderRadius: 32,
    borderWidth: 1,
    marginBottom: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
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
    marginBottom: 12,
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
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
});
