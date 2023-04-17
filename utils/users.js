import { async } from "@firebase/util";
import { auth, database } from "./firebase";

const getUsers = async () => {
  // Here is an example of how to get the data from the users collection on firestore
  const snapshot = await database.collection('users').get();
  snapshot.docs.forEach((docs) => console.log(docs.data()));
};

// Check if password is valid
// Inputs: String Password | Outputs: Boolean Valid
const validatePassword = (password, setPasswordError, confirmPassword, setConfirmPasswordError) => {
  let valid = true;
  if (password.length <= 6) {
    valid = false;
    setPasswordError('Password is too short.');
  } else if (!/\d/.test(password)) {
    valid = false;
    setPasswordError('Password requires atleast one number.');
  } else if (!/[A-Z]/.test(password)) {
    valid = false;
    setPasswordError('Password requires atleast one capital.');
  } 
  if (password !== confirmPassword) {
    valid = false;
    setConfirmPasswordError('Passwords do not match');
  }
  return valid;
} 

// Check if email exists in user database
// Inputs: String Email | Outputs: Boolean Exists
const emailExists = async (email) => {
  const userDB = await database.collection('users').get();
  for (const user of userDB.docs) {
    if (user.data()['email'] == email) {
      alert('Email already exists. Please use another email or login.')
      return true;
    }
  }
  return false;
}

// If email & password is acceptable creates a new user
// Inputs: String Email & Password | Outputs: String UID
const createNewUser = async (email, password) => {
  // Auth creates new user
  console.log('Starting process to create new user');
  return auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
    // Saves user into users database for record keeping
    return database.collection('users').doc(credentials.user.uid).set({
      email: email, password: password, newUserFlag: true,
    }).then(() => {
        console.log('Completed process to create new user succesfully');
        return credentials.user.uid;
    }).catch((error) => {
      console.error('Failed process to save new user data');
      console.error(error.code);
      console.error(error.message);
      return 'error';
    });
  }).catch((error) => {
    console.error('Failed process to create new user');
    console.error(error.code);
    console.error(error.message);
    return 'error';
  });
}

// Checks particular user id to see if its a new user
// Inputs: String UID | Outputs: Boolean Flag
const checkNewUserFlag = async (uid) => {
  return database.collection('users').doc(uid).get().then((user) => {
    if (user.exists) {
      return user.data()['newUserFlag'];
    } else {
        console.error('Error: User does not exist!');
        return 'error';
    }
  }).catch((error) => {
    console.error('Failed to check new user flag');
    console.error(error.code);
    console.error(error.message);
    return 'error';
  });
}

// Authenticates email & password and logins in user
// Inputs: String Email & Password | Outputs: String UID
const loginUser = async (email, password) => {
  console.log('Attempting user authentication');
  return auth.signInWithEmailAndPassword(email, password).then((credentials) => {
      console.log('User login succesful!')
      return credentials.user.uid;
    }).catch((error) => {
      console.error('User login failed');
      console.error(error.code);
      console.error(error.message);
      return 'error';
    })
}

export { getUsers, emailExists, validatePassword, createNewUser, checkNewUserFlag, loginUser };
