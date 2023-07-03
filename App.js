import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getShifts, getShiftsWeb, getUsers, getUsersWeb } from './util/dbHandler';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { LoadingScreen } from './screens/LoadingScreen';
import { ManageEmployeesScreen } from './screens/MangeEmployeesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getIsAdmin } from './util/Security';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [serverLoaded, setServerLoaded] = useState(false)
  const [fontsLoaded] = useFonts({
    'CourierPrime': require('./assets/fonts/CourierPrime-Regular.ttf'),
    'CourierPrimeBold': require('./assets/fonts/CourierPrime-Bold.ttf')
  });

  // allows refresh from within child elements refreshFromAppJS passed as prop
  const [refresh, setRefresh] = useState(false)
  function refreshFromAppJS() {
    setRefresh(!refresh)
  }

  async function loadServer() {
    if (!serverLoaded) {
      if (Platform.OS === 'web') {
        await getUsersWeb();
        await getShiftsWeb();
      } else {
        await getUsers();
        await getShifts();
      }
      console.log('data loaded ')
      setServerLoaded(true);
    }
  }

  // waits for fonts to be loaded before fetching data from server
  if (fontsLoaded) {
    loadServer()
  }

  // defines how home screen will look when logged in as admin
  let adminHome =
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-sharp'
          } else if (route.name === 'Manage Employees') {
            iconName = 'people-sharp';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#cf82ac',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'CourierPrime',
        },
        tabBarStyle: {
          height: '7%',
          paddingBottom: 8,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" children={() => <HomeScreen refreshFromAppJS={refreshFromAppJS} />} />
      <Tab.Screen name="Manage Employees" component={ManageEmployeesScreen} />
    </Tab.Navigator>


  // returns correct jsx element for rendering based current state of the app
  function renderMain() {
    if (!serverLoaded) {
      return <LoadingScreen />
    } else if (getIsAdmin() && !(Platform.OS === 'web')) {
      return adminHome
    } else {
      return <HomeScreen refreshFromAppJS={refreshFromAppJS} />
    }
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {renderMain()}
      </SafeAreaView>
      <StatusBar style='dark' />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS == 'android' ? 45 : 10
  }
});
