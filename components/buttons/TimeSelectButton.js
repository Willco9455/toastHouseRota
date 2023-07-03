import { useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export function TimeSelectButton({ children, highlighted, onPress, backgroundColor }) {
  const [scaleValue] = useState( new Animated.Value(1));

  const startAnimate = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 80,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }).start()
    })
  }

  function buttonPressHandler() {
    startAnimate();
    onPress();
  }

  return (
    <Pressable onPress={buttonPressHandler}>
      <Animated.View style={highlighted ? [styles.buttonContainer, { backgroundColor: backgroundColor ,borderColor: '#1768ff', transform: [{scale: scaleValue}]}] : [styles.buttonContainer, {backgroundColor: backgroundColor}]}>
        <View>
          <Text style={styles.textStyle}>{children}</Text>
        </View>
      </Animated.View >
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // marginHorizontal: 10,
    backgroundColor: 'white'
  },
  textStyle: {
    fontFamily: 'CourierPrime',
    fontSize: 18
  }
});