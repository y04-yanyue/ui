import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function DestinationDetail() {
  const router = useRouter();
  // 接收从上一个页面传过来的参数
  const { id, title, subtitle, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 顶部大图 */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image as string }} style={styles.coverImage} />
          {/* 返回按钮 */}
          <SafeAreaView style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* 内容区域 */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color="#007AFF" />
            <Text style={styles.locationText}>{subtitle}</Text>
          </View>

          <Text style={styles.sectionTitle}>关于这里</Text>
          <Text style={styles.description}>
            这是一个非常美丽的地方，有着丰富的文化和历史。这里不仅有令人惊叹的风景，还有美食和热情的当地人。
            非常适合在假期来这里放松身心，体验不一样的风土人情。你可以在这里安排三到五天的行程。
          </Text>

          <Text style={styles.sectionTitle}>推荐活动</Text>
          <View style={styles.activityRow}>
            <View style={styles.activityCard}>
              <Ionicons name="camera-outline" size={24} color="#FF9800" />
              <Text style={styles.activityText}>城市漫步</Text>
            </View>
            <View style={styles.activityCard}>
              <Ionicons name="restaurant-outline" size={24} color="#4CAF50" />
              <Text style={styles.activityText}>品尝美食</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部浮动预订按钮 */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>预估花费</Text>
          <Text style={styles.priceText}>£120.00</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>加入行程</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { width: '100%', height: 300, position: 'relative' },
  coverImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  backButtonContainer: { position: 'absolute', top: 10, left: 20 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: '800', color: '#1A1A1A' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 20 },
  locationText: { fontSize: 16, color: '#007AFF', marginLeft: 4, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginTop: 15, marginBottom: 10 },
  description: { fontSize: 15, color: '#666', lineHeight: 24 },
  activityRow: { flexDirection: 'row', gap: 15, marginTop: 5 },
  activityCard: { flex: 1, backgroundColor: '#F7F9FC', padding: 15, borderRadius: 12, alignItems: 'center', gap: 8 },
  activityText: { fontSize: 14, fontWeight: '600', color: '#333' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingBottom: 35 },
  priceLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  priceText: { fontSize: 22, fontWeight: '800', color: '#007AFF' },
  bookButton: { backgroundColor: '#007AFF', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 12 },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});