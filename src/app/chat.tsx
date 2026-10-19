import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
};

export default function ChatScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: '你好！我是你的 AI 旅行管家 Spontai。你想去哪里玩？或者有什么特别的偏好吗？' }
  ]);
  
  // 用 ReturnType 替代 NodeJS.Timeout，彻底解决 TypeScript 标红问题
  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    const aiMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '' }]);

    const fullText = `收到！针对你说的「${userMsg.text}」，我为你生成了一份专属行程：\n\n📍 第一天：市中心经典打卡\n📍 第二天：当地美食与隐藏小店探索\n📍 第三天：自然风光放松游\n\n你需要我把这个加入你的行程表吗？`;
    
    // 清除之前的定时器
    if (typingTimer.current) clearInterval(typingTimer.current);
    
    let currentIndex = 0;
    typingTimer.current = setInterval(() => {
      currentIndex++;
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, text: fullText.slice(0, currentIndex) } : msg
        )
      );

      if (currentIndex >= fullText.length) {
        if (typingTimer.current) clearInterval(typingTimer.current);
      }
    }, 50); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} 
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>AI 旅行管家</Text>
          <View style={styles.statusDot} />
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageWrapper, msg.role === 'user' ? styles.userWrapper : styles.aiWrapper]}>
            {msg.role === 'ai' && (
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={16} color="#fff" />
              </View>
            )}
            <View style={[styles.messageBubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={[styles.messageText, msg.role === 'user' && styles.userText]}>
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="告诉 AI 你想怎么玩..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  backBtn: { padding: 5 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50' },
  chatArea: { flex: 1 },
  messageWrapper: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-end' },
  userWrapper: { justifyContent: 'flex-end' },
  aiWrapper: { justifyContent: 'flex-start' },
  aiAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  messageBubble: { maxWidth: '80%', padding: 15, borderRadius: 20 },
  userBubble: { backgroundColor: '#007AFF', borderBottomRightRadius: 4 },
  aiBubble: { backgroundColor: '#fff', borderBottomLeftRadius: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  messageText: { fontSize: 16, color: '#333', lineHeight: 22 },
  userText: { color: '#fff' },
  inputContainer: { flexDirection: 'row', padding: 15, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EEE', alignItems: 'center', paddingBottom: Platform.OS === 'ios' ? 30 : 15 },
  input: { flex: 1, backgroundColor: '#F7F9FC', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
});