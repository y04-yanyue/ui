import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const [preferences, setPreferences] = useState({
    nature: true,
    food: true,
    history: false,
    nightlife: false,
  });

  // 既然改成了 single 模式，直接在这里读取就可以了
  useEffect(() => {
    const loadPrefs = async () => {
      try {
        const saved = await AsyncStorage.getItem('@user_preferences');
        if (saved) {
          setPreferences(JSON.parse(saved));
        }
      } catch (e) {
        console.error('读取失败', e);
      }
    };
    loadPrefs();
  }, []);

  const toggleSwitch = async (key: keyof typeof preferences) => {
    const newPrefs = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPrefs);
    try {
      await AsyncStorage.setItem('@user_preferences', JSON.stringify(newPrefs));
    } catch (e) {
      console.error('保存失败', e);
    }
  };

  const clearData = async () => {
    await AsyncStorage.removeItem('@user_preferences');
    setPreferences({ nature: true, food: true, history: false, nightlife: false });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* 头部用户信息 */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <Text style={styles.userName}>旅行者 TestUser</Text>
          <Text style={styles.userEmail}>test@spontai.com</Text>
        </View>

        {/* 偏好设置列表 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>我的旅行偏好</Text>
          <Text style={styles.sectionDesc}>Spontai 的 AI 会根据你的偏好为你推荐行程 (已开启本地记忆)</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="leaf-outline" size={22} color="#4CAF50" />
              <Text style={styles.settingText}>自然风光</Text>
            </View>
            <Switch 
              value={preferences.nature} 
              onValueChange={() => toggleSwitch('nature')} 
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="restaurant-outline" size={22} color="#FF9800" />
              <Text style={styles.settingText}>美食探店</Text>
            </View>
            <Switch 
              value={preferences.food} 
              onValueChange={() => toggleSwitch('food')} 
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="business-outline" size={22} color="#2196F3" />
              <Text style={styles.settingText}>历史人文</Text>
            </View>
            <Switch 
              value={preferences.history} 
              onValueChange={() => toggleSwitch('history')} 
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={22} color="#9C27B0" />
              <Text style={styles.settingText}>夜生活</Text>
            </View>
            <Switch 
              value={preferences.nightlife} 
              onValueChange={() => toggleSwitch('nightlife')} 
            />
          </View>
        </View>

        {/* 清除数据按钮 */}
        <TouchableOpacity style={styles.clearBtn} onPress={clearData}>
          <Text style={styles.clearBtnText}>重置偏好设置</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F9FC' },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { alignItems: 'center', marginTop: 30, marginBottom: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  userEmail: { fontSize: 14, color: '#666', marginTop: 5 },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  sectionDesc: { fontSize: 13, color: '#888', marginTop: 5, marginBottom: 20 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settingText: { fontSize: 16, color: '#333', fontWeight: '500' },
  clearBtn: { backgroundColor: '#FFE5E5', padding: 15, borderRadius: 12, alignItems: 'center' },
  clearBtnText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 16 },
});