import { useState } from "react";
import { Button, Image, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import MonthView from "../components/MonthView";
import { Dimensions } from 'react-native';
import { ManageEmployeesScreen } from "./MangeEmployeesScreen";

const windowWidth = Dimensions.get('window').width;
// for getting a new password hash
// console.log(hashCode('Admin'))


export function LaptopScreen(props) {
	const [editing, setEditing] = useState(false)
	const [screen, setScreen] = useState('monthView')


	const renderScreen = () => {
		if (screen === 'monthView') {
			return <MonthView
				setScreen={setScreen}
				admin={props.admin}
				setAdmin={props.setAdmin}
				setEditing={setEditing}
				editing={editing}
			/>
		} else if (screen === 'employeeManage') {
			return (
				<View style={{ flexDirection: 'row' }}>
					<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
						<Button onPress={() => setScreen('monthView')} title='Back' />
					</View>
					<View style={{ flex: 1 }}>
						<ManageEmployeesScreen />
					</View>
					<View style={{ flex: 1 }}></View>
				</View>
			)
		}
	}

	return (
		<SafeAreaView style={styles.screenContainer}>
			{renderScreen()}
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
