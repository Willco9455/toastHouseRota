import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal, Image, Text, FlatList, Pressable } from "react-native";
import { addUserToDay, getEmployees } from "../util/dbHandler";
import PersonCard from "./PersonCard";

let employees = getEmployees();

export default function AddPersonModal(props) {
	function addUserToDayHandler(id) {
		addUserToDay(id, props.date.item, props.am)
		props.reloadDay()
	}

	return (
		<Modal st transparent={true} visible={props.visible} animationType="fade">
			<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
				<View style={styles.container} >
					<FlatList
						data={employees}
						renderItem={({ item }) => <Pressable onPress={() => addUserToDayHandler(item.id)} >
							<PersonCard editing={false} personData={item} />
						</Pressable>}
						keyExtractor={item => item.id}
					/>
					<Button onPress={props.onCancel} title="Cancel" />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 16,
		backgroundColor: '#311b6b',
		borderRadius: 30,
		marginHorizontal: 20,
		paddingBottom: 40,
		maxHeight: '70%',
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#e4d0ff',
		width: '90%',
		marginRight: 8,
		marginVertical: 10,
		padding: 10,
		backgroundColor: '#e4d0ff',
		borderRadius: 6,
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
	}
})