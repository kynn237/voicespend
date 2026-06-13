// App.js — VoiceSpend Mobile
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

// Screens
import HomeScreen from './src/screens/home/HomeScreen';
import VoiceScreen from './src/screens/voice/VoiceScreen';
import CameraScreen from './src/screens/camera/CameraScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#0a0a0f',
            borderTopColor: 'rgba(255,255,255,0.08)',
          },
          tabBarActiveTintColor: '#6c63ff',
          tabBarInactiveTintColor: '#555',
          headerStyle: { backgroundColor: '#0a0a0f' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen
          name="Accueil"
          component={HomeScreen}
          options={{ tabBarIcon: () => <Text>🏠</Text> }}
        />
        <Tab.Screen
          name="Vocal"
          component={VoiceScreen}
          options={{ tabBarIcon: () => <Text>🎤</Text> }}
        />
        <Tab.Screen
          name="Caméra"
          component={CameraScreen}
          options={{ tabBarIcon: () => <Text>📷</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}