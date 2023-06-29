import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { ClearLocalDb, getShifts, getUsers } from './util/dbHandler';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { LoadingScreen } from './screens/LoadingScreen';


export default function App() {
  async function loadServer() {
    if (!serverLoaded) {
      await getUsers();
      await getShifts();
      console.log('data loaded ')
      setServerLoaded(true);
    }
  }

  const [fontsLoaded] = useFonts({
    'CourierPrime': require('./assets/fonts/CourierPrime-Regular.ttf'),
    'CourierPrimeBold': require('./assets/fonts/CourierPrime-Bold.ttf')
  });

  const [serverLoaded, setServerLoaded] = useState(false)

  if (fontsLoaded) {
    loadServer()
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        {serverLoaded ? <HomeScreen /> : <LoadingScreen />}
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
