import { useState } from "react";
import { Image, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { getIsAdmin, loadAdmin, revokeAdmin } from "../util/Security";
import StyledButton from "../components//buttons/StyledButton";
import WeekNavigation from "../components/WeekNavigation";
import MonthView from "../components/MonthView";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
// for getting a new password hash
// console.log(hashCode('Admin'))


function HomeScreen(props) {
	const [editing, setEditing] = useState(false)
	return (
		<SafeAreaView style={styles.screenContainer}>
			<WeekNavigation admin={props.admin} setAdmin={props.setAdmin} setEditing={setEditing} editing={editing} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: Platform.OS === 'ios' ? 10 : 20,
		marginBottom: 20,
	},
	logo: {
		resizeMode: 'contain',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		flex: 7
	},
	headerButton: {
		flex: 5,
	}
});

export default HomeScreen;