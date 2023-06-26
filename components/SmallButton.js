import { StyleSheet, Pressable, Text, View } from "react-native"

export default function SmallButton({children, onPress}) {

	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable style={(pressData) => pressData.pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
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
		overflow: 'hidden'
	},
	buttonInnerContainer: {
		paddingHorizontal: 16,
		elevation: 2,
	},
	buttonText: {
		color: 'blue',
		textAlign: 'center',
		fontSize: 17
	},
	pressed: {
		opacity: 0.5
	}
});
