import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, CircularProgress, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth, database, storage } from '../utils/firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import Multiselect from "multiselect-react-dropdown";
import { profile } from 'console';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
    pictures: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
    textField: {
      margin: theme.spacing(1),
      width: '65%',
    },
    button: {
      margin: theme.spacing(1),
    },
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      marginBottom: theme.spacing(2),
    },
    label: {
      fontFamily: "Rockwell",
      fontSize: "13px",
      opacity: "0.5",
    }
  }));

const ProfileScreen: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    bio: '',
    profileImgUrl: '',
    cardImgUrl: '',
    sports: [''],
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const [cardImage, setCardImage] = useState<File | null>(null);
  const [cardImgUrl, setCardImgUrl] = useState<string>("");
  const [sports, setSports] = useState<[]>([]);

  const sports_options = [
    "Baseball",
    "Basketball",
    "Boxing",
    "Calisthenics",
    "Gymnastics",
    "Soccer",
    "Swimming",
    "Tennis",
    "Track and Field",
    "Volleyball",
    "Weightlifting",
    "Wrestling",
  ];
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setCurrentUser(currentUser);
        } else {
          setCurrentUser(null);
        router.push('/'); // Redirect to login if user is not authenticated
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      // Fetch user data from Firestore
      database
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data() as {
              firstName: string;
              lastName: string;
              age: string;
              bio: string;
              profileImgUrl: string;
              cardImgUrl: string;
              sports:string[]
            };
            setProfileData(userData);
          } else {
            console.log('User data not found.');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
          setLoading(false);
        });
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSportsChange = (selectedList: any, selectedItem: any) => {
    console.log("sports changed!!!")
    setSports(selectedList)
    setProfileData((prevState) => ({
      ...profileData,
      sports: selectedList,
    }));
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleProfileImageUpload = async () => {
    if (profileImage) {
      setLoading(true);
      const uploadTask = storage
        .ref(`users/${currentUser.uid}/profileImage`)
        .put(profileImage);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          alert('An error occurred while uploading your image.');
          console.error('Failed to upload profile image:', error);
          setLoading(false);
        },
        () => {
          storage
            .ref(`users/${currentUser.uid}/profileImage`)
            .getDownloadURL()
            .then((url) => {setProfileImgUrl(url);
                setLoading(false);
              })
              .catch((error) => {
                console.log('Error getting download URL:', error);
                setLoading(false);
              });
          }
        );
      } else {
        alert('Please select an image to upload');
      }
    };
  
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
                setCardImgUrl(url);
                setLoading(false);
              });
          }
        );
      } else {
        alert("Please select an image to upload");
      }
    };
  
  const saveProfile = () => {
    setLoading(true);
    // Update the user data in Firestore
    database
      .collection('users')
      .doc(currentUser.uid)
      .update(profileData)
      .then(() => {
        console.log('Profile updated successfully.');
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error updating profile:', error);
        setLoading(false);
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  };

  if (!currentUser) {
    return null; // You can display a loading spinner or a message here if needed
  }

  return (
    <div className={classes.container}>
      {loading ? (
        <CircularProgress /> // Show a loading spinner while data is being fetched
      ) : (
        <>
        <div className={classes.pictures}>
          <div className={classes.container}>
            <Avatar
                src={profileData.profileImgUrl}
                alt="Profile Image"
                className={classes.avatar}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleProfileImageUpload}
                className={classes.button}
              >
                Update Profile Image
              </Button>
            </div>
            <div className={classes.container}>
              <Avatar
                src={profileData.cardImgUrl}
                alt="Card Image"
                className={classes.avatar}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleCardImageChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCardImageUpload}
                className={classes.button}
              >
                Update Card Image
              </Button>
            </div>
          </div>
          <TextField
            name="firstName"
            label="First Name"
            value={profileData.firstName}
            onChange={handleInputChange}
            className={classes.textField}
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={profileData.lastName}
            onChange={handleInputChange}
            className={classes.textField}
            />
            <TextField
              name="age"
              label="Age"
              value={profileData.age}
              onChange={handleInputChange}
              className={classes.textField}
            />
            <div className={classes.textField}>
            <label className={classes.label}>Sports</label>
            <Multiselect
              isObject={false}
              options={sports_options}
              selectedValues={profileData.sports}
              onSelect={(selectedList, selectedItem) => handleSportsChange(selectedList, selectedItem)}
              onRemove={(selectedList, removedItem) => handleSportsChange(selectedList, removedItem)}
            />
            </div>
            <TextField
              name="bio"
              label="Bio"
              multiline
              rows={4}
              value={profileData.bio}
              onChange={handleInputChange}
              className={classes.textField}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={saveProfile}
              className={classes.button}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignOut}
              className={classes.button}
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    );
  };
  
  export default ProfileScreen;
  
