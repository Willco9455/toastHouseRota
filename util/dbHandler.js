import firestore from '@react-native-firebase/firestore';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, doc, setDoc, deleteDoc, where, updateDoc } from "firebase/firestore";
import { Platform } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0vMo0tRJlQdda_-8taEeQaYv64GsQobA",
  authDomain: "toasthouserota-f486c.firebaseapp.com",
  projectId: "toasthouserota-f486c",
  storageBucket: "toasthouserota-f486c.appspot.com",
  messagingSenderId: "322229090960",
  appId: "1:322229090960:web:9df5a79c31d416828df615",
  measurementId: "G-2W65J5X95S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let users = []
let shifts = []

export function ClearLocalDb() {
  users = [];
  shifts = [];
}

export async function getAdminPasswordDb() {
  let password = null
  if (Platform.OS == 'web') {
    let querySnapshot = await getDocs(query(collection(db, "credentials")));
    querySnapshot.forEach(x => { password = x.data().password });
  } else {
    await firestore().collection('credentials').get().then(querySnapshot => {
      querySnapshot.forEach(x => { password = x.data().password });
    }).catch(error => {
      console.log("Server Error")
    })
  }
  return password;
}

// fetches all the users from the database
export async function getUsers() {
  let tempUsers = [];
  await firestore().collection('users').get().then(querySnapshot => {
    querySnapshot.forEach(x => tempUsers.push({
      id: x.id,
      name: x.data().name,
      color: x.data().color
    }));
  }).catch(error => {
    console.log(error)
  })
  users = [...tempUsers];
}

export async function getShifts() {
  let tempShifts = [];
  await firestore().collection('shifts').get().then(querySnapshot => {
    querySnapshot.forEach(x => tempShifts.push({
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
  shifts = [...tempShifts]
  shifts.sort(compare);
}

//fetches all the users from the database different firebase config for web
export async function getUsersWeb() {
  // return 
  let tempUsers = [];
  let querySnapshot = await getDocs(query(collection(db, "users")));
  querySnapshot.forEach(x => tempUsers.push({
    id: x.id,
    name: x.data().name,
    color: x.data().color
  }));
  users = [...tempUsers];
}

export async function getShiftsWeb() {
  // return 
  let tempShifts = [];
  let querySnapshot = await getDocs(query(collection(db, "shifts")));
  querySnapshot.forEach(x => tempShifts.push({
    id: x.id,
    date: x.data().date.toDate(),
    timeSelected: x.data().timeSelected,
    startTime: x.data().startTime.toDate(),
    endTime: x.data().endTime.toDate(),
    userId: x.data().userId,
  }));
  shifts = [...tempShifts]
  shifts.sort(compare);
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
  let newResults = shifts.filter(x => {
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
  if (Platform.OS === 'web') {
    const newId = doc(collection(db, "shifts"));
    await setDoc(newId, {
      userId: userId,
      date: date,
      timeSelected: timeSelected,
      startTime: starTime,
      endTime: endTime
    });
    shifts.push({
      id: newId.id,
      userId: userId,
      date: date,
      timeSelected: timeSelected,
      startTime: starTime,
      endTime: endTime
    })
  } else {
    await firestore()
      .collection('shifts')
      .add({
        userId: userId,
        date: date,
        timeSelected: timeSelected,
        startTime: starTime,
        endTime: endTime
      }).then((docRef) => {
        shifts.push({
          id: docRef.id,
          userId: userId,
          date: date,
          timeSelected: timeSelected,
          startTime: starTime,
          endTime: endTime
        })
      });
  }
  console.log('Shift added!');
}

export async function addUser(name, color) {
  if (Platform.OS === 'web') {
    const newId = doc(collection(db, "users"));
    await setDoc(newId, {
      name: name,
      color: color
    });
    users.push({
      id: newId.id,
      name: name,
      color: color
    })
  } else {
    await firestore()
      .collection('users')
      .add({
        name: name,
        color: color
      }).then((docRef) => {
        users.push({
          id: docRef.id,
          name: name,
          color: color
        })
      });
  }
  console.log('User added!');
}

export async function deleteRecordById(id) {
  if (Platform.OS === 'web') {
    await deleteDoc(doc(db, "shifts", id)).catch((e) => {
      console.log(e)
      return
    });
    shifts = shifts.filter(x => {
      return !(x.id === id)
    });
  } else {
    await firestore()
      .collection('shifts')
      .doc(id)
      .delete()
      .catch((e) => {
        console.log(e)
        return
      })
      .then(() => {
        shifts = shifts.filter(x => {
          return !(x.id === id)
        });
      });
  }
}

export async function deleteUserById(id) {
  if (Platform.OS === 'web') {
    await deleteDoc(doc(db, "users", id)).catch((e) => {
      console.log(e)
      return
    });
    users = users.filter(x => {
      return !(x.id === id)
    });
  } else {
    await firestore()
      .collection('users')
      .doc(id)
      .delete()
      .catch((e) => {
        console.log(e)
      })
      .then(() => {
        users = users.filter(x => {
          return !(x.id === id)
        });
      });
  }
  console.log('id ', id)

  // Delete all shifts from database that are for the given user ID 
  if (Platform.OS === 'web') {
    const usersRef = collection(db, "shifts");
    const q = query(usersRef, where('userId', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteRecordById(doc.ref.id)
    });
  } else {
    await firestore()
      .collection('shifts')
      .where('userId', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log('Data ', doc.data())
          doc.ref.delete();
        });
      })
      .catch((e) => {
        console.log('error')
        console.log(e)
      });
  }
  // remove shifts from loacal storage as well
  shifts = shifts.filter(x => {
    return !(x.userId === id)
  })
}

export async function updateUserColor(usrId, newColor) {
  if (Platform.OS === 'web') {
    let userRef = doc(db, 'users', usrId)
    await updateDoc(userRef, {
      color: newColor
    });

  } else {
    await firestore()
      .collection('users')
      .doc(usrId)
      .update({
        color: newColor,
      })
      .then(() => {
        objIndex = users.findIndex((obj => obj.id == usrId));
        users[objIndex].color = newColor;
        console.log('User Updated');
      });
  }
  let objIndex = users.findIndex((obj => obj.id == usrId));
  users[objIndex].color = newColor;
  console.log('User Updated');
}

export function sortShifts() {
  shifts.sort(compare)
}

// used to sort the shifts in oreer of shifts length
function compare(a, b) {
  let aLength = a.endTime.getHours() - a.startTime.getHours()
  let bLength = b.endTime.getHours() - b.startTime.getHours()
  if (aLength < bLength) {
    return 1;
  }
  if (aLength > bLength) {
    return -1;
  }
  return 0;
}

