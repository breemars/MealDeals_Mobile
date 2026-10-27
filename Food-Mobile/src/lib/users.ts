
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "./firebase";

export async function createUserProfile(
  name: string
) {

    try {
        if(auth.currentUser){
            const uid = auth.currentUser.uid;
            const email = auth.currentUser.email;

            console.log(uid)

            await setDoc(doc(db, "User", uid), {
                name,
                email,
                createdAt: serverTimestamp(),
            });
        }
        
    } catch (error) {
        console.log(error)
    }
}




/////for later

export async function getUserProfile(uid: string) {
  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    throw new Error("You can only access your own profile.");
  }

  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function updateUserProfile(
  uid: string,
  updates: {
    firstName?: string;
    lastName?: string;
    address?: string;
  }
) {
  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    throw new Error("You can only update your own profile.");
  }

  await updateDoc(doc(db, "users", uid), updates);
}
