import { StyleSheet, Pressable, Text, View } from "react-native"

export default function StyledButton({children, onPress, disabled}) {

	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable disabled={disabled} style={(pressData) => pressData.pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
				onPress={onPress}
			>
				{/* the children thing below is the text put inbetween the primaryButton tags */}
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonOuterContainer: {
		// overflow: 'hidden',
		// elevation: 5,
	},
	buttonInnerContainer: {
		borderRadius: 20,
		paddingVertical: 5,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	buttonText: {
		color: 'black',
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'CourierPrimeBold'
	},
	pressed: {
		opacity: 0.5
	}
});
