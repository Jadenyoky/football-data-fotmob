"use client";
import { useState } from "react";
import NavBottom from "./components/Global/navBottom";
import styles from "./page.module.css";
import Date from "./components/matches-path/date";
import Matches from "./components/matches-path/matches";

export default function Home() {
  const [loading, setloading] = useState(true);
  return (
    <>
      <title>Today</title>

      <Date />
      <Matches />

      <NavBottom />
    </>
  );
}
