import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";
import Header2 from "./Header2";

export default function IndividualChat() {

  return (
    <div>

      <Header2 backButton="BackButton" />

      <h2> This is a individual chat page</h2>

    </div>

  );
}
