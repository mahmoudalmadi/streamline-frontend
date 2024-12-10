import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/components/firebaseClient";

export const addListOfJsonsLocationTeamIds = async ({listOfJsons, locationId, teamId}) => {
    try {
      const promises = operationDayTimeList.map((operation) =>
        addDoc(collection(db, "OperationDayTime"), {
          ...operation,
          locationId,
          teamId,
        })
      );
      await Promise.all(promises);
      console.log("Operation day times added successfully");
    } catch (error) {
      console.error("Error adding operation day times: ", error);
    }
  };
  