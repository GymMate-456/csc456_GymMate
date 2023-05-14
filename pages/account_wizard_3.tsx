import { useState, FormEvent } from "react";
import styles from "../styles/Signin.module.css";
import Image from "next/image";
import logo from "./../public/icons/logo.png";
import { wizardThree } from "../utils/users"
import { storage } from "../utils/firebase";
import { ToastDependency, sendToast } from "../utils/toasts"
import { useRouter } from "next/router";

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
        async (error) => {
          console.error("Failed process to save user image data.", error);
          await sendToast("error", "An error occurred while uploading your images.", 3000);
          setLoading(false);
        },
        () => {
          storage
            .ref(`users/${localStorage["uid"]}/cardImage`)
            .getDownloadURL()
            .then(async (url) => {
              setCardImageUrl(url);
              await sendToast("success", "Card Image Uploaded Succesfully!", 1000);
              setLoading(false);
            });
        }
      );
    } else {
      await sendToast("error", "Please select an image to upload", 3000);
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
        async (error) => {
          console.error("Failed process to save user image data.", error);
          await sendToast("error", "An error occurred while uploading your images.", 3000);
          setLoading(false);
        },
        () => {
          storage
            .ref(`users/${localStorage["uid"]}/profileImage`)
            .getDownloadURL()
            .then(async (url) => {
              setProfileImageUrl(url);
              await sendToast("success", "Profile Image Uploaded Succesfully!", 1000);
              setLoading(false);
            });
        }
      );
    } else {
      await sendToast("error", "Please select an image to upload", 3000);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cardImageUrl === "" || profileImageUrl === "") {
      await sendToast("error", "Please upload both images before continuing.", 3000);
    } else {
      if (await wizardThree(cardImageUrl, profileImageUrl, setLoading)) {
        router.push("/");
      }
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
              <span>loading... </span>
            </div>
          ) : (
            <button className={styles.button} type="submit">
              Finish
            </button>
          )}
        </form>
        <br />
      </div>
      <ToastDependency/>
    </div>
  );
}
export default Wizard3;
