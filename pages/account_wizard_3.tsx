import { useState, FormEvent } from "react";
import styles from "../styles/Signin.module.css";
import Image from "next/image";
import logo from "./../public/icons/logo.png";
import { database, storage } from "../utils/firebase";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";

function Wizard3() {
  const [cardImage, setCardImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCardImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setCardImage(event.target.files[0]);
    }
  };

  const handleCardImageUpload = async () => {
    if (cardImage) {
      setLoading(true);
      const uploadTask = storage
        .ref(`users/${localStorage["uid"]}/cardImage`)
        .put(cardImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert("An error occurred while uploading your images.");
          console.error("Failed process to save user image data.", error);
          setLoading(false);
        },
        () => {
          storage
            .ref(`users/${localStorage["uid"]}/cardImage`)
            .getDownloadURL()
            .then((url) => {
              setCardImageUrl(url);
              setLoading(false);
            });
        }
      );
    } else {
      alert("Please select an image to upload");
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleProfileImageUpload = async () => {
    if (profileImage) {
      setLoading(true);
      const uploadTask = storage
        .ref(`users/${localStorage["uid"]}/profileImage`)
        .put(profileImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          alert("An error occurred while uploading your images.");
          console.error("Failed process to save user image data.", error);
          setLoading(false);
        },
        () => {
          storage
            .ref(`users/${localStorage["uid"]}/profileImage`)
            .getDownloadURL()
            .then((url) => {
              setProfileImageUrl(url);
              setLoading(false);
            });
        }
      );
    } else {
      alert("Please select an image to upload");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cardImageUrl === "" || profileImageUrl === "") {
      alert("Please upload both images before continuing.");
    } else {
      setLoading(true);
      database
        .collection("users")
        .doc(localStorage["uid"])
        .update({
          cardImgUrl: cardImageUrl,
          profileImgUrl: profileImageUrl,
          newUserFlag: false,
        })
        .then(() => {
          setLoading(false);
          router.push("/");
        })
        .catch((error) => {
          alert("An error occurred while creating a new user.");
          console.error("Failed process to save new user data.", error);
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image_container}>
          <Image src={logo} alt="Image" className={styles.logo} />
        </div>
        <h1 className={styles.heading}>Add your Images</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>
              Card Image
              <input
                className={styles.input}
                type="file"
                accept="image/*"
                onChange={handleCardImageChange}
              />
            </label>
            <button
              className={styles.button}
              type="button"
              onClick={handleCardImageUpload}
            >
              Upload
            </button>
          </div>
          {cardImageUrl && (
            <p className={styles.success}>Card image uploaded successfully!</p>
          )}
          <div>
            <label className={styles.label}>
              Profile Image
              <input
                className={styles.input}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </label>
            <button
              className={styles.button}
              type="button"
              onClick={handleProfileImageUpload}
            >
              Upload
            </button>
          </div>
          {profileImageUrl && (
            <p className={styles.success}>
              Profile image uploaded successfully!
            </p>
          )}
          <br />
          {loading ? (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          ) : (
            <button className={styles.button} type="submit">
              Finish
            </button>
          )}
        </form>
        <br />
      </div>
    </div>
  );
}
export default Wizard3;
