import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 顶部欢迎语 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>你好，旅行者 👋</Text>
          </View>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={20} color="#fff" />
          </View>
        </View>

        {/* 搜索框 */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput 
            placeholder="搜索目的地、活动..." 
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
        {/* AI 智能横幅入口 */}
        <TouchableOpacity 
          style={styles.aiBanner} 
          activeOpacity={0.9}
          onPress={() => router.push('/chat')}
        >
          <View style={styles.aiBannerLeft}>
            <Ionicons name="sparkles" size={24} color="#fff" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.aiBannerTitle}>让 AI 帮你规划行程</Text>
              <Text style={styles.aiBannerDesc}>一键生成专属旅行路线</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
        {/* 横向分类标签 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={styles.categoryContainer}>
          <TouchableOpacity style={[styles.categoryTag, styles.categoryTagActive]}>
            <Text style={styles.categoryTextActive}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTag}>
            <Text style={styles.categoryText}>自然风光</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTag}>
            <Text style={styles.categoryText}>美食探店</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTag}>
            <Text style={styles.categoryText}>历史人文</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 推荐活动卡片 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>为你推荐</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>查看全部</Text>
          </TouchableOpacity>
        </View>
        
        {/* 卡片 1 */}
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&auto=format&fit=crop' }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardContent}>
            <View style={styles.cardBadge}>
              <Text style={styles.cardBadgeText}>热门</Text>
            </View>
            <Text style={styles.cardTitle}>伦敦眼夜间游</Text>
            <Text style={styles.cardDesc}>体验伦敦最美的夜景，俯瞰泰晤士河</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardPrice}>£35.00</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* 卡片 2 */}
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop' }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardContent}>
            <View style={[styles.cardBadge, { backgroundColor: '#FFE4E1' }]}>
              <Text style={[styles.cardBadgeText, { color: '#FF4500' }]}>美食</Text>
            </View>
            <Text style={styles.cardTitle}>街头美食之旅</Text>
            <Text style={styles.cardDesc}>品尝最地道的当地小吃和特色料理</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardPrice}>£20.00</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  title: { fontSize: 26, fontWeight: '800', color: '#1A1A1A' },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#333' },
  aiBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1A1A1A', borderRadius: 16, padding: 16, marginTop: 20, marginBottom: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  aiBannerLeft: { flexDirection: 'row', alignItems: 'center' },
  aiBannerTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  aiBannerDesc: { color: '#AAA', fontSize: 12, marginTop: 2 },
  categoryScroll: { marginTop: 20, maxHeight: 40 },
  categoryContainer: { gap: 10, paddingRight: 20 },
  categoryTag: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0' },
  categoryTagActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  categoryText: { color: '#666', fontWeight: '600' },
  categoryTextActive: { color: '#fff', fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  seeAllText: { color: '#007AFF', fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 15, elevation: 5 },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 15 },
  cardBadge: { position: 'absolute', top: -15, right: 15, backgroundColor: '#E6F2FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  cardBadgeText: { color: '#007AFF', fontSize: 12, fontWeight: '700' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginBottom: 5 },
  cardDesc: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 12 },
  cardPrice: { fontSize: 18, fontWeight: '800', color: '#007AFF' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 14, fontWeight: '600', color: '#666' },
});