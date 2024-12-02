import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/components/firebaseClient";

const getUserByFirebaseId = async ({firebaseId}) => {
  try {
    const accountCollection = collection(db, "Account"); // Reference the 'Account' collection
    const q = query(accountCollection, where("firebaseId", "==", firebaseId)); // Query by firebaseId

    const querySnapshot = await getDocs(q); // Execute the query

    if (!querySnapshot.empty) {
      // Extract the document data
      const userDoc = querySnapshot.docs[0]; // Assuming firebaseId is unique
      const userData = userDoc.data();
      console.log("User found:", userData);
      return userData; // Return user data
    } else {
      console.log("No user found with the given firebaseId.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user by firebaseId:", error);
    throw error; // Re-throw error for further handling
  }
};

const getDependantsByFirebaseId = async ({firebaseId}) => {
    try {
      const accountCollection = collection(db, "accountDependants"); // Reference the 'Account' collection
      const q = query(accountCollection, where("accountFirebaseId", "==", firebaseId)); // Query by firebaseId
  
      const querySnapshot = await getDocs(q); // Execute the query
  
      if (!querySnapshot.empty) {
        // Extract the document data
        const userDoc = querySnapshot.docs[0]; // Assuming firebaseId is unique
        const userData = userDoc.data();
        console.log("Dependants found:", userData);
        return userData; // Return user data
      } else {
        console.log("No dependants found with the given firebaseId.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user by firebaseId:", error);
      throw error; // Re-throw error for further handling
    }
  };

export {getUserByFirebaseId, getDependantsByFirebaseId};