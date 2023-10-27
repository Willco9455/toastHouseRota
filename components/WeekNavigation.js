import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import WeekView from './WeekView';
import { addDays, getMonday, getMondaysFromDate } from '../util/dateHelper';
import { useState } from 'react';
import AppHeader from './AppHeader';

const monday = getMonday(new Date());
let maxWeek = addDays(monday, 14);
let oldIndex = 4;

let routes = [
  { key: addDays(monday, -28), title: 'start' },
  { key: addDays(monday, -21), title: 'start' },
  { key: addDays(monday, -14), title: 'start' },
  { key: addDays(monday, -7), title: 'start' },
  { key: monday, title: 'current' },
  { key: addDays(monday, 7), title: 'end' },
  { key: addDays(monday, 14), title: 'endFurther' },
]


export default function WeekNavigation({ admin, setAdmin, setEditing, editing }) {
  const [index, setIndex] = useState(4);
  const layout = useWindowDimensions();
  
  const renderScene = ({ route }) => {
    return <WeekView key={route.key} editing={editing} monday={route.key} />
  }

  async function swipeHandler() {
    if (index >= (routes.length - 3)) {
      maxWeek = await addDays(maxWeek, 7)
      routes.push({ key: maxWeek, title: 'extraEnd' })
    }
    oldIndex = index;

  }

  return (
    <>
      <AppHeader admin={admin} setAdmin={setAdmin} setEditing={setEditing} editing={editing}/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(newIndex) => {
          setIndex(newIndex);
        }}
        onSwipeEnd={swipeHandler}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => null}
        lazy={false}
      />
    </>
  );
}