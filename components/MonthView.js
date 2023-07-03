import DayCard from "../components/DayCard";
import { useEffect, useState } from "react";
import { getShifts, getShiftsWeb, getUsers, getUsersWeb } from "../util/dbHandler";
import { RefreshControl, View, FlatList, Platform, ScrollView, Button, StyleSheet } from "react-native";
import { addDays, addMonthsToDate, getMonday, getMondaysFromDate, getWeekFrom } from "../util/dateHelper";
import { CreateShiftModal } from "./modals/CreateShiftModal";

const today = new Date();
let date = today

function getWeeks(date) {
  let monday = getMonday(date)
  let tempWeeks = [
    getWeekFrom(monday),
    getWeekFrom(addDays(monday, 7)),
    getWeekFrom(addDays(monday, 14)),
    getWeekFrom(addDays(monday, 21)),
  ]
  tempWeeks = tempWeeks.flat(1);
  return tempWeeks
}

export default function MonthView({ editing }) {
  const [showModal, setShowModal] = useState(false);
  const [dateEditing, setDateEditing] = useState(null);
  const [reload, setReload] = useState(false);
  const [weeks, setWeeks] = useState(getWeeks(today))

  function onShowCreateShift() {
    setShowModal(true)
  }

  function hideCreateShift() {
    setShowModal(false)
  }

  function lastMonthHandler() {
    date = addDays(date, -28)
    setWeeks(getWeeks(date))
  }

  function nextMonthHandler() {
    date = addDays(date, 28)
    setWeeks(getWeeks(date))
  }

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
        <View style={styles.buttonContainer}>
          <Button onPress={lastMonthHandler} title={'<'} />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={nextMonthHandler} title={'>'} />
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <FlatList
            numColumns={5}
            horizontal={false}
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: "stretch" }}
            data={weeks}
            keyExtractor={(item, index) => index}
            renderItem={day => {
              return (
                <View style={{ flex: 1, alignItems: 'stretch', flexDirection: 'column' }}>
                  <DayCard setDateEditing={setDateEditing} showCreateShift={onShowCreateShift} editing={editing} date={day} />
                </View>
              )
            }}
          />
        </View >
      </ScrollView >

      <CreateShiftModal outerReload={() => setReload(!reload)} date={dateEditing} visible={showModal} onCancel={hideCreateShift} />
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    zIndex: 1,
    
    // position: 'absolute',
  }
}) 