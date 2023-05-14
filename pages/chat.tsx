import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { TextField, Button, CircularProgress, Avatar} from '@mui/material';
import { auth, database, storage } from '../utils/firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import styles from "../styles/Signin.module.css";
import Header from "./header";

interface Chat {
  user1: string;
  user2: string;
}

interface ChatList {
  sender: string;
  receiver: string;
}

export default function Chat() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    bio: '',
    profileImgUrl: '',
    cardImgUrl: '',
    sports: [''],
  });

  const [senderProfiles, setSenderProfiles] = useState<any[]>([]);
  const [receiverProfiles, setReceiverProfiles] = useState<any[]>([]);

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
  

  //sender will always be set to currentuser
  useEffect(() => {
    if (currentUser) {
    const fetchChatList = async () => {
      try {
        const chatsRef = database.collection('chats');
        const querySnapshot = await chatsRef
          .where('user1', '==', currentUser.uid)
          .get();

        const chatListData: ChatList[] = [];
        querySnapshot.forEach((doc) => {
          const chatData = doc.data() as Chat;
          chatListData.push({
            sender: chatData.user1,
            receiver: chatData.user2,
          });
        });

        const querySnapshot2 = await chatsRef
          .where('user2', '==', currentUser.uid)
          .get();

        querySnapshot2.forEach((doc) => {
          const chatData = doc.data() as Chat;
          chatListData.push({
            sender: chatData.user2,
            receiver: chatData.user1,
          });
        });
        setChatList(chatListData);
        console.log("ChatList");
        console.log(chatListData);
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    fetchChatList();
  }
  }, [currentUser]);

  //get the recievers user info
  useEffect(() => {
    const fetchProfiles = async () => {
      const senderProfilePromises = chatList.map(async (chat) => {
        const doc = await database.collection('users').doc(chat.sender).get();
        return doc.data();
      });
  
      const receiverProfilePromises = chatList.map(async (chat) => {
        const doc = await database.collection('users').doc(chat.receiver).get();
        return doc.data();
      });
  
      const senderProfilesData = await Promise.all(senderProfilePromises);
      const receiverProfilesData = await Promise.all(receiverProfilePromises);
  
      setSenderProfiles(senderProfilesData);
      setReceiverProfiles(receiverProfilesData);
    };
  
    if (chatList.length > 0) {
      fetchProfiles();
    }
  }, [chatList]);
  

  return (
    <div>

      <Header backButton="" leftButton="profileIcon" logoButton="logoIcon" rightButton="searchIcon" rightButton2="chatIcon" />
      <div className={styles.message_container}>
        <h2>Chats</h2>
      </div>  
      {chatList.map((chat, index) => (
       <Link href="/individual_chat">
          <div className={styles.message_container} key={index}>
            <Avatar src={receiverProfiles[index]?.profileImgUrl} alt="Avatar" className={styles.avatar} />
            <div className={styles.chatDetails}>
              <div className={styles.receiverName}>
                {receiverProfiles[index]?.firstName} {receiverProfiles[index]?.lastName}
              </div>
              <div className={styles.message}>Message content goes here...</div>
            </div>
            <div className={styles.timeStamp}>00:00</div>
          </div>
        </Link>
    ))}
    </div>
  );
}