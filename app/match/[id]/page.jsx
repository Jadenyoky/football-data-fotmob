"use client";
import { useEffect, useState } from "react";
import NavBottom from "../../components/Global/navBottom";
import styles from "./page.module.css";
import axios from "axios";
import moment from "moment";
import MatchDetails from "@/app/components/match-path/match";

export default function Match(p) {
  console.log(p);

  const [loading, setloading] = useState(false);
  const [resultes, setresults] = useState([]);
  // api matches
  let apiUrl = `https://www.fotmob.com/api/matchDetails?matchId=${p.params.id}`;
  
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

  const apiMatcheDetails = async () => {
    setloading(false);

    const apiA = await axios.request(optionsAlter);
    console.log(apiA.data);
    setresults(apiA.data);

    setloading(true);
  };
  const apiRefresh = async () => {
    const apiA = await axios.request(optionsAlter);
    setresults(apiA.data);
    console.log("Done");
  };

  if (resultes.ongoing === true) {
    setTimeout(() => {
      apiRefresh();
    }, 60 * 1000);
  }

  useEffect(() => {
    apiMatcheDetails();
  }, []);
  return (
    <>
      <title>
        {loading
          ? resultes.header
            ? `${resultes.header.teams[0].name} - ${resultes.header.teams[1].name}`
            : ""
          : "Loading ..."}
      </title>

      <div
        style={{
          marginBottom: "64px",
        }}
      >
        {loading ? (
          <div>
            <MatchDetails
              homeId={resultes.header.teams[0].id}
              homeName={resultes.header.teams[0].name}
              homeScore={resultes.header.teams[0].score}
              homeColor={resultes.general.teamColors.lightMode.home}
              homeFont={resultes.general.teamColors.fontLightMode.home}
              awayId={resultes.header.teams[1].id}
              awayName={resultes.header.teams[1].name}
              awayScore={resultes.header.teams[1].score}
              awayColor={resultes.general.teamColors.lightMode.away}
              awayFont={resultes.general.teamColors.fontLightMode.away}
              date={resultes.general.matchTimeUTCDate}
              status={
                resultes.header.status.cancelled ? (
                  resultes.header.status.reason.long
                ) : resultes.ongoing ? (
                  resultes.header.status.liveTime.short.slice(0, -1) >=
                  resultes.header.status.liveTime.maxTime ? (
                    `${resultes.header.status.liveTime.maxTime}+ ${
                      resultes.header.status.liveTime.short.slice(0, -1) -
                      resultes.header.status.liveTime.maxTime
                    }`
                  ) : (
                    resultes.header.status.liveTime.short
                  )
                ) : resultes.header.status.finished ? (
                  resultes.header.status.reason.long
                ) : (
                  <span>
                    {moment(resultes.general.matchTimeUTCDate).format(
                      "hh:mm A"
                    )}
                  </span>
                )
              }
              statusShort={
                resultes.header.status.cancelled ? (
                  resultes.header.status.reason.short
                ) : resultes.ongoing ? (
                  resultes.header.status.liveTime.short.slice(0, -1) >=
                  resultes.header.status.liveTime.maxTime ? (
                    `${resultes.header.status.liveTime.maxTime}+ ${
                      resultes.header.status.liveTime.short.slice(0, -1) -
                      resultes.header.status.liveTime.maxTime
                    }`
                  ) : (
                    resultes.header.status.liveTime.short
                  )
                ) : resultes.header.status.finished ? (
                  resultes.header.status.reason.short
                ) : (
                  <span>
                    {moment(resultes.general.matchTimeUTCDate).format(
                      "hh:mm A"
                    )}
                  </span>
                )
              }
              country={resultes.general.countryCode}
              leagueId={resultes.general.parentLeagueId}
              leagueName={resultes.general.leagueName}
              round={resultes.general.leagueRoundName}
              events={resultes.header.events}
            />
          </div>
        ) : (
          <div className="centred">
            <img width="200px" src="/PICS/scoreboard.gif" />
          </div>
        )}
      </div>

      <NavBottom />
    </>
  );
}
