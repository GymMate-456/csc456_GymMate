import { async } from "@firebase/util";
import { database } from "./firebase";

const getUsers = async () => {
  // Here is an example of how to get the data from the users collection on firestore
  const snapshot = await database.collection("users").get();
  snapshot.docs.forEach((docs) => console.log(docs.data()));
};

export { getUsers };
