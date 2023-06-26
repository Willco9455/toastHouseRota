import { StyleSheet, Text, View, Button } from "react-native";
import { deleteRecordById, getUserColorById } from "../util/dbHandler";
import SmallButton from "./SmallButton";

export default function PersonCard({ relaodDay, personData, editing, recordId }) { //personData is the userObject(id, name, color)
  let color = getUserColorById(personData.id)

  async function onDeleteHandler() {
    await deleteRecordById(recordId);
    relaodDay();
  }
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.text}>{personData.name}</Text>
      {editing ? <SmallButton onPress={onDeleteHandler}>X</SmallButton> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '400'
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
  },

})