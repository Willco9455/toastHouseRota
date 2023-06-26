import { View, Button, Pressable, StyleSheet, Text } from "react-native";

export default function AddPersonButton({ onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View >
        <Text style={styles.buttonText}>+</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    paddingVertical: 6,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: 'blue',
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'blue'
  }
});