import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from './src/screens/FirstScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Produk from './src/screens/Produk';
import Detail from './src/screens/Detail';
import Forum from './src/screens/Forum';
import Profile from './src/screens/Profile';
import { Image } from 'react-native';

const HomeIcon = require('./src/assets/icon_home.png');
const ProfileIcon = require('./src/assets/icon_profile.png');
const ForumIcon = require('./src/assets/icon_forum.png');
const ShoppingIcon = require('./src/assets/icon_shopping_bag.png');
const Logo = require('./src/assets/logo_gd.png');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#018129',
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={HomeIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#018129' : 'gray',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ForumIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#018129' : 'gray',
              }}
            />
          ),
        }}
      />

      {/* Tombol Tengah - Buat Surat */}
      <Tab.Screen
        name="BuatSurat"
        component={BuatSurat} // Ganti dengan komponen yang sesuai
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: 'absolute',
                bottom: 20, // Mengangkat tombol ke atas
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#018129',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8,
                }}
              >
                <Image
                  source={Logo}
                  style={{
                    width: 35,
                    height: 35,
                    tintColor: 'white',
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Belanja"
        component={Produk}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ShoppingIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#018129' : 'gray',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ProfileIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#018129' : 'gray',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Produk" component={Produk} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Forum" component={Forum} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
