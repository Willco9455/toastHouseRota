import { StyleSheet, Pressable, Text, View } from "react-native"

export default function StyledButton({children, onPress, disabled}) {

	return (
		<View>
			<Pressable disabled={disabled} style={(pressData) => pressData.pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
				onPress={onPress}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonInnerContainer: {
		borderRadius: 20,
		paddingVertical: 5,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	buttonText: {
		color: 'black',
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'CourierPrimeBold'
	},
	pressed: {
		opacity: 0.5
	}
});
