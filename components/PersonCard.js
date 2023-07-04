import { StyleSheet, Text, View, Button, Pressable, Platform } from "react-native";
import { deleteRecordById, getUserColorById } from "../util/dbHandler";
import {Dimensions} from 'react-native';
import { get24Hour } from "../util/dateHelper";

const mobileSize = (Dimensions.get('window').width < 700)

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
      return get24Hour(shiftData.startTime) + ' - ' + get24Hour(shiftData.endTime)
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
    fontSize: (Platform.OS =='web' && !mobileSize) ? 12 : 17,
    fontFamily: 'CourierPrime'
  },
  subText: {
    opacity: 0.8,
    fontSize: (Platform.OS =='web' && !mobileSize) ? 10 : 12,
  },
  container: {
    flex: 1,
    paddingVertical: 7,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: 'black',
		shadowOffset: { width: 1, height: 2 },
		shadowRadius: 1,
		shadowOpacity: 0.1,
  },

})