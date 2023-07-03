import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Pressable, FlatList, Platform } from "react-native";
import { addUserToDay, deleteRecordById, getPeopleFromDate, getUserById } from "../util/dbHandler";
import PersonCard from "./PersonCard";
import AddPersonButton from "./buttons/AddPersonButton";


const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

export default function DayCard({ date, editing, showCreateShift, setDateEditing }) {
	const [reload, setReload] = useState(false);


	// gets all people working on the da of the card 
	let people = getPeopleFromDate(date.item);

	let addButtons = <View style={styles.addButtonsContainer}>
		<AddPersonButton onPress={() => addEmployeeHandler()} />
	</View>

	function reloadDay() {
		setReload(!reload);
	}

	function addEmployeeHandler() {
		setDateEditing(date.item);
		showCreateShift();
	}

	async function onDayPressHandler(recordId) {
		if (editing) {
			await deleteRecordById(recordId);
			reloadDay();
		}
	}

	function calcStartFlex(startTime) {
		let flex = startTime.getHours() - 8;
		return flex
	}

	function calcShiftFlex(startTime, endTime) {
		let flex = endTime.getHours() - startTime.getHours()
		return flex
	}

	function calcEndFlex(endTime) {
		let flex = 17 - endTime.getHours();
		return flex
	}

	return (
		<View style={styles.outerContainer}>
			<View style={styles.innerContainer}>
				<View style={styles.dateContainer}>
					<Text style={styles.dayText} >{weekday[date.item.getDay()]}</Text>
					<Text style={styles.dateText} >{date.item.getDate()}</Text>
					<Text style={styles.dateText} >{monthNames[date.item.getMonth()]}</Text>
				</View>
				<View style={styles.outerPeopleContainer}>
					<FlatList
						data={people}
						renderItem={({ item }) => (
							<View style={{ flex: 1, flexDirection: 'row' }}>
								<View style={{ flex: calcStartFlex(item.startTime) }}></View>
								<View style={{ flex: calcShiftFlex(item.startTime, item.endTime) }}>
									<PersonCard
										onPress={() => onDayPressHandler(item.id)}
										relaodDay={reloadDay}
										shiftData={item}
										personData={getUserById(item.userId)}
										editing={editing}
									/>
								</View>
								<View style={{ flex: calcEndFlex(item.endTime) }}></View>
							</View>
						)}
						keyExtractor={item => item.id}
					/>
				</View>
				{editing ? addButtons : null}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
	},
	innerContainer: {
		flex: 1,
		minHeight: 100,
		borderTopWidth: 2,
		borderColor: 'black',
		padding: 5,
		elevation: 10,
		borderRightWidth: Platform.OS =='web' ? 2 : 0,
	},
	outerPeopleContainer: {
		marginTop: 10,
	},
	amPeopleContainer: {
		flex: 1,
		alignItems: 'center'
	},
	pmPeopleContainer: {
		flex: 1,
		alignItems: 'center'
	},
	dateContainer: {
		flexDirection: 'row',
	},
	dayText: {
		fontSize: Platform.OS =='web' ? 14 : 18,
		marginLeft: 2,
		color: 'grey',
		fontFamily: 'CourierPrime'
	},
	dateText: {
		fontSize: Platform.OS =='web' ? 14 : 18,
		marginLeft: 10,
		color: 'grey',
		fontFamily: 'CourierPrime'
	},
	addButtonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1
	}
})