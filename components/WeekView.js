import DayCard from "../components/DayCard";
import { useEffect, useState } from "react";
import { ClearLocalDb, getShifts, getUsers } from "../util/dbHandler";
import { RefreshControl, View, FlatList } from "react-native";
import { getWeekFrom } from "../util/dateHelper";
import { CreateShiftModal } from "./modals/CreateShiftModal";

export default function WeekView({monday, editing}) {
  let week = getWeekFrom(monday);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dateEditing, setDateEditing] = useState(null);
  const [reload, setReload] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
		await getUsers();
    await getShifts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
		setRefreshing(false)
		console.log('data Loaded')
  }

  function onShowCreateShift() {
    setShowModal(true)
  }
  
  function hideCreateShift() {
    setShowModal(false)
  }


  return (
    <View style={{flex: 1}}>
      <FlatList
        data={week}
        renderItem={day => {
          return <DayCard setDateEditing={setDateEditing} showCreateShift={onShowCreateShift} editing={editing} date={day} />
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <CreateShiftModal outerReload={() => setReload(!reload)} date={dateEditing} visible={showModal} onCancel={hideCreateShift} />
    </View>
  );
}