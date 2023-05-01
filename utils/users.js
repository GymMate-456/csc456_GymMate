import { async } from "@firebase/util";
import { auth, database } from "./firebase";

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
  } else if (password !== confirmPassword) {
    valid = false;
    setConfirmPasswordError('Passwords do not match!');
  }
  return valid;
} 

// Check if email exists in user database
// Inputs: String Email | Outputs: Boolean Exists
const emailExists = async (email) => {
  const userDB = await database.collection('users').get();
  for (const user of userDB.docs) {
    if (user.data()['email'] == email) {
      alert('Email already exists. Please use another email or signIn.')
      return true;
    }
  }
  return false;
}

// If email & password is acceptable creates a new user
// Inputs: String Email & Password | Outputs: Boolean Success
const signUp = async (email, password) => {
  // Auth creates new user
  console.log('Starting process to create new user');
  return auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
    // Saves user into users database for record keeping
    return database.collection('users').doc(credentials.user.uid).set({
      email: email, password: password, newUserFlag: true,
    }).then(() => {
      console.log('Completed process to create new user succesfully');
      // Caching User Object & UID
      localStorage['user'] = JSON.stringify(credentials.user)
      localStorage['uid'] = credentials.user.uid
      return true;
    }).catch((error) => {
      console.error('Failed process to save new user data', error.code, error.message);;
      return false;
    });
  }).catch((error) => {
    console.error('Failed process to create new user', error.code, error.message);
    return false;
  });
}

// Checks particular user id to see if its a new user
// Inputs: String UID | Outputs: Boolean Flag
const userFlag = async (uid) => {
  return database.collection('users').doc(uid).get().then((credentials) => {
    if (credentials.exists) {
      return credentials.data()['newUserFlag'];
    } else {
      console.error('Error: User does not exist!');
      return null;
    }
  }).catch((error) => {
    console.error('Failed to check new user flag', error.code, error.message);
    return null;
  });
}

// Authenticates email & password and signIns in user
// Inputs: String Email & Password | Outputs: String UID
const signIn = async (email, password) => {
  console.log('Attempting user authentication');
  return auth.signInWithEmailAndPassword(email, password).then((credentials) => {
    console.log('User signIn succesful!')
    // Caching User Object & UID
    localStorage['user'] = JSON.stringify(credentials.user)
    localStorage['uid'] = credentials.user.uid
    return true;
  }).catch((error) => {
    console.error('User signIn failed', error.code, error.message);
    return false;
  })
}

export { emailExists, validatePassword, userFlag, signUp, signIn };
