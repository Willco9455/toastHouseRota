import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Pressable, FlatList } from "react-native";
import { getPeopleFromDate, getUserById } from "../util/dbHandler";
import PersonCard from "./PersonCard";
import SmallButton from "./SmallButton";
import AddPersonButton from "./AddPersonButton";
import AddPersonModal from "./AddPersonModal";

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export default function DayCard({ date, editing }) {
	const [reload, setReload] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [am, setAm] = useState();

	// gets all people working on the da of the card 
	let people = getPeopleFromDate(date.item);
	let amPeople = people.filter(x => { return x.am });
	let pmPeople = people.filter(x => { return !x.am })

	let addButtons = <View style={styles.addButtonsContainer}>
			<AddPersonButton onPress={() => addEmployeeHandler(true)} />
			<AddPersonButton onPress={() => addEmployeeHandler(false)} />
		</View>

	function reloadDay() {
		setReload(!reload);
	}

	function addEmployeeHandler(am) {
		if (am) {
			setAm(true);
		} else {
			setAm(false);
		}
		showModalHandler();
	}

	function showModalHandler() {
		setShowModal(true);
	}

	function hideModalHandler() {
		setShowModal(false);
	}

	return (
		<View style={styles.outerContainer}>
			<View style={styles.innerContainer}>
				<View style={styles.dateContainer}>
					<Text style={styles.dayText} >{weekday[date.item.getUTCDay()]}</Text>
					<Text style={styles.dateText} >{date.item.getDate()}</Text>
				</View>
				<View style={styles.outerPeopleContainer}>
					<View style={styles.amPeopleContainer}>
						<FlatList
							data={amPeople}
							renderItem={({ item }) => <PersonCard relaodDay={reloadDay} recordId={item.id} editing={editing} personData={getUserById(item.userId)} />}
							keyExtractor={item => item.id}
						/>
					</View>
					<View style={styles.pmPeopleContainer}>
						<FlatList
							data={pmPeople}
							renderItem={({ item }) => <PersonCard relaodDay={reloadDay} recordId={item.id} editing={editing} personData={getUserById(item.userId)} />}
							keyExtractor={item => item.id}
						/>
					</View>
				</View>
				{editing ? addButtons : null}
			</View>
			<AddPersonModal reloadDay={reloadDay} am={am} date={date} onCancel={hideModalHandler} visible={showModal}/>
		</View>
	);
}

const styles = StyleSheet.create({
	outerContainer: {
		flexDirection: 'column'
	},
	innerContainer: {
		minHeight: 100,
		borderTopWidth: 2,
		borderColor: 'black',
		padding: 5,
		backgroundColor: 'white',
		elevation: 10,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 1,
		shadowOpacity: 0.20,
	},
	outerPeopleContainer: {
		flexDirection: 'row',
		marginTop: 10
	},
	amPeopleContainer: {
		flex: 1,
		alignItems: 'center'
	},
	pmPeopleContainer: {
		flex: 1
	},
	dateContainer: {
		flexDirection: 'row',
	},
	dayText: {
		fontSize: 18,
		marginHorizontal: 2,
		color: 'grey',
	},
	dateText: {
		fontSize: 18,
		marginHorizontal: 10,
		color: 'grey',
	},
	addButtonsContainer: {
		flexDirection: 'row'
	},
	buttonContainer: {
		flex: 1
	}
})