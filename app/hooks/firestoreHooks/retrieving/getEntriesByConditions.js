import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const getEntriesByConditions = async ({
  collectionName,
  conditions,
}) => {
  try {
    const db = getFirestore(); // Initialize Firestore instance
    const colRef = collection(db, collectionName);

    // Create query based on conditions
    let q = query(colRef);
    conditions.forEach(({ field, operator, value }) => {
      let queryValue = value;
      if (value instanceof Date) {
        // Handle date-based conditions
        if (operator === "<") {
          queryValue = new Date(value.setHours(23, 59, 59, 999)); // Before end of the day
        } else if (operator === ">") {
          queryValue = new Date(value.setHours(0, 0, 0, 0)); // After start of the day
        }
      }
      q = query(q, where(field, operator, queryValue));
    });

    // Execute the query and retrieve matching documents
    const querySnapshot = await getDocs(q);

    // Map results into an array of data objects
    const results = querySnapshot.docs.map((doc) => {
        const data = doc.data(); // Get document data
      
        // Check and convert specific fields to Date if they are Timestamps
        ["start", "end", "createdOn"].forEach((field) => {
          if (data[field] && typeof data[field].toDate === "function") {
            data[field] = data[field].toDate(); // Convert to Date object
          }
        });
      
        return {
          id: doc.id, // Include the document ID
          ...data, // Include the updated document data
        };
      });

    return results; // Return the array of matching entries
  } catch (error) {
    console.error("Error fetching entries with conditions:", error);
    throw error; // Rethrow the error for further handling
  }
};
