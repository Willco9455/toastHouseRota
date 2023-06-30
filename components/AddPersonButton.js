import { View, Pressable, StyleSheet, Text } from "react-native";

export default function AddPersonButton({ onPress }) {

  return (
    <Pressable style={{flex: 1}} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.buttonText}>+</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    paddingVertical: 3,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: 'blue',
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'blue',
    fontSize: 17
  }
});