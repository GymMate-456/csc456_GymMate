import { async } from "@firebase/util";
import { auth, database } from "./firebase";
// import { useDispatch } from "react-redux";
// import { setUserID } from "../store/reducers/user";

// const dispatch = useDispatch();

const getUsers = async () => {
  // Here is an example of how to get the data from the users collection on firestore
  const snapshot = await database.collection("users").get();
  snapshot.docs.forEach((docs) => console.log(docs.data()));
};

// Check if password is valid
// Inputs: String Password | Outputs: Boolean Valid
const validatePassword = (
  password,
  setPasswordError,
  confirmPassword,
  setConfirmPasswordError
) => {
  let valid = true;
  if (password.length <= 6) {
    valid = false;
    setPasswordError("Password is too short.");
  } else if (!/\d/.test(password)) {
    valid = false;
    setPasswordError("Password requires atleast one number.");
  } else if (!/[A-Z]/.test(password)) {
    valid = false;
    setPasswordError("Password requires atleast one capital.");
  }
  if (password !== confirmPassword) {
    valid = false;
    setConfirmPasswordError("Passwords do not match");
  }
  return valid;
};

// Check if email exists in user database
// Inputs: String Email | Outputs: Boolean Exists
const emailExists = async (email) => {
  const userDB = await database.collection("users").get();
  for (const user of userDB.docs) {
    if (user.data()["email"] == email) {
      alert("Email already exists. Please use another email or login.");
      return true;
    }
  }
  return false;
};

// If email & password is acceptable creates a new user
// Inputs: String Email & Password | Outputs: Success Boolean
const createNewUser = async (email, password) => {
  // Auth creates new user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((credentials) => {
      // dispatch(setUserID(credentials.user.uid));
      // Saves user into users database for record keeping
      database
        .collection("users")
        .doc(credentials.user.uid)
        .set({
          email: email,
          password: password,
        })
        .then(() => {
          console.log("New User Succesfully Created");
          return true;
        })
        .catch((error) => {
          console.error("User Data Save Failed: ", error);
          return false;
        });
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      return false;
    });
};

export { getUsers, emailExists, validatePassword, createNewUser };
