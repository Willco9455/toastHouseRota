import { Button, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, View, RefreshControl } from "react-native";

import * as dateHelper from "../util/dateHelper";
import { useCallback, useState } from "react";
import Globals from "../util/Globals";
import StyledButton from "../components/StyledButton";
import WeekView from "../components/WeekView";
import WeekNavigation from "../components/WeekNavigation";



function HomeScreen() {
	const [editing, setEditing] = useState(false);
	const [admin, setAdmin] = useState(Globals.isAdmin)
	
	function editButtonHandler() {
		setEditing(!editing)
	}

	function loginHandler() {
		Globals.isAdmin = !admin
		setAdmin(!admin)
	}

	return (
		<SafeAreaView style={styles.screenContainer}>
			<View style={styles.headerContainer}>
				<StyledButton onPress={loginHandler}>Login</StyledButton>
				<Image style={styles.logo} source={require('../assets/images/toastHouseLogo.png')} />
				<StyledButton disabled={!admin} onPress={editButtonHandler}>{editing ? 'Done' : 'Edit'}</StyledButton>
			</View>
			<WeekNavigation editing={editing}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
	headerContainer: {
		// backgroundColor: 'red',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: Platform.OS === 'ios' ? 10 : 60,
		marginBottom: 20,
	},
	logo: {
		resizeMode: 'contain',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		height: 40,
	},
});

export default HomeScreen;