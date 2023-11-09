"use client";

import "hover.css";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "animate.css";
import moment from "moment";
import { useState } from "react";
import NavBottom from "@/app/components/Global/navBottom";
import { useRouter } from "next/navigation";
import Matches from "@/app/components/matches-path/matches";

export default function MatchesByDate(p) {
  console.log("Date", p);
  const router = useRouter();
  // to hide and show calendar
  const [open, setopen] = useState(false);

  // value to current Date Choosing
  const [value, setvalue] = useState(moment(p.params.date));

  // On Scroll Header Hide and Show ..
  // let w = window.scrollY;
  // window.onscroll = () => {
  //   const h = document.querySelector(".dateHeader");
  //   if (h) {
  //     if (w < window.scrollY && w > window.innerHeight) {
  //       h.style.transform = "translateY(-100%)";
  //       setopen(false);
  //     } else {
  //       h.style.transform = "translateY(0)";
  //     }
  //   }
  //   w = window.scrollY;
  // };
  return (
    <>
      <title>
        {value.calendar(null, {
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "[Next] dddd",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "ddd , DD MMM - YYYY",
        })}
      </title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          placeItems: "center",
          background: "teal",
          color: "white",
          position: "sticky",
          top: "0",
          zIndex: "2000",
          transition: "0.4s",
        }}
        className="dateHeader"
      >
        <div
          className="hvr-float-shadow"
          style={{
            padding: "0 10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setvalue(moment(value).add(-1, "days"));
            router.push(
              `${moment(value).add(-1, "days").format("YYYY-MM-DD")}`
            );
          }}
        >
          <i className="fi fi-ss-angle-left"></i>
        </div>
        <div
          className="hvr-bounce-in"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setopen(!open);
          }}
        >
          <p
            style={{
              fontSize: "20px",
            }}
          >
            {value.calendar(null, {
              sameDay: "[Today]",
              nextDay: "[Tomorrow]",
              nextWeek: "[Next] dddd",
              lastDay: "[Yesterday]",
              lastWeek: "[Last] dddd",
              sameElse: "ddd , DD MMM - YYYY",
            })}
          </p>
          <i
            style={{
              transform: "rotate(-90deg)",
            }}
            className="fi fi-rr-caret-left"
          ></i>
        </div>
        <div
          className="hvr-float-shadow"
          style={{
            padding: "0 10px",
            cursor: "pointer",
          }}
          onClick={() => {
            setvalue(moment(value).add(1, "days"));
            router.push(`${moment(value).add(1, "days").format("YYYY-MM-DD")}`);
          }}
        >
          <i className="fi fi-ss-angle-right"></i>
        </div>
      </div>
      {open ? (
        <div
          style={{
            textAlign: "center",
            background: "seagreen",
            padding: "20px",
            // position: "sticky",
            position: "fixed",
            left: "50%",
            top: "64px",
            zIndex: "10",
            transform: "translate(-50%)",
            width: "102%",
          }}
          className="cal"
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateCalendar
              style={{
                border: "2px solid gainsboro",
                borderRadius: "30px",
                // marginTop: "5px",
                background: "aliceblue",
              }}
              className="animate__animated animate__jackInTheBox"
              onChange={(e) => {
                console.log(moment(e).format("YYYYMMDD"));
                setvalue(e);
                router.push(`${e.format("YYYY-MM-DD")}`);
              }}
              value={value}
            />
          </LocalizationProvider>
        </div>
      ) : (
        ""
      )}

      <Matches byDate={p.params.date} />

      <NavBottom />
    </>
  );
}
