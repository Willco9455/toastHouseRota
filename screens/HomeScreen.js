import { useState } from "react";
import { Image, Platform, SafeAreaView, StyleSheet, View } from "react-native";

import { getIsAdmin, loadAdmin, revokeAdmin } from "../util/Security";
import StyledButton from "../components//buttons/StyledButton";
import WeekNavigation from "../components/WeekNavigation";
import LoginModal from "../components/modals/LoginModal";

// 
loadAdmin();

// for getting a new password hash
// console.log(hashCode('Admin'))

function HomeScreen({ refreshFromAppJS }) {
	const [editing, setEditing] = useState(false);
	const [admin, setAdmin] = useState(getIsAdmin())
	const [loginModalVisible, setLoginModalVisible] = useState(false);

	function editButtonPressHandler() {
		setEditing(!editing)
	}

	function openLoginHandler() {
		setLoginModalVisible(true);
	}

	function onLoginModalClose() {
		setLoginModalVisible(false);
		refreshFromAppJS()
	}

	async function logOutHandler() {
		await revokeAdmin();
		setAdmin(getIsAdmin())
		refreshFromAppJS()
	}

	const loginButton = <StyledButton onPress={openLoginHandler}>Login</StyledButton>
	const logOutButton = <StyledButton onPress={logOutHandler}>Logout</StyledButton>
	const editButton = <StyledButton disabled={!admin} onPress={editButtonPressHandler}>{editing ? 'Done' : 'Edit'}</StyledButton>

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