import DayCard from "../components/DayCard";
import { useState } from "react";
import { ClearLocalDb, getShifts, getUsers } from "../util/dbHandler";
import { RefreshControl, View, FlatList } from "react-native";
import { getWeekFrom } from "../util/dateHelper";



export default function WeekView({monday, editing}) {
  let week = getWeekFrom(monday);
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
		ClearLocalDb();
		await getUsers();
    await getShifts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
		setRefreshing(false)
		console.log('data Loaded')
  }

  return (
    <View>
      <FlatList
        data={week}
        renderItem={day => {
          return <DayCard editing={editing} date={day} />
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}