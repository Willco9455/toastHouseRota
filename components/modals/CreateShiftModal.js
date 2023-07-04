import { createElement, useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, View, ToastAndroid, Platform } from "react-native";

import { TimeSelectButton } from "../buttons/TimeSelectButton";
import { addUserToDay, getUserById, sortShifts } from "../../util/dbHandler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AddPersonModal from "./AddPersonModal";
import { get24Hour } from "../../util/dateHelper";


let startTime = new Date();
startTime.setHours(9, 0, 0, 0);
let endTime = new Date();
endTime.setHours(17, 0, 0, 0)


function DateTimePicker({ value, onChange }) {

  return createElement('input', {
    type: 'time',
    value: value,
    onInput: onChange,
  })
}

export function CreateShiftModal({ onCancel, visible, date, outerReload }) {
  const [timeSelected, setTimeSelected] = useState('am');
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startTimeSelecting, setStartTimeSelecting] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  async function addPressHandler() {
    if (timeSelected === 'am') {
      startTime = new Date(date)
      startTime.setHours(8, 0)
      endTime = new Date(date)
      endTime.setHours(13, 0)
    } else if (timeSelected === 'pm') {
      startTime = new Date(date)
      startTime.setHours(12, 0)
      endTime = new Date(date)
      endTime.setHours(17, 0)
    } else if (timeSelected === 'fullDay') {
      startTime = new Date(date)
      startTime.setHours(8, 0)
      endTime = new Date(date)
      endTime.setHours(17, 0)
    }
    await addUserToDay(selectedUser.id, date, timeSelected, startTime, endTime)
    sortShifts();
    outerReload();
    ToastAndroid.show('Shift Added!', ToastAndroid.SHORT);
  }

  function webStartTimeChange(changed) {
    startTime = new Date('01-01-1970 ' + changed.target.value)
  }
  function webEndTimeChange(changed) {
    endTime = new Date('01-01-1970 ' + changed.target.value)
  }

  function amSelect() {
    setTimeSelected('am')
  }

  function pmSelect() {
    setTimeSelected('pm')
  }

  function fullDaySelect() {
    setTimeSelected('fullDay')
  }

  function customSelect() {
    setTimeSelected('custom')
  }

  function selectEmployeeHandler() {
    setAddUserModalVisible(true);
  }

  const selectStartTime = () => {
    setStartTimeSelecting(true)
    showTimePicker();
  }

  const selectEndTime = () => {
    setStartTimeSelecting(false);
    showTimePicker();
  }

  const showTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (startTimeSelecting) {
      startTime = date;
    } else {
      endTime = date;
    }
    hideTimePicker();
  };

  function onPersonSelected(id) {
    setSelectedUser(getUserById(id))
  }

  let customTimeSelector = null;
  if (Platform.OS === 'web') {
    customTimeSelector = <View style={styles.timePickerContainer}>
      <DateTimePicker onChange={webStartTimeChange} />
      <Text> - </Text>
      <DateTimePicker onChange={webEndTimeChange} />
    </View>
  } else {
    customTimeSelector = <View style={styles.timePickerContainer}>
      <Pressable onPress={selectStartTime}>
        <Text style={styles.timeText}>{ get24Hour(startTime)} - </Text>
      </Pressable>
      <Pressable onPress={selectEndTime}>
        <Text style={styles.timeText}>{get24Hour(endTime)}</Text>
      </Pressable>
    </View>
  }


  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create Shift</Text>
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.userSelectContainer}>
              <TimeSelectButton
                backgroundColor={selectedUser ? selectedUser.color : 'white'}
                onPress={selectEmployeeHandler}>{selectedUser ? selectedUser.name : 'Select User'}
              </TimeSelectButton>
            </View>
            {/* <ScrollView horizontal={true}> */}
            <View style={styles.timeSelectContainer}>
              <TimeSelectButton onPress={amSelect} highlighted={(timeSelected === 'am')}>AM</TimeSelectButton>
              <TimeSelectButton onPress={pmSelect} highlighted={(timeSelected === 'pm')}>PM</TimeSelectButton>
              <TimeSelectButton onPress={fullDaySelect} highlighted={(timeSelected === 'fullDay')}>Full Day</TimeSelectButton>
            </View>
            {/* </ScrollView> */}
            <View style={styles.customTimeSelcector}>
              <TimeSelectButton onPress={customSelect} highlighted={(timeSelected === 'custom')}>Custom</TimeSelectButton>
              {(timeSelected === 'custom') ? customTimeSelector : null}
            </View>
            <View style={styles.buttonsContainer}>
              <View style={{ flex: 2 }}></View>
              <View style={{ flex: 3 }}><Button onPress={onCancel} color={'red'} title="Close" /></View>
              <View style={{ flex: 2 }}></View>
              <View style={{ flex: 3 }}><Button onPress={addPressHandler} title="Add" /></View>
              <View style={{ flex: 2 }}></View>
            </View>
          </View>
        </View>
      </View>

      <AddPersonModal
        onUserPressed={onPersonSelected}
        onCancel={() => { setAddUserModalVisible(false) }}
        visible={addUserModalVisible}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={startTimeSelecting ? startTime : endTime}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </Modal >
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    maxWidth: Platform.OS === 'web' ? 350 : null,
    backgroundColor: 'white',
    borderRadius: 40,
    paddingTop: 10,
    paddingBottom: 20,
    overflow: 'visible',
    flexShrink: 1
  },
  title: {
    fontSize: 25,
    marginTop: 15,
    fontFamily: 'CourierPrimeBold',
    textAlign: 'center',
  },
  timeSelectContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  customTimeSelcector: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userSelectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  timeText: {
    fontSize: 22,
    fontFamily: 'CourierPrimeBold'
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  }
});