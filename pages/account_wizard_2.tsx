import { useState, FormEvent } from "react";
import styles from "../styles/Signin.module.css";
import Image from "next/image";
import logo from "./../public/icons/logo.png";
import { database, geocollection } from "../utils/firebase";
import { useRouter } from "next/router";
import Multiselect from "multiselect-react-dropdown";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function Wizard2() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [sports, setSports] = useState<{ id: string; name: string }[]>([]);
  const [zipcode, setZipcode] = useState("");
  const router = useRouter();
  const [location, setLocation] = useState<firebase.firestore.GeoPoint | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username, bio, sports);
    // Check that all required fields are filled out
    if (!username || !bio || sports.length === 0) {
      alert("Please fill out all required fields.");
      return;
    }
    await handleLocation();
    // All checks passed - update the user account
    database
      .collection("users")
      .doc(localStorage["uid"])
      .update({
        username: username,
        bio: bio,
        sports: sports.map((s) => s.name),
        zipcode: zipcode,
      })
      .then(() => {
        router.push("/account_wizard_3");
      })
      .catch((error) => {
        // error message to the user
        alert("An error occurred while updating user data.");
        // Log the error to the console for debugging purposes
        console.error("Failed process to update user data.", error);
      });
  };
  const handleLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(new firebase.firestore.GeoPoint(latitude, longitude));
          setSuccessMessage("Location Received Successfully");
          setErrorMessage("");
          const geopoint = new firebase.firestore.GeoPoint(latitude, longitude);
          geocollection
            .doc(localStorage["uid"])
            .update({
              location: geopoint,
            })
            .catch((error) => {
              console.error(error);
            });
        },
        (error) => {
          console.error(error);
          setSuccessMessage("");
          setErrorMessage("Cannot Get Location - Defaulting Location to NYC");
          setLocation(new firebase.firestore.GeoPoint(40.7128, -74.006));
          const geopoint = new firebase.firestore.GeoPoint(40.7128, -74.006);
          geocollection
            .doc(localStorage["uid"])
            .update({
              location: geopoint,
            })
            .catch((error) => {
              console.error(error);
            });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setSuccessMessage("");
      setErrorMessage("Cannot Get Location - Defaulting Location to NYC");
      setLocation(new firebase.firestore.GeoPoint(40.7128, -74.006));
      setLocation(new firebase.firestore.GeoPoint(40.7128, -74.006));
      const geopoint = new firebase.firestore.GeoPoint(40.7128, -74.006);
      geocollection
        .doc(localStorage["uid"])
        .update({
          location: geopoint,
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image_container}>
          <Image src={logo} alt="Image" className={styles.logo} />
        </div>
        <h1 className={styles.heading}>Complete your profile</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.label}>
            Bio
            <textarea
              className={styles.input}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <br />
          <label className={styles.label}>
            Sports
            <Multiselect
              options={[
                { id: "1", name: "Baseball" },
                { id: "2", name: "Basketball" },
                { id: "3", name: "Boxing" },
                { id: "4", name: "Calisthenics" },
                { id: "5", name: "Gymnastics" },
                { id: "6", name: "Soccer" },
                { id: "7", name: "Swimming" },
                { id: "8", name: "Tennis" },
                { id: "9", name: "Track and Field" },
                { id: "10", name: "Volleyball" },
                { id: "11", name: "Weightlifting" },
                { id: "12", name: "Wrestling" },
              ]}
              displayValue="name"
              selectedValues={sports}
              onSelect={(selectedList, selectedItem) => setSports(selectedList)}
              onRemove={(selectedList, removedItem) => setSports(selectedList)}
            />
          </label>
          <br />

          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <br />
          <button className={styles.button} type="submit">
            Complete
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default Wizard2;
