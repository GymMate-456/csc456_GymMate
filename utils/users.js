import { auth, database } from "./firebase";
import { sendToast } from "./toasts";

// Check if email exists in user database
// Inputs: String Email | Outputs: Boolean Exists
const emailExists = async (email) => {
  const userDB = await database.collection("users").get();
  for (const user of userDB.docs) {
    if (user.data()["email"] == email) {
      return true;
    }
  }
  return false;
}

// Check if password is valid
// Inputs: String Password | Outputs: Boolean Valid
const validateCredentials = async (email, password, confirmPassword) => {
  if (await emailExists(email)) {
    await sendToast("error", "Error: Email Already Exists!", 3500);
    return false;
  } else if (password.length <= 6) {
    await sendToast("error", "Password is too short.", 3500);
    return false;
  } else if (!/\d/.test(password)) {
    await sendToast("error", "Password requires atleast one number.", 3500);
    return false
  } else if (!/[A-Z]/.test(password)) {
    await sendToast("error", "Password requires atleast one capital.", 3500);
    return false
  } else if (password !== confirmPassword) {
    await sendToast("error", "Passwords do not match!", 3500);
    return false
  }
  return true
} 

// If email & password is acceptable creates a new user
// Inputs: String Email & Password | Outputs: Boolean Success
const signUp = async (email, password) => {
  // Auth creates new user
  console.log("Starting process to create new user");
  return await auth.createUserWithEmailAndPassword(email, password)
    .then(async (credentials) => {
      // Saves user into users database for record keeping
      return await database
        .collection("users").doc(credentials.user.uid)
        .set({email: email, password: password, newUserFlag: true})
        .then(() => {
          localStorage["user"] = JSON.stringify(credentials.user)
          localStorage["uid"] = credentials.user.uid
        }) 
        .then(await sendToast("success", "User succesfully created!", 500))
        .then(() => {
          return true
        })
        .catch(async (error) => {
          console.error("Error:", error.code, error.message);
          await sendToast("error", error.message, 3000);
          return false;
        });
    })
    .catch(async (error) => {
      console.error("Error:", error.code, error.message);
      await sendToast("error", error.message, 3000);
      return false;
    });
}

// Authenticates email & password and signIns in user
// Inputs: String Email & Password | Outputs: String UID
const signIn = async (email, password) => {
  return auth.signInWithEmailAndPassword(email, password)
    .then(async (credentials) => {
      console.log("User signIn succesful!")
      localStorage["user"] = JSON.stringify(credentials.user)
      localStorage["uid"] = credentials.user.uid
    })
    .then(await sendToast("success", "Succesfully Logged In!", 500))
    .then(() => {
      return true;
    })
    .catch(async (error) => {
      console.error("Error:", error.code, error.message);
      await sendToast("error", error.message, 3000);
      return false;
    })
}

// Checks particular user id to see if its a new user
// Inputs: String UID | Outputs: Boolean Flag
const userFlag = async (uid) => {
  return database.collection("users").doc(uid).get().then((credentials) => {
    if (credentials.exists) {
      return credentials.data()["newUserFlag"];
    } else {
      console.error("Error: User does not exist!");
      return null;
    }
  }).catch(async (error) => {
    console.error("Error:", error.code, error.message);
    await sendToast("Error:", error.message, 3000);
    return null;
  });
}

export { validateCredentials, signUp, signIn, userFlag };
