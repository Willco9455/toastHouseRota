import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { deleteRecordById, getUserColorById } from "../util/dbHandler";

export default function PersonCard({ relaodDay, personData, editing, recordId, onPress }) { //personData is the userObject(id, name, color)
  let color = getUserColorById(personData.id)

  return (
    <Pressable onPress={onPress}
      style={editing ?
        [styles.container, { backgroundColor: color, opacity: 0.6 }] :
        [styles.container, { backgroundColor: color }]
      }>
      <Text style={styles.text}>{personData.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'CourierPrime'
  },
  container: {
    flexDirection: "row",
    backgroundColor: 'red',
    paddingVertical: 6,
    marginVertical: 5,
    minWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 1,
		shadowOpacity: 0.20,
  },

})