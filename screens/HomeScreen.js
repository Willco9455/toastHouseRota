import { Button, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, View, RefreshControl } from "react-native";

import { useCallback, useState } from "react";
import StyledButton from "../components/StyledButton";
import WeekNavigation from "../components/WeekNavigation";
import LoginModal from "../components/LoginModal";
import { getIsAdmin, hashCode, loadAdmin, revokeAdmin } from "../util/Security";

loadAdmin();

// for getting a new password hash
// console.log(hashCode('Admin'))

function HomeScreen() {
	const [editing, setEditing] = useState(false);
	const [admin, setAdmin] = useState(getIsAdmin())
	const [loginModalVisible, setLoginModalVisible] = useState(false);

	function editButtonHandler() {
		setEditing(!editing)
	}

	function loginHandler() {
		setLoginModalVisible(true);
	}

	function onLoginModalClose() {
		setLoginModalVisible(false);
	}

	function logOutHandler() {
		revokeAdmin();
		setAdmin(getIsAdmin())
	}

	const loginButton = <StyledButton onPress={loginHandler}>Login</StyledButton>
	const logOutButton = <StyledButton onPress={logOutHandler}>Logout</StyledButton>
	const editButton = <StyledButton disabled={!admin} onPress={editButtonHandler}>{editing ? 'Done' : 'Edit'}</StyledButton>


	return (
		<SafeAreaView style={styles.screenContainer}>
			<View style={styles.headerContainer}>
				<View style={styles.headerButton}>
					{admin ? logOutButton : loginButton}
				</View>
				<Image style={styles.logo} source={require('../assets/images/toastHouseLogo.png')} />
				<View style={styles.headerButton}>
					{admin ? editButton : null}
				</View>
			</View>
			<WeekNavigation editing={editing} />
			<LoginModal setAdmin={setAdmin} onClose={onLoginModalClose} visible={loginModalVisible} />
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
		// width: '50%',
		height: 40,
		flex: 7
	},
	headerButton: {
		flex: 5,
		// backgroundColor: 'red'
	}
});

export default HomeScreen;