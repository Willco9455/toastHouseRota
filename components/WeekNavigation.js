import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import WeekView from './WeekView';
import { addDays, getMonday } from '../util/dateHelper';

const monday = getMonday();
let maxWeek = addDays(monday, 14);
let oldIndex = 4;

let routes = [
  { key: addDays(monday, -28), title: 'start' },
  { key: addDays(monday, -21), title: 'start' },
  { key: addDays(monday, -14), title: 'start' },
  { key: addDays(monday, -7), title: 'start' },
  { key: monday, title: 'current' },
  { key: addDays(monday, 7), title: 'end'},
  { key: addDays(monday, 14), title: 'endFurther' },
]

export default function WeekNavigation({ editing }) {

  const renderScene = ({ route }) => {
    return <WeekView key={route.key} editing={editing} monday={route.key} />
  }

  const layout = useWindowDimensions();

  async function swipeHandler() {
    console.log(index, routes.length)
    if (index >= (routes.length - 3)) {
      maxWeek = addDays(maxWeek, 7)
      routes.push({ key: maxWeek, title: 'extraEnd' })
    }
    oldIndex = index;
  }
  const [index, setIndex] = React.useState(4);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(newIndex) => { 
        setIndex(newIndex);
      }}
      onSwipeEnd={swipeHandler}
      initialLayout={{ width: layout.width }}
      renderTabBar={() => null}
      lazy={true}
    />
  );
}