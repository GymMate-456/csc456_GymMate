import React, { useState } from "react";
import TinderCardWrapper from "./TinderCardWrapper";
import firebase from "firebase/compat/app";
import { database } from "../utils/firebase";
import { debounce } from "lodash";

interface Person {
  userID: string;
  username: string;
  age: string;
  bio: string;
  sports: string[];
  profileImgUrl: string;
  cardImgUrl?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  zipcode: string;
  email: string;
  id: string;
  likes: string[];
  likesMe?: string[];
  matches?: string[];
  dislikes?: string[];
  flagNewUser?: boolean;
}

interface Props {
  data: Person[] | null;
}

const GymMateCards: React.FC<Props> = ({ data }) => {
  const [isLikingUser, setIsLikingUser] = useState(false);
  const [isRequestInProgress, setRequestInProgress] = useState(false);

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
    padding: "1rem",
    marginTop: "5px",
    position: "relative", // add this line
    zIndex: 1, // add this line
    backgroundColor: "white",
    opacity: 1,
  };

  const textStyle: React.CSSProperties = {
    fontWeight: "normal",
    fontSize: "16px",
    margin: "0",
  };

  const textStyleBold: React.CSSProperties = {
    fontWeight: "bold",
    fontSize: "16px",
    margin: "0",
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: "bold",
    fontSize: "24px",
    margin: "0",
  };

  const likeUser = async (currentUserID: any, likedUserID: any) => {
    if (isRequestInProgress) {
      console.log("Request in progress. Skipping this request.");
      return;
    }
    setRequestInProgress(true);
    const sortedUserIDs = [currentUserID, likedUserID].sort((a, b) =>
      a.localeCompare(b)
    );

    try {
      const currentUserRef = database.collection("users").doc(currentUserID);
      const currentUserDoc = await currentUserRef.get();
      let currentUserLikes = currentUserDoc.data()?.likes;

      // If the likes property does not exist, create it
      if (!currentUserLikes) {
        currentUserLikes = [];
        await currentUserRef.update({ likes: [] });
      }

      // Check if the current user has not already liked the liked user
      if (!currentUserLikes.includes(likedUserID)) {
        await currentUserRef.update({
          likes: firebase.firestore.FieldValue.arrayUnion(likedUserID),
        });

        const likedUserRef = database.collection("users").doc(likedUserID);
        let likedUserDoc = await likedUserRef.get();
        let likedUserLikes = likedUserDoc.data()?.likes;

        // If the likesMe property does not exist, create it
        if (!likedUserLikes) {
          likedUserLikes = [];
          await likedUserRef.update({ likesMe: [] });
        }

        await likedUserRef.update({
          likesMe: firebase.firestore.FieldValue.arrayUnion(currentUserID),
        });

        // Check if the liked user also likes the current user
        if (likedUserLikes?.includes(currentUserID)) {
          const matchRef = database.collection("matches").doc();
          const chatRef = database.collection("chats").doc(matchRef.id);

          // Use a transaction to ensure atomic operations
          await database.runTransaction(async (transaction) => {
            // Check if the match already exists
            const existingMatchDoc = await transaction.get(matchRef);

            if (!existingMatchDoc.exists) {
              // It's a match! Create a new match document
              transaction.set(matchRef, {
                user1: sortedUserIDs[0],
                user2: sortedUserIDs[1],
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                messages: [],
              });

              // Create a chat document with the same ID as the match document
              transaction.set(chatRef, {
                user1: sortedUserIDs[0],
                user2: sortedUserIDs[1],
                messages: [],
              });
              console.log(
                "Match found! Creating matchRef and chatRef in firebase..."
              );
            } else {
              console.log(
                "Match already exist. Not creating any ref in firebase."
              );
            }
          });
        } else {
          console.log("User liked successfully!");
        }
      } else {
        console.log("User has already liked this person!");
      }
    } catch (error) {
      console.error("Error liking user:", error);
    } finally {
      setRequestInProgress(false);
    }
  };

  const swiped = debounce(async (direction: any, person: any) => {
    if (direction === "left") {
      console.log("disliking user");
      // const response = await dislikeUser(user, person);
    } else if (direction === "right") {
      if (isLikingUser) {
        return; // Do not proceed if there's an ongoing likeUser request
      }
      setIsLikingUser(true);
      const response = await likeUser(localStorage["uid"], person);
      setIsLikingUser(false);
    }
  }, 1000);

  return (
    <div className="gymMateCards">
      <div className="gymMateCards__cardContainer">
        {data &&
          data.map((person) => (
            <TinderCardWrapper
              className="swipe"
              key={person.email}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, person.id)}
            >
              <div
                style={
                  person.cardImgUrl
                    ? { backgroundImage: `url(${person.cardImgUrl})` }
                    : {
                        background:
                          "hsla(46, 95%, 56%, 1), linear-gradient(90deg, hsla(46, 95%, 56%, 1) 0%, hsla(350, 97%, 65%, 1) 100%), -moz-linear-gradient(90deg, hsla(46, 95%, 56%, 1) 0%, hsla(350, 97%, 65%, 1) 100%), -webkit-linear-gradient(90deg, hsla(46, 95%, 56%, 1) 0%, hsla(350, 97%, 65%, 1) 100%), progid: DXImageTransform.Microsoft.gradient( startColorstr='#F9C823', endColorstr='#FC506E', GradientType=1 )",
                      }
                }
                className="card"
              ></div>
              <div style={contentStyle} className="card_bottom">
                <h2 style={titleStyle}>{person.username}</h2>
                <p>
                  <span style={textStyleBold}>About Me:</span>{" "}
                  <span style={textStyle}>{person.bio}</span>
                </p>
                <p>
                  <span style={textStyleBold}>Sports:</span>{" "}
                  <span style={textStyle}>{person.sports.join(", ")}</span>
                </p>
                <p>
                  <span style={textStyleBold}>Gender:</span>{" "}
                  <span style={textStyle}>Male</span>
                </p>
              </div>
            </TinderCardWrapper>
          ))}
      </div>
    </div>
  );
};

export default GymMateCards;
