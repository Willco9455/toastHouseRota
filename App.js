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
import { getIsAdmin, loadAdmin } from './util/Security';
import HomeScreen from './screens/HomeScreen';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LaptopScreen } from './screens/LaptopScreen';


const windowWidth = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();

export default function App() {
  const [admin, setAdmin] = useState(getIsAdmin())
  const [serverLoaded, setServerLoaded] = useState(false)
  const [fontsLoaded] = useFonts({
    'CourierPrime': require('./assets/fonts/CourierPrime-Regular.ttf'),
    'CourierPrimeBold': require('./assets/fonts/CourierPrime-Bold.ttf')
  });

  // waits for fonts to be loaded and then loads the date from the server 
  async function loadServer() {
    if (fontsLoaded && !serverLoaded) {
      if (Platform.OS === 'web') {
        await getUsersWeb();
        await getShiftsWeb();
      } else {
        await getUsers();
        await getShifts();
      }
      await loadAdmin();
      setServerLoaded(true);
      setAdmin(getIsAdmin())
    }
  }

  loadServer();

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
        tabBarActiveTintColor: '#c13eed',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'CourierPrime',
        },
        tabBarStyle: {
          height: '8%',
          paddingBottom: 8,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" children={() => <HomeScreen admin={admin} setAdmin={setAdmin} />} />
      <Tab.Screen name="Manage Employees" component={ManageEmployeesScreen} />
    </Tab.Navigator>


  // returns correct jsx element for rendering based current state of the app
  function renderMain() {
    if (!serverLoaded) {
      return <LoadingScreen />
    } else if (admin && !(Platform.OS === 'web' && windowWidth > 700)) {
      return adminHome
    } else if (!admin  && !(Platform.OS === 'web' && windowWidth > 700)) { 
      console.log('in HERE?')
      return (
        <HomeScreen admin={admin} setAdmin={setAdmin} />
        )
    } else {
      return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Toast House Rota" children={() => <LaptopScreen admin={admin} setAdmin={setAdmin} />} />
      </Stack.Navigator>
      )
    }
  }
  const Stack = createStackNavigator();



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
