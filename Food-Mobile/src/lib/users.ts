
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "./firebase";
import { signOut } from "firebase/auth";

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

export async function getUserProfile() {
  if (!auth.currentUser) {
    throw new Error("No User Authenticated");
  }

  const snapshot = await getDoc(doc(db, "User", auth.currentUser.uid));

  return snapshot?.data();
}


export async function updateUserProfile(
  updates: {
    name?: string;
  }
) {
  if (!auth.currentUser) {
    throw new Error("No User Authenticated");
  }

  await updateDoc(doc(db, "User", auth.currentUser.uid), updates);
}


export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.log("Logout error:", error);
  }
}