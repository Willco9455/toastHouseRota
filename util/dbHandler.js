import firestore from '@react-native-firebase/firestore';

let users = []
let db = []

export function ClearLocalDb() {
  users = [];
  db = [];
}

// fetches all the users from the database
export async function getUsers() {
  // return
  let tempUsers = [];
  await firestore().collection('users').get().then(querySnapshot => {
    querySnapshot.forEach(x => tempUsers.push({
      id: x.data().id,
      name: x.data().name,
      color: x.data().color
    }));
  }).catch(error => {
    console.log(error)
  })
  users = [...tempUsers];
}

export async function getShifts() {
  // return
  let tempDb = [];
  await firestore().collection('shifts').get().then(querySnapshot => {
    querySnapshot.forEach(x => tempDb.push({
      id: x.id,
      date: x.data().date.toDate(),
      timeSelected: x.data().timeSelected,
      startTime: x.data().startTime.toDate(),
      endTime: x.data().endTime.toDate(),
      userId: x.data().userId,
    }));
  }).catch(error => {
    console.log("Server Error")
  })
  db = [...tempDb]
  db.sort(compare);
}


function datesEqual(d1, d2) {
  if ((d1.getFullYear() === d2.getFullYear()) &&
    (d1.getMonth() === d2.getMonth()) &&
    (d1.getDate() === d2.getDate())) {
    return true;
  } else {
    return false;
  }
}

export function getPeopleFromDate(d) {
  let newResults = db.filter(x => {
    return datesEqual(x.date, d);
  })
  return newResults
}


export function getUserColorById(id) {
  return users.find(x => x.id === id).color
}

export function getEmployees() {
  return users;
}

export function getUserById(id) {
  return users.find(x => x.id === id)
}

export async function addUserToDay(userId, date, timeSelected, starTime, endTime,) {
  await firestore()
    .collection('shifts')
    .add({
      userId: userId,
      date: date,
      timeSelected: timeSelected,
      startTime: starTime,
      endTime: endTime
    }).then((docRef) => {
      db.push({
        id: docRef.id,
        userId: userId,
        date: date,
        timeSelected: timeSelected,
        startTime: starTime,
        endTime: endTime
      })
    });
  console.log('User added!');
}

export async function deleteRecordById(id) {
  await firestore()
    .collection('shifts')
    .doc(id)
    .delete()
    .catch((e) => {
      console.log("ERROR HERE")
      console.log(e)
    })
    .then(() => {
      db = db.filter(x => {
        return !(x.id === id)
      });
    });
}

export function sortShifts() {
  db.sort(compare)
}

// used to sort the shifts in oreer of shift length
function compare(a, b) {
  aLength = a.endTime.getHours() - a.startTime.getHours()
  bLength = b.endTime.getHours() - b.startTime.getHours()
  if (aLength < bLength) {
    return 1;
  }
  if (aLength > bLength) {
    return -1;
  }
  return 0;
}

