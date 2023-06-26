let db = [
  {
    id: 1,
    date: new Date(2023, 5, 26),
    userId: 4,
    am: true
  },
  {
    id: 2,
    date: new Date(2023, 5, 27),
    userId: 3,
    am: true
  },
  {
    id: 3,
    date: new Date(2023, 5, 26),
    userId: 1,
    am: true
  },
  {
    id: 4,
    date: new Date(2023, 5, 26),
    userId: 2,
    am: false
  },
  {
    id: 5,
    date: new Date(2023, 5, 26),
    userId: 1,
    am: true
  }
];

let users = [
  {
    id: 1,
    name: 'Lisa',
    color: 'grey'
  },
  {
    id: 2,
    name: 'Natasha',
    color: 'pink'
  },
  {
    id: 3,
    name: 'Pivy',
    color: 'yellow'
  },
  {
    id: 4,
    name: 'Steve',
    color: 'orange'
  },
]

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

export function deleteRecordById(id) {
  db = db.filter(x => {
    return !(x.id ===id)
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

export function addUserToDay(userId, date, am) {
  let newEntry = {
    id: Math.floor(Math.random() * 10000),
    userId: userId,
    date: date,
    am: am,
  }
  db.push(newEntry);
}
