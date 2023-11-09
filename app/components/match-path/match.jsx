"use client";

import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "animate.css";
import "hover.css";

export default function MatchDetails({
  homeId,
  homeName,
  homeScore,
  homeColor,
  homeFont,
  awayId,
  awayName,
  awayScore,
  awayColor,
  awayFont,
  date,
  status,
  statusShort,
  country,
  leagueId,
  leagueName,
  round,
  events,
}) {
  const [resultes, setresults] = useState([]);
  const [loading, setloading] = useState(false);

  // api matches
  let apiUrl = `https://www.fotmob.com/api/leagues?id=${leagueId}`;

  // For Skip Cors - http cors proxy -
  // const options = {
  //   method: "POST",
  //   url: "https://http-cors-proxy.p.rapidapi.com/",
  //   headers: {
  //     "content-type": "application/json",
  //     // Origin: "www.example.com",
  //     "X-Requested-With": "www.example.com",
  //     "X-RapidAPI-Key": "4671c42cb7msh6e8cb86d8de0650p17acf2jsn5d10db751fd7",
  //     "X-RapidAPI-Host": "http-cors-proxy.p.rapidapi.com",
  //   },
  //   data: {
  //     url: apiUrl,
  //   },
  // };

  // For Skip Cors - cors proxy -
  const optionsAlter = {
    method: "GET",
    url: "https://cors-proxy4.p.rapidapi.com/",
    params: {
      url: apiUrl,
    },
    headers: {
      "X-RapidAPI-Key": "4671c42cb7msh6e8cb86d8de0650p17acf2jsn5d10db751fd7",
      "X-RapidAPI-Host": "cors-proxy4.p.rapidapi.com",
    },
  };

  const apiLeague = async () => {
    setloading(false);
    const apiA = await axios.request(optionsAlter);
    console.log(apiA.data);
    setresults(apiA.data);
    setloading(true);
  };
  useEffect(() => {
    apiLeague();
  }, []);

  return (
    <>
      <div className="container">
        <div className="logo-and-name-away">
          <div className="logo-away">
            <img
              width={"50px"}
              src={`https://images.fotmob.com/image_resources/logo/teamlogo/8634.png`}
            />
          </div>
          <div className="name-away">Barcelona</div>
        </div>
        <div className="logo-and-name-home">
          <div className="logo-home">
            <img
              width={"50px"}
              src={`https://images.fotmob.com/image_resources/logo/teamlogo/8634.png`}
            />
          </div>
          <div className="name-home">Barcelona</div>
        </div>
        <div className="result-or-timed">
          <div className="dash">-</div>
          <div className="score-home">2</div>
          <div className="score-away">4</div>
        </div>
      </div>

      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 150px 1fr",
          background: "grey",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#FE4B43",
            borderRadius: "15px 5px",
            margin: "20px",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "20px",
            borderRadius: "50px",
          }}
        >
          <p
            style={{
              color: "white",
            }}
          >
            Barcelona
          </p>
          <div
            style={{
              boxShadow: "0px 0px 0px 3px white",
              display: "flex",
              padding: "5px",
              borderRadius: "50px",
              background: "gainsboro",
            }}
          >
            <img
              width={"50px"}
              src={`https://images.fotmob.com/image_resources/logo/teamlogo/8634.png`}
            />
          </div>
        </div>

        <div
          style={{
            background: "black",
            color: "white",
            display: "flex",
          }}
        >
          <p>120+ 20</p>
        </div>

        <div
          style={{
            background: "#FE4B43",
            borderRadius: "5px 15px",
            margin: "20px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "20px",
            flexDirection: "row-reverse",
            borderRadius: "50px",
          }}
        >
          <p
            style={{
              color: "white",
            }}
          >
            Barcelona
          </p>
          <div
            style={{
              boxShadow: "0px 0px 0px 3px white",
              display: "flex",
              padding: "5px",
              borderRadius: "50px",
              background: "gainsboro",
            }}
          >
            <img
              width={"50px"}
              src={`https://images.fotmob.com/image_resources/logo/teamlogo/8634.png`}
            />
          </div>
        </div>
      </div> */}

      {/* <div>
        <div className="container">
          <div className="Header">
            <div className="League-Side">
              <div className="league-Logo">
                <img
                  width={"30px"}
                  src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${leagueId}.png`}
                />
              </div>
              <div className="League-Name-and-Round">{leagueName}</div>
            </div>
            <div className="Time">{moment(date).format("hh:mm A")}</div>
            <div className="Status-Time">{moment(date).format("hh:mm A")}</div>
            <div className="Date">{moment(date).format("DD MMM, YYYY")}</div>
          </div>
          <div className="Home-Side">
            <div className="Home-Name-and-Logo-Team">
              <div className="Home-Name">{homeName}</div>
              <div className="Home-Logo">
                <img
                  width={"50px"}
                  src={`https://images.fotmob.com/image_resources/logo/teamlogo/${homeId}.png`}
                />
              </div>
            </div>
            <div className="Away-Name-and-Logo-Team">
              <div className="Away-Logo">
                <img
                  width={"50px"}
                  src={`https://images.fotmob.com/image_resources/logo/teamlogo/${awayId}.png`}
                />
              </div>
              <div className="Away-Name">{awayName}</div>
            </div>
            <div className="Status-Or-Time-Or-Score">
              <div className="Away-Score">{awayScore}</div>
              <div className="Home-Score">{homeScore}</div>
              <div className="Space">-</div>
              <div className="Status-and-Time">{status}</div>
            </div>
          </div>
        </div>
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "2px solid gainsboro",
                width: "fit-content",
                padding: "5px 10px",
                margin: "20px",
              }}
            >
              <img
                style={{}}
                width={"30px"}
                src={`https://images.fotmob.com/image_resources/logo/teamlogo/${homeId}.png`}
              />
            </div>
            <span
              style={{
                // background: homeColor,
                // color: homeFont,
                border: "2px solid gainsboro",
                borderRight: "1px solid #3F8EAD",
                marginLeft: "-20px",
                height: "48px",
                minWidth: "100px",
                display: "flex",
                alignItems: "center",
                padding: " 0 10px",
              }}
            >
              {homeName}
            </span>
            <div
              style={{
                background: "#3F8EAD",
                height: "48px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 15px",
                color: "white",
              }}
            >
              20
            </div>
          </div>
        
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <div
              style={{
                border: "2px solid gainsboro",
                width: "fit-content",
                padding: "5px 10px",
                margin: "20px",
              }}
            >
              <img
                style={{}}
                width={"30px"}
                src={`https://images.fotmob.com/image_resources/logo/teamlogo/${awayId}.png`}
              />
            </div>
            <span
              style={{
                border: "2px solid gainsboro",
                borderLeft: "1px solid #d56432",
                marginRight: "-20px",
                height: "48px",
                minWidth: "100px",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                padding: " 0 10px",
              }}
            >
              {awayName}
            </span>
            <div
              style={{
                background: "#d56432",
                height: "48px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 15px",
                color: "white",
              }}
            >
              20
            </div>
        
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 30px",
                background: "green",
                height: "70px",
                color: "grey",
                borderRadius: "30px",
                margin: "0 -10px",
                zIndex: "1",
                border: "1px solid gainsboro",
                backgroundColor: "white",
              }}
            >
              <span>asdfasd</span>
            </div>
          </div>
        </div>
        
        <div
          style={{
            borderBottom: "1px solid gainsboro",
            padding: "5px 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            background: `linear-gradient(90deg , seagreen 50%, indigo)`,
            color: "white",
          }}
        >
          <div>asd</div>
        
          <span
            className="textWrap"
            style={{
              flexGrow: "1",
            }}
          >
            {homeName} _ {awayName}
          </span>
          <span
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {statusShort}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid gainsboro",
            zIndex: "10",
            padding: "10px",
            background: `linear-gradient(${homeColor}50 50%, ${awayColor}50 50%)`,
          }}
        >
          <div
            style={{
              position: "relative",
              marginLeft: "20px",
            }}
          >
            <img
              style={{
                position: "absolute",
                transform: "translate(-50%,-50%)",
              }}
              width={"50px"}
              src={`https://images.fotmob.com/image_resources/logo/teamlogo/${
                homeId === 8567 || homeId === 394243 || homeId === 5828
                  ? ""
                  : homeId
              }.png`}
              onError={(e) => {
                e.target.src = "/PICS/sheild.png";
                console.log("error and fix");
              }}
            />
          </div>
          <div
            style={{
              background:
                homeColor !== homeFont && homeColor !== "" ? homeColor : "grey",
              color:
                homeFont !== homeColor && homeFont !== "" ? homeFont : "grey",
        
              padding: "10px 10px 10px 30px",
            }}
            className="textWrap"
          >
            {homeName}
          </div>
        
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              background: "grey",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            {statusShort}
          </div>
        
          <div
            style={{
              background:
                awayColor !== awayFont && awayColor !== "" ? awayColor : "grey",
              color:
                awayFont !== awayColor && awayFont !== "" ? awayFont : "grey",
        
              padding: "10px 30px 10px 10px",
            }}
            className="textWrap"
          >
            {awayName}
          </div>
          <div
            style={{
              position: "relative",
              marginRight: "20px",
            }}
          >
            <img
              style={{
                position: "absolute",
                transform: "translate(-50%,-50%)",
              }}
              width={"50px"}
              src={`https://images.fotmob.com/image_resources/logo/teamlogo/${
                awayId === 8567 || awayId === 394243 || awayId === 5828
                  ? ""
                  : awayId
              }.png`}
              onError={(e) => {
                e.target.src = "/PICS/sheild.png";
                console.log("error and fix");
              }}
            />
          </div>
        </div>
        
        <div>
          {loading && resultes.table[0].data.table
            ? resultes.table[0].data.table.all.map((e, k) => {
                return (
                  <div
                    key={k}
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    <p
                      className={
                        homeId === e.id || awayId === e.id
                          ? "teamTwo"
                          : "team textWrap"
                      }
                    >
                      {e.name}
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
    </div> */}
    </>
  );
}
