"use client";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function Sample() {
  // const numOption = Number(localStorage.getItem("Num Option"));
  // console.log(typeof numOption);
  const router = useRouter();
  const path = usePathname();
  let numO = 0;

  if (path === "/") {
    numO = 0;
  }
  if (path.includes("league")) {
    numO = 1;
  }
  if (path.includes("team")) {
    numO = 2;
  }
  if (path.includes("player")) {
    numO = 3;
  }

  console.log(numO);

  const [value, setValue] = useState(numO);

  const navOptions = [
    {
      label: "Matches",
      color: "#00000080",
      icon: (
        <i
          style={{
            fontSize: "20px",
          }}
          className="fi fi-br-calendar-week"
        ></i>
      ),
    },
    {
      label: "Leagues",
      color: "#00000080",
      icon: (
        <i
          style={{
            fontSize: "20px",
          }}
          className="fi fi-ss-trophy-star"
        ></i>
      ),
    },
    {
      label: "Teams",
      color: "#00000080",
      icon: (
        <i
          style={{
            fontSize: "20px",
          }}
          className="fi fi-ss-shield"
        ></i>
      ),
    },
    {
      label: "Players",
      color: "#00000080",
      icon: (
        <i
          style={{
            fontSize: "20px",
          }}
          className="fi fi-ss-user"
        ></i>
      ),
    },
  ];

  return (
    <div
      style={{
        zIndex: "2000",
      }}
    >
      <Box
        sx={{
          transition: "2s",
        }}
      >
        <BottomNavigation
          sx={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            background: "#0B2239",
            borderTop: "2px solid greenyellow",
          }}
          value={value}
          onChange={(event, newValue) => {
            // localStorage.setItem("Num Option", newValue);
            setValue(newValue);
            switch (newValue) {
              case 0:
                setTimeout(() => {
                  router.push("/");
                  console.log(path);
                }, 500);
                break;
              case 1:
                setTimeout(() => {
                  router.push("/leagues");
                  console.log(path);
                }, 500);
                break;
              case 2:
                setTimeout(() => {
                  router.push("/teams");
                  console.log(path);
                }, 500);
                break;
              case 3:
                setTimeout(() => {
                  router.push("/players");
                  console.log(path);
                }, 500);
                break;
              default:
                setTimeout(() => {
                  router.push("/");
                  console.log(path);
                }, 500);
                break;
            }
            console.log(newValue);
          }}
        >
          {navOptions.map((e, k) => {
            return (
              <BottomNavigationAction
                key={k}
                label={e.label}
                sx={{
                  color: "gainsboro",
                }}
                icon={e.icon}
              ></BottomNavigationAction>
            );
          })}
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default function NavBottom() {
  return (
    <>
      <Sample />
    </>
  );
}
