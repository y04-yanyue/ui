import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const exploreData = [
  { id: '1', title: '巴黎', subtitle: '浪漫之都', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop', height: 220 },
  { id: '2', title: '东京', subtitle: '霓虹与樱花', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop', height: 160 },
  { id: '3', title: '巴厘岛', subtitle: '热带风情', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop', height: 180 },
  { id: '4', title: '冰岛', subtitle: '极光与冰川', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=400&auto=format&fit=crop', height: 240 },
  { id: '5', title: '纽约', subtitle: '不夜城', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400&auto=format&fit=crop', height: 200 },
  { id: '6', title: '罗马', subtitle: '永恒之城', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop', height: 160 },
];

export default function ExploreScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>探索世界</Text>
        
        {/* 顶部搜索 */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput 
            placeholder="你想去哪里？" 
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

               {/* 瀑布流/网格 布局 */}
        <View style={styles.gridContainer}>
          {exploreData.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card} 
              activeOpacity={0.9}
              // 👇 核心魔法在这里，把数据传过去
              onPress={() => router.push({
                pathname: '/destination/[id]',
                params: { 
                  id: item.id, 
                  title: item.title, 
                  subtitle: item.subtitle, 
                  image: item.image 
                }
              })}
            >
              <Image source={{ uri: item.image }} style={[styles.cardImage, { height: item.height }]} />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
  container: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: '800', color: '#1A1A1A', marginTop: 20, marginBottom: 15 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#333' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', marginBottom: 15, borderRadius: 16, overflow: 'hidden', backgroundColor: '#000', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  cardImage: { width: '100%', resizeMode: 'cover', opacity: 0.85 },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: 'rgba(0,0,0,0.3)' },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  cardSubtitle: { color: '#E0E0E0', fontSize: 12, marginTop: 2 },
});