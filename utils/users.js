import { auth, database } from './firebase';
import { sendToast } from './toasts';

// Check if password is valid
// Inputs: String Password | Outputs: Boolean Valid
const validatePassword = async (password, setPasswordError, confirmPassword, setConfirmPasswordError) => {
  let valid = true;
  if (password.length <= 6) {
    valid = false;
    setPasswordError('Password is too short.');
    await sendToast(3, 'Password is too short.', 3000);
  } else if (!/\d/.test(password)) {
    valid = false;
    setPasswordError('Password requires atleast one number.');
    await sendToast(3, 'Password requires atleast one number.', 3000);
  } else if (!/[A-Z]/.test(password)) {
    valid = false;
    setPasswordError('Password requires atleast one capital.');
    await sendToast(3, 'Password requires atleast one capital.', 3000);
  } else if (password !== confirmPassword) {
    valid = false;
    setConfirmPasswordError('Passwords do not match!');
    await sendToast(3, 'Passwords do not match!', 3000);
  }
  return valid;
} 

// Check if email exists in user database
// Inputs: String Email | Outputs: Boolean Exists
const emailExists = async (email) => {
  const userDB = await database.collection('users').get();
  for (const user of userDB.docs) {
    if (user.data()['email'] == email) {
      await sendToast(3, 'Error: Email Already Exists!', 3000);
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
    }).then(async () => {
      console.log('Completed process to create new user succesfully');
      // Caching User Object & UID
      localStorage['user'] = JSON.stringify(credentials.user)
      localStorage['uid'] = credentials.user.uid
      return true;
    }).catch(async (error) => {
      console.error('Failed process to save new user data', error.code, error.message);
      await sendToast(3, error.message, 3000);
      return false;
    });
  }).catch(async (error) => {
    console.error('Failed process to create new user', error.code, error.message);
    await sendToast(3, error.message, 3000);
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
  return auth.signInWithEmailAndPassword(email, password).then(async (credentials) => {
    console.log('User signIn succesful!')
    // Caching User Object & UID
    localStorage['user'] = JSON.stringify(credentials.user)
    localStorage['uid'] = credentials.user.uid
    await sendToast(1, 'Successfully Logged in!', 750);
    return true;
  }).catch(async (error) => {
    console.error('User signIn failed', error.code, error.message);
    await sendToast(3, error.message, 3000);
    return false;
   })
}

export { emailExists, validatePassword, userFlag, signUp, signIn };
