import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { deleteRecordById, getUserColorById } from "../util/dbHandler";

export default function PersonCard({shiftData, personData, editing, onPress }) { //personData is the userObject(id, name, color)
  
  let color = getUserColorById(personData.id)
  
  function getSubText() {
    if (shiftData.timeSelected === 'am') {
      return 'AM'
    } else if (shiftData.timeSelected === 'pm') {
      return 'PM'
    } else if (shiftData.timeSelected === 'fullDay') {
      return 'Full Day'
    } else {
      return shiftData.startTime.toLocaleString('en-GB').slice(12, 17) + ' - ' + shiftData.endTime.toLocaleString('en-GB').slice(12, 17)
    }
  }

  return (
    <Pressable onPress={onPress}>
      <View style={editing ?
        [styles.container, { backgroundColor: color, opacity: 0.6 }] :
        [styles.container, { backgroundColor: color }]
      }>
        <Text style={styles.text}>{personData.name}</Text>
        { shiftData ? <Text style={styles.subText}>{getSubText()}</Text> : null }  
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontFamily: 'CourierPrime'
  },
  subText: {
    opacity: 0.8,
    fontSize: 12,
  },
  container: {
    flex: 1,
    paddingVertical: 7,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 0.20,
    overflow: 'hidden'
  },

})