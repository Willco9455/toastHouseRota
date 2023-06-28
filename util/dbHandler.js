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
      userId: x.data().userId,
      am: x.data().am
    }));
  }).catch(error => {
    console.log(error)
  })
  db = [...tempDb]
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
      console.log('User deleted!');
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
  await firestore()
    .collection('shifts')
    .add({
      am: am,
      date: date,
      userId: userId,
    })
    .then((docRef) => {
      db.push({
        id: docRef.id,
        userId: userId,
        date: date,
        am: am,
      });
      console.log('User added!');
    });

}
