import firestore from '@react-native-firebase/firestore';

let users = []
let db = []

// fetches all the users from the database
export async function getUsers() {
  // return
  await firestore().collection('users').get().then(querySnapshot => {
    querySnapshot.forEach(x => users.push({
      id: x.data().id,
      name: x.data().name,
      color: x.data().color
    }));
  }).catch(error => {
    console.log(error)
  })
}

export async function getShifts() {
  // return 
  await firestore().collection('shifts').get().then(querySnapshot => {
    querySnapshot.forEach(x => db.push({
      id: x.id,
      date: x.data().date.toDate(),
      userId: x.data().userId,
      am: x.data().am
    }));
  }).catch(error => {
    console.log(error)
  })
}

// let users = [
//   {
//     color: "orange",
//     id: 1,
//     name: "Spaz"
//   },
//   {
//     color: "grey",
//     id: 2,
//     name: "Lisa"
//   },
//   {
//     color: "yellow",
//     id: 3,
//     name: "Pivy"
//   },
//   {
//     color: "pink",
//     id: 4,
//     name: "Natasha"
//   }]

// let db = [
//   {
//     id: 1,
//     date: new Date(2023, 5, 26),
//     userId: 4,
//     am: true
//   },
//   {
//     id: 2,
//     date: new Date(2023, 5, 27),
//     userId: 3,
//     am: true
//   },
//   {
//     id: 3,
//     date: new Date(2023, 5, 26),
//     userId: 1,
//     am: true
//   },
//   {
//     id: 4,
//     date: new Date(2023, 5, 26),
//     userId: 2,
//     am: false
//   },
//   {
//     id: 5,
//     date: new Date(2023, 5, 26),
//     userId: 1,
//     am: true
//   }
// ];

export async function writeShift(am, date, userId) {
  await firestore()
    .collection('shifts')
    .add({
      am: am,
      date: date,
      userId: userId,
    })
    .then(() => {
      console.log('User added!');
    });
}


function datesEqual(d1, d2) {
  if ((d1.getFullYear() == d2.getFullYear()) &&
    (d1.getMonth() == d2.getMonth()) &&
    (d1.getDay() == d2.getDay())) {
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

export async function deleteRecordById(id) {
  await firestore()
    .collection('shifts')
    .doc(id)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
  db = db.filter(x => {
    return !(x.id === id)
  });
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

export async function addUserToDay(am, date, userId) {
  writeShift(am, date, userId)
  let newEntry = {
    id: Math.floor(Math.random() * 10000),
    userId: userId,
    date: date,
    am: am,
  }
  db.push(newEntry);
}
