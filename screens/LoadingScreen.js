import { ActivityIndicator, StyleSheet, View } from "react-native";

export function LoadingScreen() { // Displays basic loading screen
  return(
    <View style={styles.container}>
      <ActivityIndicator size="large"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});