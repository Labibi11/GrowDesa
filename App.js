import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ProfileProvider, useProfile } from './src/context/ProfileContext';
import FirstScreen from './src/screens/FirstScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Forum from './src/screens/Forum';
import ForumDetails from './src/screens/ForumDetails';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import ChangePassword from './src/screens/ChangePassword';
import CompleteData from './src/screens/CompleteData';
import BuatSurat from './src/screens/BuatSurat';
import SuratKeteranganUsaha from './src/screens/SuratKeteranganUsaha';
import SuratKeteranganKematian from './src/screens/SuratKeteranganKematian';
import SuratKeteranganKehilangan from './src/screens/SuratKeteranganKehilangan';
import SuratKeteranganTidakMampu from './src/screens/SuratKeteranganTidakMampu';
import SuratDomisili from './src/screens/SuratDomisili';
import SuratPengantar from './src/screens/SuratPengantar';
import { Image, View, Alert } from 'react-native';

import { Linking } from 'react-native';

const HomeIcon = require('./src/assets/icon_home.png');
const ProfileIcon = require('./src/assets/icon_profile.png');
const ForumIcon = require('./src/assets/icon_forum.png');
const SearchIcon = require('./src/assets/Icon_search.png');
const Logo = require('./src/assets/logo_gd.png');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  const { checkDataComplete } = useProfile();

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
        component={BuatSurat}
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            console.log('=== BuatSurat Tab Pressed ===');
            const isDataComplete = checkDataComplete();
            console.log('Is Data Complete:', isDataComplete);

            if (!isDataComplete) {
              console.log('Data not complete, navigating to CompleteData');
              Alert.alert(
                'Lengkapi Data',
                'Silakan lengkapi data Anda terlebih dahulu sebelum menggunakan layanan persuratan.',
                [
                  {
                    text: 'Nanti',
                    style: 'cancel',
                  },
                  {
                    text: 'Lengkapi Sekarang',
                    onPress: () => {
                      console.log('Navigating to CompleteData');
                      navigation.navigate('CompleteData');
                    },
                  },
                ],
              );
            } else {
              console.log('Data complete, navigating to BuatSurat');
              navigation.navigate('BuatSurat');
            }
          },
        })}
        options={{
          tabBarLabel: 'Layanan',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: 'absolute',
                bottom: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Lingkaran Luar dengan warna #018129 */}
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: '#018129',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Lingkaran Dalam Putih */}
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={Logo}
                    style={{
                      width: 35,
                      height: 35,
                      tintColor: '#018129',
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cek Bansos"
        component={Detail}
        listeners={{
          tabPress: e => {
            e.preventDefault(); // menghentikan navigasi ke screen Produk
            Linking.openURL('https://cekbansos.kemensos.go.id/');
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={SearchIcon}
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
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            console.log('=== BuatSurat Tab Pressed ===');
            const isDataComplete = checkDataComplete();
            console.log('Is Data Complete:', isDataComplete);

            if (!isDataComplete) {
              console.log('Data not complete, navigating to CompleteData');
              Alert.alert(
                'Lengkapi Data',
                'Silakan lengkapi data Anda terlebih dahulu sebelum menggunakan layanan persuratan.',
                [
                  {
                    text: 'Nanti',
                    style: 'cancel',
                  },
                  {
                    text: 'Lengkapi Sekarang',
                    onPress: () => {
                      console.log('Navigating to CompleteData');
                      navigation.navigate('CompleteData');
                    },
                  },
                ],
              );
            } else {
              console.log('Data complete, navigating to BuatSurat');
              navigation.navigate('Profile');
            }
          },
        })}
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
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="CompleteData" component={CompleteData} />
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="ForumDetails" component={ForumDetails} />
      <Stack.Screen name="BuatSurat" component={BuatSurat} />
      <Stack.Screen
        name="SuratKeteranganUsaha"
        component={SuratKeteranganUsaha}
      />
      <Stack.Screen
        name="SuratKeteranganKematian"
        component={SuratKeteranganKematian}
      />
      <Stack.Screen
        name="SuratKeteranganKehilangan"
        component={SuratKeteranganKehilangan}
      />
      <Stack.Screen
        name="SuratKeteranganTidakMampu"
        component={SuratKeteranganTidakMampu}
      />
      <Stack.Screen name="SuratDomisili" component={SuratDomisili} />
      <Stack.Screen name="SuratPengantar" component={SuratPengantar} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <ProfileProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </ProfileProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
