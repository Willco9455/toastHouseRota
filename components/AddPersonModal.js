import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal, Image, Text, FlatList, Pressable, ToastAndroid } from "react-native";
import { addUserToDay, getEmployees, writeShift } from "../util/dbHandler";
import PersonCard from "./PersonCard";
let employees = []


export default function AddPersonModal(props) {
	const [initialLoad, setInitialLoad] = useState(true)
	if (initialLoad) { employees = getEmployees(); setInitialLoad(false) }


	async function userPressedHandler(id) {
		props.onUserPressed(id)
		props.onCancel()
	}

	return (
		<Modal transparent={true} visible={props.visible} animationType="fade">
			<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
				<View style={styles.container} >
						<FlatList
							data={employees}
							renderItem={({ item }) => (
								<View style={{ flex: 1}}>
									<PersonCard onPress={() => userPressedHandler(item.id)} editing={false} personData={item} />
								</View>
							)}
							keyExtractor={item => item.id}
						/>
					<View style={styles.cancelButton}>
						<Button onPress={props.onCancel} title="Done" />
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: 'white',
		borderRadius: 30,
		marginHorizontal: 20,
		paddingBottom: 20,
		maxHeight: '70%',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		width: '90%'
	},
	button: {
		padding: 10,
		margin: 500,
	},
	image: {
		width: 100,
		height: 100,
		margin: 20
	},
	cancelButton: {
		marginTop: 10
	}
})
