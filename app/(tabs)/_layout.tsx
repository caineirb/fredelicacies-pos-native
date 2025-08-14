import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import SvgIcon from '@/components/ui/SvgIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabContentColor = Colors[colorScheme ?? 'light'].tab.content;
  const activeTabBarColor = Colors[colorScheme ?? 'light'].tab.selectedBackground;
  const inactiveTabBarColor = Colors[colorScheme ?? 'light'].tab.defaultBackground;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: activeTabBarColor,
        tabBarInactiveBackgroundColor: inactiveTabBarColor,
        tabBarActiveTintColor: tabContentColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: ({ size }) => (
            <SvgIcon
              color={tabContentColor}
              size={size}
              assetModule={require('@/assets/icons/store.svg')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ size }) => (
            <SvgIcon
              color={tabContentColor}
              size={size}
              assetModule={require('@/assets/icons/inventory.svg')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orderHistory"
        options={{
          title: 'Order History',
          tabBarIcon: ({ size }) => (
            <SvgIcon
              color={tabContentColor}
              size={size}
              assetModule={require('@/assets/icons/orderHistory.svg')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: 'Logs',
          tabBarIcon: ({ size }) => (
            <SvgIcon
              color={tabContentColor}
              size={size}
              assetModule={require('@/assets/icons/logs.svg')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size }) => (
            <SvgIcon
              color={tabContentColor}
              size={size}
              assetModule={require('@/assets/icons/settings.svg')}
            />
          ),
        }}
      />
    </Tabs>
  );
}