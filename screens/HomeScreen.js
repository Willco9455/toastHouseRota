import { Button, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import DayCard from "../components/DayCard";
import * as dateHelper from "../util/dateHelper";
import { useState } from "react";
import AddPersonModal from "../components/AddPersonModal";

const monday = dateHelper.getMonday();
let week = dateHelper.getWeekFrom(monday);

function HomeScreen() {
	const [editing, setEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);

	function editButtonHandler() {
		setEditing(!editing)
	}


	return (
		<SafeAreaView style={styles.screenContainer}>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={require('../assets/images/toastHouseLogo.png')} />
				<Button onPress={editButtonHandler} title={editing ? 'Done' : 'Edit'}/>
			</View>
			<FlatList
				data={week}
				renderItem={day => {
					return <DayCard editing={editing} date={day} />
				}}
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
		justifyContent: 'center',
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