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
        .then(async () => {
          await sendToast("success", "User succesfully created!", 500);
          localStorage["user"] = JSON.stringify(credentials.user);
          localStorage["uid"] = credentials.user.uid;
        }) 
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
      await sendToast("success", "Succesfully Logged In!", 500);
      localStorage["user"] = JSON.stringify(credentials.user);
      localStorage["uid"] = credentials.user.uid;
    })
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
  })
  .catch(async (error) => {
    console.error("Error:", error.code, error.message);
    await sendToast("Error:", error.message, 3000);
    return null;
  });
}

const wizardOne = async (firstName, lastName, gender, age) => {
  return await database
    .collection("users")
    .doc(localStorage["uid"])
    .update({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      age: age,
    })
    .then(await sendToast("success", "Account Initalization Part 1 Completed!", 120))
    .then(() => {
      return true;
    })
    .catch(async (error) => {
      // error message to the user
      await sendToast("error", "An error occurred while creating a new user.", 3000);
      // Log the error to the console for debugging purposes
      console.error("Failed process to save new user data.", error);
      return false;
    }
  );
}

const wizardTwo = async (username, bio, sports, zipcode) => {
  return await database
    .collection("users")
    .doc(localStorage["uid"])
    .update({
      username: username,
      bio: bio,
      sports: sports.map((s) => s.name),
      zipcode: zipcode,
    })
    .then(await sendToast("success", "Account Initalization Part 2 Completed!", 120))
    .then(() => {
      return true;
    })
    .catch(async (error) => {
      // error message to the user
      await sendToast("error", "An error occurred while updating user data.", 3000);
      // Log the error to the console for debugging purposes
      console.error("Failed process to update user data.", error);
      return false;
    }
  );
}



const wizardThree = async (cardImageUrl, profileImageUrl, setLoading) => {
  return await database
    .collection("users")
    .doc(localStorage["uid"])
    .update({
      cardImgUrl: cardImageUrl,
      profileImgUrl: profileImageUrl,
      newUserFlag: false,
      test: 2343,
    })
    .then(await sendToast("success", "Account Initalization Completed!", 120))
    .then(() => {
      setLoading(false);
      return true;
    })
    .catch(async (error) => {
      console.error("Failed process to save new user data.", error);
      await sendToast("error", "An error occurred while creating a new user.", 3000);
      return false;
    }
  );
}

export { validateCredentials, signUp, signIn, userFlag, wizardOne, wizardTwo, wizardThree };
