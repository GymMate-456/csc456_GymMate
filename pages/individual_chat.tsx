import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Link from "next/link";
import Header from "./header";

export default function IndividualChat() {

  return (
    <div>

      <Header backButton="BackButton" />

      <h2> This is a individual chat page</h2>

    </div>

  );
}
