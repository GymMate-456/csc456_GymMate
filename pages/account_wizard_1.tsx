import { useState, FormEvent } from "react";
import styles from "../styles/Signin.module.css";
import Image from "next/image";
import logo from "./../public/icons/logo.png";
import { database } from "../utils/firebase";
import { ToastDependency, sendToast } from "../utils/toasts"
import { useRouter } from "next/router";

function Wizard1() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check that all required fields are filled out
    if (!firstName || !lastName || !gender || !age) {
      await sendToast("error", "Please fill out all required fields.", 3000);
      return;
    }

    // Validate age
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 16) {
      await sendToast("warning", "Minimum age is 16 years old!", 3000);
      return;
    }

    // All checks passed - create the user account
    database
      .collection("users")
      .doc(localStorage["uid"])
      .update({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
      })
      .then(await sendToast("success", "Account Initalization Part 1 Completed!", 500))
      .then(() => {
        router.push("/account_wizard_2");
      })
      .catch(async (error) => {
        // error message to the user
        await sendToast("error", "An error occurred while creating a new user.", 3000);
        // Log the error to the console for debugging purposes
        console.error("Failed process to save new user data.", error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image_container}>
          <Image src={logo} alt="Image" className={styles.logo} />
        </div>
        <h1 className={styles.heading}>Tell us more about you</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            First Name
            <input
              className={styles.input}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.label}>
            Last Name
            <input
              className={styles.input}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.label}>
            Gender:
            <select
              className={styles.input}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value=" "></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <br />
          <label className={styles.label}>
            Age
            <input
              className={styles.input}
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <button className={styles.button} type="submit">
            Continue
          </button>
        </form>
        <br />
      </div>
      <ToastDependency/>
    </div>
  );
}

export default Wizard1;
