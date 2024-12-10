import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/components/firebaseClient";

export const addInfoAsJson = async ({jsonInfo,collectionName}) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...jsonInfo,
    });
    console.log(`${collectionName} info added successfully`);
  } catch (error) {
    console.error("Error adding account info: ", error);
  }
};
