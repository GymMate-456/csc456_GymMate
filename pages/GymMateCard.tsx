import React, { useState } from "react";
import TinderCardWrapper from "./TinderCardWrapper";

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
  uid: string;
  likes: string[];
  likesMe?: string[];
  matches?: string[];
  dislikes?: string[];
  flagNewUser?: boolean;
}

interface Props {
  data: Person[];
}

const GymMateCards: React.FC<Props> = ({ data }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPerson, setCurrentPerson] = useState<Person>({
    age: "21",
    bio: "ovided an out-of-range value `null` for the select component. Consider providing a value that matches one of the available options or ''. The available values are `Male`, `Female`, `Other`. (",
    cardImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/athletelink-2b0c4.appspot.com/o/users%2FPugplc57FjN8k0XFn4GvhH0l0qG3%2FcardImage?alt=media",
    dislikes: [],
    email: "hi@hi.com",
    flagNewUser: false,
    likes: [],
    likesMe: [],
    location: {
      latitude: 40,
      longitude: -73,
    },
    matches: [],
    profileImgUrl:
      "https://firebasestorage.googleapis.com/v0/b/athletelink-2b0c4.appspot.com/o/users%2FPugplc57FjN8k0XFn4GvhH0l0qG3%2FprofileImage?alt=media",
    sports: ["Basketball", "Baseball", "Boxing", "Calisthenics"],
    uid: "Pugplc57FjN8k0XFn4GvhH0l0qG3",
    userID: "Pugplc57FjN8k0XFn4GvhH0l0qG3",
    username: "Khuziama",
    zipcode: "11010",
  });

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

  return (
    <div className="gymMateCards" key={currentPerson.username}>
      <div className="gymMateCards__cardContainer">
        {data &&
          data.map((person) => (
            <TinderCardWrapper
              className="swipe"
              key={person.username}
              preventSwipe={["up", "down"]}
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
