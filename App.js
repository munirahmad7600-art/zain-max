import React, { useEffect, Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/constants/theme';
import superDimagh from './src/services/SuperDimagh';
import healthTracker from './src/services/HealthTracker';
import evolutionEngine from './src/services/EvolutionEngine';

import HomeScreen from './src/screens/HomeScreen';
import VoiceChatScreen from './src/screens/VoiceChatScreen';
import CreativeStudioScreen from './src/screens/CreativeStudioScreen';
import SocialScreen from './src/screens/SocialScreen';
import BrainSettingsScreen from './src/screens/BrainSettingsScreen';
import WhatsAppAutomationScreen from './src/screens/whatsapp/WhatsAppAutomationScreen';
import GhupshupScreen from './src/screens/ghupshup/GhupshupScreen';
import HealthDashboardScreen from './src/screens/health/HealthDashboardScreen';
import BriefingScreen from './src/screens/BriefingScreen';
import EvolutionLabScreen from './src/screens/evolution/EvolutionLabScreen';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ZAIN MAX CRASH:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>⚠️ App Crashed!</Text>
          <Text style={styles.errorMessage}>
            {this.state.error?.message || 'Unknown error'}
          </Text>
          <ScrollView style={styles.errorScroll}>
            <Text style={styles.errorStack}>
              {this.state.error?.stack || 'No stack trace'}
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          >
            <Text style={styles.retryText}>🔄 Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    padding: 20,
    justifyContent: 'center',
  },
  errorTitle: {
    color: '#ff4444',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#ff8888',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  errorScroll: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorStack: {
    color: '#aaa',
    fontSize: 11,
    fontFamily: 'monospace',
  },
  retryBtn: {
    backgroundColor: '#6c5ce7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: COLORS.bg },
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: { fontWeight: '700', fontSize: 18 },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: COLORS.bg },
  animation: 'slide_from_right',
};

function AppContent() {
  useEffect(() => {
    try {
      superDimagh.init();
      healthTracker.init();
      evolutionEngine.init();
    } catch (e) {
      console.error('Init error:', e);
    }
  }, []);

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: COLORS.neonPurple,
          background: COLORS.bg,
          card: COLORS.bgCard,
          text: COLORS.textPrimary,
          border: COLORS.border,
          notification: COLORS.neonPink,
        },
      }}
    >
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Briefing" component={BriefingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VoiceChat" component={VoiceChatScreen} options={{ title: '🎙️ Gemini Live', headerTransparent: true }} />
        <Stack.Screen name="Ghupshup" component={GhupshupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreativeStudio" component={CreativeStudioScreen} options={{ title: '🎨 Creative Studio', headerTransparent: true }} />
        <Stack.Screen name="Social" component={SocialScreen} options={{ title: '🤖 Social Auto Pilot', headerTransparent: true }} />
        <Stack.Screen name="BrainSettings" component={BrainSettingsScreen} options={{ title: '🧠 MAX Brain Settings', headerTransparent: true }} />
        <Stack.Screen name="HealthDashboard" component={HealthDashboardScreen} options={{ title: '🏥 Health Dashboard', headerTransparent: true }} />
        <Stack.Screen name="WhatsAppAutomation" component={WhatsAppAutomationScreen} options={{ title: '💬 WhatsApp Automation', headerTransparent: true }} />
        <Stack.Screen name="EvolutionLab" component={EvolutionLabScreen} options={{ title: '🧬 Evolution Lab', headerTransparent: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
