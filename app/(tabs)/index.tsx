import * as React from 'react';
import { StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Platform, useWindowDimensions, Dimensions, ViewStyle } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TOP_TYPERS = [
  { id: '1', name: 'JAN BET', yield: '+24.5%', tips: 120, winRate: '68%', rank: 1, avatar: 'https://i.pravatar.cc/150?u=1', bio: 'Tennis Expert • ATP/WTA', serial: 'PX-9001' },
  { id: '2', name: 'MAREK PRO', yield: '+18.2%', tips: 85, winRate: '62%', rank: 2, avatar: 'https://i.pravatar.cc/150?u=2', bio: 'Football • Premier League', serial: 'PX-7240' },
  { id: '3', name: 'ZIBI TIP', yield: '+15.1%', tips: 210, winRate: '58%', rank: 3, avatar: 'https://i.pravatar.cc/150?u=3', bio: 'Basketball • NBA Specialist', serial: 'PX-1150' },
];

const HOT_TIPS = [
  { id: '1', match: 'Real Madrid vs Barcelona', tip: 'Over 2.5', odds: '1.85', buyers: 124, league: 'LA LIGA', time: 'LIVE', risk: 'LOW' },
  { id: '2', match: 'Iga Świątek vs Aryna Sabalenka', tip: '1', odds: '1.65', buyers: 89, league: 'WTA MIAMI', time: '20:45', risk: 'MED' },
  { id: '3', match: 'Legia vs Lech', tip: 'BTTS', odds: '1.92', buyers: 56, league: 'EKSTRAKLASA', time: 'TOMORROW', risk: 'HIGH' },
];

export default function ArenaScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const renderTyperCard = ({ item, index }: { item: typeof TOP_TYPERS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.8, rotateY: '45deg' }}
      animate={{ opacity: 1, scale: 1, rotateY: '0deg' }}
      transition={{ delay: index * 200, type: 'spring' }}
      style={styles.typerSlide}
    >
      <TouchableOpacity activeOpacity={0.9} style={[styles.typerHeroCard, { borderColor: colors.border }]}>
        <Image source={{ uri: item.avatar }} style={styles.typerHeroAvatar} />
        
        {/* Neon Border Glow */}
        <LinearGradient
          colors={[colors.cyber, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.neonBorder}
        />

        <BlurView intensity={30} tint="dark" style={styles.typerHeroOverlay}>
          <View style={styles.typerHeroContent}>
            <View style={styles.typerHeroTop}>
              <View style={[styles.heroRank, { backgroundColor: colors.background }]}>
                <Text style={[styles.heroRankText, { color: colors.cyber }]}>LEVEL {item.rank}</Text>
              </View>
              <MotiView 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ loop: true, duration: 2000 }}
                style={styles.serialBox}
              >
                <Text style={styles.serialText}>{item.serial}</Text>
              </MotiView>
            </View>
            
            <Text style={styles.heroName}>{item.name}</Text>
            <View style={styles.statsRow}>
              <View>
                <Text style={styles.statLabel}>PROFIT</Text>
                <Text style={[styles.statValue, { color: colors.success }]}>{item.yield}</Text>
              </View>
              <View style={styles.statDivider} />
              <View>
                <Text style={styles.statLabel}>WIN RATE</Text>
                <Text style={styles.statValue}>{item.winRate}</Text>
              </View>
            </View>
            
            <View style={styles.bioContainer}>
              <View style={[styles.bioIndicator, { backgroundColor: colors.cyber }]} />
              <Text style={styles.heroBio}>{item.bio}</Text>
            </View>
          </View>
        </BlurView>
        
        {/* Cyber Decorative Elements */}
        <View style={[styles.cornerDetail, { top: 20, right: 20, borderTopWidth: 2, borderRightWidth: 2, borderColor: colors.cyber }]} />
        <View style={[styles.cornerDetail, { bottom: 20, left: 20, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: colors.cyber }]} />
      </TouchableOpacity>
    </MotiView>
  );

  const renderOpportunity = ({ item, index }: { item: typeof HOT_TIPS[0], index: number }) => (
    <MotiView
      from={{ opacity: 0, translateX: -100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ delay: 600 + index * 150 }}
      style={styles.oppCardContainer}
    >
      <TouchableOpacity activeOpacity={0.8} style={[styles.oppCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.oppLeftDecor}>
          <LinearGradient
            colors={[colors.cyber, colors.plasma]}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View style={styles.oppMainContent}>
          <View style={styles.oppHeader}>
            <View style={styles.leagueBox}>
              <Text style={[styles.oppLeague, { color: colors.cyber }]}>{item.league}</Text>
              <View style={[styles.leagueDot, { backgroundColor: colors.cyber }]} />
            </View>
            <Text style={[styles.oppTime, { color: colors.muted }]}>{item.time}</Text>
          </View>
          
          <Text style={[styles.oppMatch, { color: colors.text }]}>{item.match}</Text>
          
          <View style={styles.oppFooter}>
            <View style={styles.oppMetric}>
              <Text style={styles.metricLabel}>PREDICTION</Text>
              <Text style={[styles.metricValue, { color: colors.text }]}>{item.tip}</Text>
            </View>
            <View style={styles.oppAction}>
              <View style={styles.oddsBox}>
                <Text style={[styles.oppOdds, { color: colors.success }]}>{item.odds}</Text>
              </View>
              <TouchableOpacity style={[styles.unlockBtn, { backgroundColor: colors.text }]}>
                <Ionicons name="flash" size={16} color={colors.background} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Background Cyber Grid */}
      <View style={styles.gridOverlay}>
        {[...Array(10)].map((_, i) => (
          <View key={i} style={[styles.gridLine, { top: i * 100, backgroundColor: colors.border }]} />
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        <BlurView intensity={80} tint="dark" style={styles.headerGlass}>
          <View style={styles.navBar}>
            <View style={styles.logoContainer}>
              <MotiView 
                animate={{ rotate: '360deg' }}
                transition={{ loop: true, duration: 4000, type: 'timing' }}
                style={[styles.logoHex, { borderColor: colors.cyber }]} 
              />
              <Text style={[styles.brandName, { color: colors.text }]}>PROOFIT</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="notifications-outline" size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.profileCircle, { borderColor: colors.cyber }]}>
                <Image source={{ uri: TOP_TYPERS[0].avatar }} style={styles.miniAvatar} />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        <View style={styles.heroSection}>
          <MotiText 
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={[styles.heroTitle, { color: colors.text }]}
          >
            THE<Text style={{ color: colors.cyber }}> ARENA</Text>
          </MotiText>
          <Text style={[styles.heroSubtitle, { color: colors.muted }]}>
            DECENRTRALIZED INTELLIGENCE NETWORK // VERIFIED
          </Text>
        </View>

        <View style={styles.horizontalSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleBox}>
              <View style={[styles.titleIndicator, { backgroundColor: colors.cyber }]} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>TOP ANALYSTS</Text>
            </View>
            <Text style={styles.liveCount}>03 ONLINE</Text>
          </View>
          <FlatList
            data={TOP_TYPERS}
            renderItem={renderTyperCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH * 0.85 + 20}
            decelerationRate="fast"
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        <View style={styles.verticalSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleBox}>
              <View style={[styles.titleIndicator, { backgroundColor: colors.plasma }]} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>LIVE SIGNALS</Text>
            </View>
            <MotiView 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ loop: true, duration: 1000 }}
              style={[styles.pulse, { backgroundColor: colors.error }]}
            />
          </View>
          {HOT_TIPS.map((tip, idx) => renderOpportunity({ item: tip, index: idx }))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  gridLine: {
    height: 1,
    width: '100%',
    position: 'absolute',
  },
  headerGlass: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoHex: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    transform: [{ rotate: '45deg' }],
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginRight: 15,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 2,
  },
  miniAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  heroSection: {
    padding: 30,
    marginTop: 20,
  },
  heroTitle: {
    fontSize: 64,
    fontWeight: '900',
    letterSpacing: -4,
    lineHeight: 60,
  },
  heroSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 15,
    letterSpacing: 2,
  },
  horizontalSection: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  sectionTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIndicator: {
    width: 4,
    height: 16,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  liveCount: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.4)',
  },
  horizontalList: {
    paddingLeft: 30,
    paddingRight: 40,
  },
  typerSlide: {
    marginRight: 20,
    perspective: 1000,
  },
  typerHeroCard: {
    width: SCREEN_WIDTH * 0.85,
    height: 480,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: '#000',
  },
  neonBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  typerHeroAvatar: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.7,
  },
  typerHeroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    padding: 30,
  },
  typerHeroContent: {
    width: '100%',
  },
  typerHeroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroRank: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heroRankText: {
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 1,
  },
  serialBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
  },
  serialText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 9,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  heroName: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -2,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 30,
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bioIndicator: {
    width: 2,
    height: 14,
    marginTop: 3,
    marginRight: 10,
  },
  heroBio: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  cornerDetail: {
    position: 'absolute',
    width: 15,
    height: 15,
  },
  verticalSection: {
    paddingBottom: 120,
  },
  pulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  oppCardContainer: {
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  oppCard: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    height: 140,
  },
  oppLeftDecor: {
    width: 6,
    height: '100%',
  },
  oppMainContent: {
    flex: 1,
    padding: 20,
  },
  oppHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leagueBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 8,
  },
  oppLeague: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  oppTime: {
    fontSize: 10,
    fontWeight: '800',
  },
  oppMatch: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 15,
  },
  oppFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oppMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 8,
    fontWeight: '900',
    marginRight: 10,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '900',
  },
  oppAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oddsBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginRight: 10,
  },
  oppOdds: {
    fontSize: 16,
    fontWeight: '900',
  },
  unlockBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
