import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { database } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import Avatar from "@mui/material/Avatar";
import Header from "../../pages/header";

interface Message {
  message: string;
  senderId: string;
  profileImgUrl: string;
  username: string;
  createdAt: firebase.firestore.Timestamp;
}

export default function Chat() {
  const router = useRouter();
  const { chatId: chatIdQuery } = router.query;
  const chatId = Array.isArray(chatIdQuery) ? chatIdQuery[0] : chatIdQuery;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[] | null>(null);

  useEffect(() => {
    if (chatId) {
      const unsubscribe = database
        .collection("chats")
        .doc(chatId)
        .onSnapshot((snapshot) => {
          setMessages(snapshot.data()?.messages || []);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [chatId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await database
        .collection("chats")
        .doc(chatId)
        .update({
          messages: [
            ...(messages || []),
            {
              message: input,
              senderId: localStorage["uid"],
              profileImgUrl:
                "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg",
              username: "test",
              createdAt: firebase.firestore.Timestamp.now(),
            },
          ],
        });

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <Header
        backButton=""
        leftButton="profileIcon"
        logoButton="logoIcon"
        rightButton="searchIcon"
        rightButton2="chatIcon"
      />
      <div className="chatId">
        <p className="chatId__timeStamp">
          YOU MATCHED WITH JOHN DOE ON 8/6/2021
        </p>
        {messages &&
          messages.map((message) =>
            message.senderId !== localStorage["uid"] ? (
              <div className="chatId__message">
                <Avatar
                  className="chatId__image"
                  alt={message.username}
                  src={message.profileImgUrl}
                />
                <p className="chatId__text"> {message.message}</p>
              </div>
            ) : (
              <div className="chatId__message">
                <p className="chatId__textUser"> {message.message}</p>
              </div>
            )
          )}
        <div>
          <form className="chatId__input">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="chatId__inputField"
              type="text"
              placeholder="Type a message..."
            />
            <button onClick={handleSend} className="chatId__inputButton">
              SEND
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
