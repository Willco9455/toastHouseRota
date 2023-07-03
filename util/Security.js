import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { getAdminPasswordDb } from './dbHandler';

let admin = false;

export async function loadAdmin() {// gets admin status from local storage
  try {
    const value = await AsyncStorage.getItem('admin');
    if (value === 'true') {
      admin = true;
    }
  } catch (e) {s
    console.log('error reading admin from local')
  }
  return admin;
}

export function getIsAdmin() {
  return admin;
}

export async function storeAdmin() {
  admin = true;
  try {
    await AsyncStorage.setItem('admin', 'true');
  } catch (e) {
    console.log('error Saving admin')
  }
};

export async function revokeAdmin() {
  admin = false;
  try {
    await AsyncStorage.setItem('admin', 'false');
  } catch (e) {
    console.log('error Saving admin')
  }
}

export function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export async function getAdminPassword() {
  let password = getAdminPasswordDb()
  return password;
}