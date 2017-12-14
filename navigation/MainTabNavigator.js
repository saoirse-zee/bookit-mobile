import React from 'react'
import { Platform } from 'react-native'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import Colors from '../constants/Colors'

import HomeScreen from '../src/screens/HomeScreen'
import BookingsScreen from '../src/screens/BookingsScreen'
import AccountScreen from '../src/screens/AccountScreen'

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Bookings: {
      screen: BookingsScreen,
    },
    Account: {
      screen: AccountScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let iconName
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
            break
          case 'Bookings':
            iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'
            break
          case 'Account':
            iconName = Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'
            break
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        )
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
)
