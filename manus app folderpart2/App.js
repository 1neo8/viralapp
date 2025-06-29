import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './screens/HomeScreen';
import RecordingsScreen from './screens/RecordingsScreen';
import SettingsScreen from './screens/SettingsScreen';
import BillingScreen from './screens/BillingScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ name, focused }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.tabIconText, { color: focused ? '#FF6B6B' : '#666' }]}>
        {name}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#FF6B6B',
            tabBarInactiveTintColor: '#666',
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon name="🏠" focused={focused} />,
            }}
          />
          <Tab.Screen
            name="Recordings"
            component={RecordingsScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon name="📹" focused={focused} />,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon name="⚙️" focused={focused} />,
            }}
          />
          <Tab.Screen
            name="Billing"
            component={BillingScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon name="💳" focused={focused} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
    borderTopWidth: 0,
    height: 80,
    paddingBottom: 20,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: 20,
  },
});

