import React, {useContext} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PostProvider} from '../context/PostProvider';
import {AuthContext} from '../context/AuthContext';
import {StackNavigationProp} from '@react-navigation/stack';
//screens
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import Notifications from '../screens/Notifications';
import Explore from '../screens/Explore';
import AddScreen from '../screens/AddScreen';
import {TabActions, useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  Explore: undefined;
  Add: undefined;
  Feature: undefined;
  Notifications: undefined;
  Home: undefined;
  User: {userId: any} | undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Tabs() {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <PostProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            color = 'black';
            size = 20;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Explore') {
              iconName = focused ? 'search-sharp' : 'search-outline';
            } else if (route.name === 'Add') {
              return (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 3,
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    shadowColor: '#1D1A20',
                    borderRadius: 25,
                    elevation: 24,
                    zIndex: 0,
                  }}>
                  <Ionicons name="add-circle" color={'black'} size={56} />
                </View>
              );
            } else if (route.name === 'Notifications') {
              iconName = focused
                ? 'ios-notifications-sharp'
                : 'ios-notifications-outline';
            } else if (route.name === 'User') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }
            return <Ionicons name={`${iconName}`} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            borderTopWidth: 0,
            shadowOffset: {
              width: 0,
              height: 0, // for IOS
            },
          },
          lazy: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{tabBarBadge: 3}}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          listeners={{
            tabPress: event => {
              event.preventDefault();
              const action = TabActions.jumpTo('User', {userId: null});
              navigation.dispatch(action);
            },
          }}
        />
      </Tab.Navigator>
    </PostProvider>
  );
}
