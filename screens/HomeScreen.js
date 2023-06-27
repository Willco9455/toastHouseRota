import { Button, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, View, RefreshControl } from "react-native";
import DayCard from "../components/DayCard";
import * as dateHelper from "../util/dateHelper";
import { useCallback, useState } from "react";
import AddPersonModal from "../components/AddPersonModal";
import Globals from "../util/Globals";
import { ClearLocalDb, getShifts, getUsers } from "../util/dbHandler";

const monday = dateHelper.getMonday();
let week = dateHelper.getWeekFrom(monday);

function HomeScreen() {
	const [editing, setEditing] = useState(false);
	const [admin, setAdmin] = useState(Globals.isAdmin)
	const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
		ClearLocalDb();
		await getUsers();
    await getShifts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
		setRefreshing(false)
		console.log('data Loaded')
  }

	function editButtonHandler() {
		setEditing(!editing)
	}

	function loginHandler() {
		Globals.isAdmin = !admin
		setAdmin(!admin)
	}

	return (
		<SafeAreaView style={styles.screenContainer}>
			<View style={styles.logoContainer}>
				<Button onPress={loginHandler} title="Login"/>
				<Image style={styles.logo} source={require('../assets/images/toastHouseLogo.png')} />
				<Button disabled={!admin} onPress={editButtonHandler} title={editing ? 'Done' : 'Edit'}/>
			</View>
			<FlatList
				data={week}
				renderItem={day => {
					return <DayCard editing={editing} date={day} />
				}}
				refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
	logoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingTop: Platform.OS === 'ios' ? 10 : 60,
		marginBottom: 20,
	},
	logo: {
		resizeMode: 'contain',
		width: '50%',
		height: 40,
	},
});

export default HomeScreen;