import { Pressable, StyleSheet, Text, View } from "react-native";

export function TimeSelectButton({ children, highlighted, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={highlighted ? [styles.buttonContainer, { borderColor: '#1768ff', borderWidth: 4 }] : styles.buttonContainer}>
        <View>
          <Text style={styles.textStyle}>{children}</Text>
        </View>
      </View >
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginHorizontal: 10,
    backgroundColor: 'white'
  },
  textStyle: {
    fontFamily: 'CourierPrime',
    fontSize: 18
  }
});