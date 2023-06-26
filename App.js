import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { getShifts, getUsers } from './util/dbHandler';
import { useState } from 'react';


export default function App() {
  async function loadServer() {
    if (!serverLoaded) {
      await getUsers();
      await getShifts();
      setServerLoaded(true);
      console.log('data loaded')
    }
  }

  const [serverLoaded, setServerLoaded] = useState(false)
  loadServer()

  return (
    <>
      <SafeAreaView style={styles.container}>
        { serverLoaded ? <HomeScreen /> : null}
      </SafeAreaView>
      <StatusBar style="dark" />
    </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
  }
});
