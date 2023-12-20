"use client";
import NavBottom from "../../components/Global/navBottom";
import styles from "./page.module.css";
import Date from "../../components/matches-path/date";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Live(p) {
  console.log(p);

  const router = useRouter();
  const path = usePathname();

  const [loading, setloading] = useState(false);
  const [results, setresults] = useState([]);

  const [allLength, setallLength] = useState([]);
  const [live, setlive] = useState([]);
  const [finishLength, setfinishLength] = useState([]);
  const [timed, settimed] = useState([]);
  const [cancelLength, setcancelLength] = useState([]);

  const [searchcontent, setsearchcontent] = useState(false);
  const [ls, setls] = useState([]);
  // api matches
  // https://corsproxy.io/?[url]
  // https://api.allorigins.win/raw?url=[url]
  // https://thingproxy.freeboard.io/fetch/[url]
  let apiUrl = `https://www.fotmob.com/api/matches?date=${
    p.searchParams.date
      ? moment(p.searchParams.date).format("YYYYMMDD")
      : moment().format("YYYYMMDD")
  }`;

  const options = {
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

  const control = useRef();
  const apiMatches = async () => {
    setloading(false);

    const apiA = await axios.request(options);

    const j = apiA.data;
    console.log(j);

    const filter = j.leagues.filter((ele) => ele.ccode !== "ISR");
    // setresults(filter);

    // All Matches
    const allLength = filter.map((ele) => ele.matches).flatMap((x) => x);
    setallLength(allLength);

    // Live Matches
    const liveLeagues = _.filter(filter, {
      matches: [
        {
          status: {
            ongoing: true,
            cancelled: false,
          },
        },
      ],
    });

    const liveLength = liveLeagues
      .map((ele) => ele.matches)
      .flatMap((x) => x)
      .filter((ele) => ele.status.ongoing === true);
    setlive(liveLength);

    setresults(liveLeagues);
    console.log(liveLeagues);

    if (control.current.value !== "") {
      setls(
        liveLeagues.filter(
          (ele) =>
            ele.name.toLowerCase().includes(control.current.value) ||
            ele.ccode.toLowerCase().includes(control.current.value)
        )
      );
    }

    // Not Started Matches
    const timedLeagues = _.filter(filter, {
      matches: [
        {
          status: {
            started: false,
          },
        },
      ],
    });

    const timedLength = timedLeagues
      .map((ele) => ele.matches)
      .flatMap((x) => x)
      .filter(
        (ele) => ele.status.started === false && ele.status.cancelled === false
      );
    settimed(timedLength);

    // Finished Matches
    const finishLeagues = _.filter(filter, {
      matches: [
        {
          status: {
            finished: true,
          },
        },
      ],
    });

    const finishLength = finishLeagues
      .map((ele) => ele.matches)
      .flatMap((x) => x)
      .filter(
        (ele) => ele.status.finished === true && ele.status.cancelled === false
      );
    setfinishLength(finishLength);

    // Cancelled Matches
    const cancelLength = filter
      .map((ele) => ele.matches)
      .flatMap((x) => x)
      .filter((ele) => ele.status.cancelled === true);
    setcancelLength(cancelLength);

    setloading(true);
  };

  const apiRefresh = async () => {
    // console.log("start refresh");
    const apiA = await axios.request(options);

    const j = apiA.data;
    console.log(j);

    const filter = j.leagues.filter((ele) => ele.ccode !== "ISR");
    // setresults(filter);

    // All Matches
    const allLength = filter.map((ele) => ele.matches).flatMap((x) => x);
    setallLength(allLength);

    // Live Matches
    const liveLeagues = _.filter(filter, {
      matches: [
        {
          status: {
            ongoing: true,
            cancelled: false,
          },
        },
      ],
    });

    const liveLength = liveLeagues
      .map((ele) => ele.matches)
      .flatMap((x) => x)
      .filter((ele) => ele.status.ongoing === true);
    setlive(liveLength);

    setresults(liveLeagues);

    if (control.current.value !== "") {
      setls(
        liveLeagues.filter(
          (ele) =>
            ele.name.toLowerCase().includes(control.current.value) ||
            ele.ccode.toLowerCase().includes(control.current.value)
        )
      );
    }

    // Not Started Matches
    const timedLeagues = _.filter(filter, {
      matches: [
        {
          status: {
            started: false,
          },
        },
      ],
    });

    const timedLength = timedLeagues
      .map((ele) => ele.matches)
      .flatMap((x) => x)
      .filter(
        (ele) => ele.status.started === false && ele.status.cancelled === false
      );
    settimed(timedLength);

    // Finished Matches
    const finishLeagues = _.filter(filter, {
      matches: [
        {
          status: {
            finished: true,
          },
        },
      ],
    });

    const finishLength = finishLeagues
      .map((ele) => ele.matches)
      .flatMap((x) => x)
      .filter(
        (ele) => ele.status.finished === true && ele.status.cancelled === false
      );
    setfinishLength(finishLength);

    // Cancelled Matches
    const cancelLength = filter
      .map((ele) => ele.matches)
      .flatMap((x) => x)
      .filter((ele) => ele.status.cancelled === true);
    setcancelLength(cancelLength);
  };

  useEffect(() => {
    apiMatches();
    let counter = 0;
    const interval = setInterval(() => {
      apiRefresh();
      console.log(`Update Times : ${counter++}`);
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <title>
        {`
        ${moment(p.searchParams.date).calendar(null, {
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "DD/MM/YYYY",
        })} - Live Matches
        `}
      </title>

      <Date dd={p.searchParams.date} />
      {/* Matches */}

      <div
        style={{
          background: "#52b788",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "10px",
            width: "400px",
            maxWidth: "90%",
            borderRadius: "20px",
            fontSize: "17px",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <i className="fi fi-rs-search"></i>
          <input
            ref={control}
            style={{
              width: "90%",
              outline: "none",
              border: "0",
              fontSize: "17px",
            }}
            type="search"
            placeholder="Search By - Tournament or Country Code"
            onChange={(e) => {
              console.log(e.target.value);
              let val = e.target.value;
              if (val !== "") {
                setsearchcontent(true);
                document.body.style.overflow = "hidden";

                console.log(e.target.value);

                setls(
                  results.filter(
                    (ele) =>
                      ele.name.toLowerCase().includes(val) ||
                      ele.ccode.toLowerCase().includes(val)
                  )
                );

                console.log(ls);
              } else {
                setsearchcontent(false);
                document.body.style.overflow = "auto";
                setls([]);
              }
            }}
            onClick={() => {
              setsearchcontent(true);
              document.body.style.overflow = "hidden";
            }}
          />
        </div>
      </div>

      {searchcontent ? (
        <div
          style={{
            position: "relative",
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "calc(100% - 180px)",
              background: "#00000010",
              overflow: "auto",
            }}
          >
            <div
              style={{
                padding: "20px",
                display: "grid",
                gap: "20px",
              }}
              className="animate__animated animate__fadeIn"
            >
              {ls.length > 0 ? (
                ls.map((e, k) => {
                  return (
                    <div key={k}>
                      <div
                        className="animate__animated animate__fadeIn"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "70px auto",
                          gap: "20px",
                          justifyContent: "start",
                          borderBottom: "5px solid gainsboro",
                          padding: "0 10px",
                          borderRadius: "20px",
                          background: "aliceblue",
                        }}
                      >
                        <div
                          style={{
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src={`https://images.fotmob.com/image_resources/logo/teamlogo/${e.ccode.toLowerCase()}.png`}
                            width="30px"
                          />
                          <p className="textWrap">{e.ccode}</p>
                        </div>
                        <div
                          style={{
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${e.primaryId}.png`}
                            width="30px"
                          />
                          <p className="textWrap">{e.name}</p>
                        </div>
                      </div>

                      <div className="animate__animated animate__fadeIn">
                        {e.matches
                          .filter(
                            (ele) =>
                              (ele.away.name === "Israel" ||
                              ele.away.name === "Israel (W)" ||
                              ele.away.name === "Israel U21"
                                ? (ele.away.name = "Zionist")
                                : (ele && ele.home.name === "Israel") ||
                                  ele.home.name === "Israel (W)" ||
                                  ele.home.name === "Israel U21"
                                ? (ele.home.name = "Zionist")
                                : ele) && ele.status.ongoing === true
                          )
                          .map((e, k) => {
                            return (
                              <div key={k}>
                                <div
                                  style={{
                                    border: "1px solid gainsboro",
                                    // marginBottom: "-10px",
                                    marginTop: "10px",
                                    borderRadius: "20px",
                                    padding: "5px 10px",
                                    maxWidth: "120px",
                                  }}
                                >
                                  Round : {e.tournamentStage}
                                </div>

                                <div
                                  style={{
                                    border: "1px solid gainsboro",
                                    display: "grid",
                                    gridTemplateColumns: "130px 100px",
                                    // window.innerWidth < 600
                                    //   ? "130px 100px"
                                    //   : "300px 100px",
                                    gap: "10px",
                                    alignItems: "center",
                                    borderRadius: "20px",
                                    justifyContent: "space-evenly",
                                    // window.innerWidth < 600
                                    //   ? "space-evenly"
                                    //   : "center",
                                    paddingLeft: "20px",
                                    margin: "10px 0",
                                    position: "relative",
                                    cursor: "pointer",
                                    background: e.status.cancelled
                                      ? "crimson"
                                      : e.status.ongoing
                                      ? "seagreen"
                                      : e.status.finished
                                      ? "indigo"
                                      : "white",
                                    color: e.status.cancelled
                                      ? "white"
                                      : e.status.ongoing
                                      ? "white"
                                      : e.status.finished
                                      ? "white"
                                      : "grey",
                                  }}
                                  onClick={() => {
                                    router.push(`/match/${e.id}`);
                                  }}
                                  className="hvr-float-shadow"
                                  // data-name={`${e.home.name} - ${e.away.name}`}
                                  // className="selectMatch"
                                >
                                  <div
                                    style={{
                                      overflow: "hidden",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <img
                                        src={`https://images.fotmob.com/image_resources/logo/teamlogo/${
                                          e.home.id === 8567 ||
                                          e.home.id === 394243 ||
                                          e.home.id === 5828
                                            ? ""
                                            : e.home.id
                                        }.png`}
                                        onError={(e) => {
                                          e.target.src = "/PICS/sheild.png";
                                          console.log("error and fix");
                                        }}
                                        width="30px"
                                      />
                                      <p className="textWrap">{e.home.name}</p>
                                    </div>
                                    <div
                                      style={{
                                        height: "1px",
                                        width: "50%",
                                        backgroundColor: "gainsboro",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <img
                                        src={`https://images.fotmob.com/image_resources/logo/teamlogo/${
                                          e.away.id === 8567 ||
                                          e.away.id === 394243 ||
                                          e.away.id === 5828
                                            ? ""
                                            : e.away.id
                                        }.png`}
                                        onError={(e) => {
                                          e.target.src = "/PICS/sheild.png";
                                          console.log("error and fix");
                                        }}
                                        width="30px"
                                      />
                                      <p className="textWrap">{e.away.name}</p>
                                    </div>
                                  </div>
                                  {e.status.cancelled ? (
                                    <div
                                      style={{
                                        borderLeft: "1px solid gainsboro",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        justifyContent: "center",
                                        alignItems: "end",
                                      }}
                                    >
                                      <span>
                                        {moment(e.timeTS).format("hh:mm A")}
                                      </span>
                                      <div
                                        style={{
                                          height: "1px ",
                                          width: "50%",
                                          background: "gainsboro",
                                        }}
                                      ></div>
                                      <span>{e.status.reason.long}</span>
                                    </div>
                                  ) : e.status.ongoing ? (
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        height: "100%",
                                        placeItems: "center",
                                        gap: "10px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          textAlign: "center",
                                          borderRight: "1px solid gainsboro",
                                          borderLeft: "1px solid gainsboro",
                                          background: "gray",
                                        }}
                                      >
                                        <p>
                                          {e.home.score}
                                          {e.home.penScore
                                            ? e.home.penScore
                                            : null}
                                        </p>
                                        <div
                                          style={{
                                            height: "1px",
                                            width: "50px",
                                            backgroundColor: "gainsboro",
                                          }}
                                        ></div>
                                        <p>
                                          {e.away.score}
                                          {e.away.penScore
                                            ? e.away.penScore
                                            : null}
                                        </p>
                                      </div>
                                      <div>
                                        <p
                                          style={{
                                            color: "greenyellow",
                                            textAlign: "center",
                                          }}
                                          className="time"
                                        >
                                          {e.status.liveTime.short.slice(
                                            0,
                                            -1
                                          ) >= e.status.liveTime.maxTime
                                            ? `${e.status.liveTime.maxTime}+ ${
                                                e.status.liveTime.short.slice(
                                                  0,
                                                  -1
                                                ) - e.status.liveTime.maxTime
                                              }`
                                            : e.status.liveTime.short}
                                        </p>
                                      </div>
                                    </div>
                                  ) : e.status.finished ? (
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        height: "100%",
                                        placeItems: "center",
                                        gap: "10px",
                                        background: "indigo",
                                        borderRadius: "20px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          textAlign: "center",
                                          borderRight: "1px solid gainsboro",
                                          borderLeft: "1px solid gainsboro",
                                          background: "seagreen",
                                        }}
                                      >
                                        <p>
                                          {e.home.score}{" "}
                                          {e.home.penScore
                                            ? `( ${e.home.penScore} )`
                                            : null}
                                        </p>
                                        <div
                                          style={{
                                            height: "1px",
                                            width: "50px",
                                            backgroundColor: "gainsboro",
                                          }}
                                        ></div>
                                        <p>
                                          {e.away.score}{" "}
                                          {e.away.penScore
                                            ? `( ${e.away.penScore} )`
                                            : null}
                                        </p>
                                      </div>

                                      {e.status.reason.short === "Pen" ? (
                                        <div>
                                          <span>FT</span>
                                          <div
                                            style={{
                                              height: "1px",
                                              width: "100%",
                                              background: "gainsboro",
                                              margin: "10px 0",
                                              padding: "0",
                                            }}
                                          ></div>
                                          <span>PEN</span>
                                        </div>
                                      ) : (
                                        <div>
                                          <p>FT</p>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        borderLeft: "1px solid gainsboro",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        justifyContent: "center",
                                        alignItems: "end",
                                        textAlign: "end",
                                      }}
                                    >
                                      <span>
                                        {moment(e.timeTS).format("hh:mm A")}
                                      </span>
                                      <div
                                        style={{
                                          height: "1px ",
                                          width: "50%",
                                          background: "gainsboro",
                                        }}
                                      ></div>
                                      <span>{moment(e.timeTS).fromNow()}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "grey",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  <p>No Results here ..</p>
                  <div
                    style={{
                      width: "fit-content",
                      color: "#8659A5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setsearchcontent(false);
                      document.body.style.overflow = "auto";
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        padding: "0 5px",
                        border: "2px solid gainsboro",
                        borderRadius: "10px 0 0 0",
                      }}
                    >
                      <img width="25px" src="/PICS/left-arrow.png" />
                    </div>

                    <span
                      style={{
                        background: "white",
                        padding: "5px 10px",
                        border: "2px solid gainsboro",

                        borderRadius: "0px 0 10px 0px",
                      }}
                    >
                      Back
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className="status">
          {allLength.length > 0 ? (
            <div
              style={{
                borderRadius: "20px",
                margin: "5px",
                cursor: "pointer",
                padding: "5px 10px",
                width: "fit-content",
                // border: "2px solid white",
                transition: "0.2s",
              }}
              onClick={() => {
                router.push(
                  `/matches/${moment(p.searchParams.date).format("YYYY-MM-DD")}`
                );
              }}
              className="status-all"
            >
              All ( {allLength.length} ){" "}
            </div>
          ) : (
            ""
          )}
          {live.length > 0 ? (
            <div
              style={{
                borderRadius: "20px",
                margin: "5px",
                cursor: "pointer",
                padding: "5px 10px",
                width: "fit-content",
                // border: "2px solid white",
                transition: "0.2s",
              }}
              onClick={() => {
                router.push(
                  `/status/live?date=${moment(p.searchParams.date).format(
                    "YYYY-MM-DD"
                  )}`
                );
              }}
              className="status-live-plus"
            >
              Live ( {live.length} ){" "}
            </div>
          ) : (
            ""
          )}
          {timed.length > 0 ? (
            <div
              style={{
                borderRadius: "20px",
                margin: "5px",
                cursor: "pointer",
                padding: "5px 10px",
                width: "fit-content",
                // border: "2px solid white",
                transition: "0.2s",
              }}
              onClick={() => {
                router.push(
                  `/status/timed?date=${moment(p.searchParams.date).format(
                    "YYYY-MM-DD"
                  )}`
                );
              }}
              className="status-timed"
            >
              Timed ( {timed.length} ){" "}
            </div>
          ) : (
            ""
          )}
          {finishLength.length > 0 ? (
            <div
              style={{
                borderRadius: "20px",
                margin: "5px",
                cursor: "pointer",
                padding: "5px 10px",
                width: "fit-content",
                // border: "2px solid white",
                transition: "0.2s",
              }}
              onClick={() => {
                router.push(
                  `/status/finish?date=${moment(p.searchParams.date).format(
                    "YYYY-MM-DD"
                  )}`
                );
              }}
              className="status-finished"
            >
              Finished ( {finishLength.length} ){" "}
            </div>
          ) : (
            ""
          )}

          {cancelLength.length > 0 ? (
            <div
              style={{
                borderRadius: "20px",
                margin: "5px",
                cursor: "pointer",
                padding: "5px 10px",
                width: "fit-content",
                // border: "2px solid white",
                transition: "0.2s",
              }}
              onClick={() => {
                router.push(
                  `/status/cancel?date=${moment(p.searchParams.date).format(
                    "YYYY-MM-DD"
                  )}`
                );
              }}
              className="status-cancel"
            >
              Cancel ( {cancelLength.length} ){" "}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div
          style={{
            padding: "20px",
            marginBottom: "64px",
            display: "grid",
            gap: "20px",
          }}
        >
          {results.map((e, k) => {
            return (
              <div key={k}>
                <div
                  className="animate__animated animate__fadeIn"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "70px auto",
                    gap: "20px",
                    justifyContent: "start",
                    borderBottom: "5px solid gainsboro",
                    padding: "0 10px",
                    borderRadius: "20px",
                    background: "aliceblue",
                  }}
                >
                  <div
                    style={{
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={`https://images.fotmob.com/image_resources/logo/teamlogo/${e.ccode.toLowerCase()}.png`}
                      width="30px"
                    />
                    <p className="textWrap">{e.ccode}</p>
                  </div>
                  <div
                    style={{
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${e.primaryId}.png`}
                      width="30px"
                    />
                    <p className="textWrap">{e.name}</p>
                  </div>
                </div>

                <div className="animate__animated animate__fadeIn">
                  {e.matches
                    .filter(
                      (ele) =>
                        (ele.away.name === "Israel" ||
                        ele.away.name === "Israel (W)" ||
                        ele.away.name === "Israel U21"
                          ? (ele.away.name = "Zionist")
                          : (ele && ele.home.name === "Israel") ||
                            ele.home.name === "Israel (W)" ||
                            ele.home.name === "Israel U21"
                          ? (ele.home.name = "Zionist")
                          : ele) && ele.status.ongoing === true
                    )
                    .map((e, k) => {
                      return (
                        <div key={k}>
                          <div
                            style={{
                              border: "1px solid gainsboro",
                              // marginBottom: "-10px",
                              marginTop: "10px",
                              borderRadius: "20px",
                              padding: "5px 10px",
                              maxWidth: "120px",
                            }}
                          >
                            Round : {e.tournamentStage}
                          </div>

                          <div
                            style={{
                              border: "1px solid gainsboro",
                              display: "grid",
                              gridTemplateColumns: "130px 100px",
                              // window.innerWidth < 600
                              //   ? "130px 100px"
                              //   : "300px 100px",
                              gap: "10px",
                              alignItems: "center",
                              borderRadius: "20px",
                              justifyContent: "space-evenly",
                              // window.innerWidth < 600
                              //   ? "space-evenly"
                              //   : "center",
                              paddingLeft: "20px",
                              margin: "10px 0",
                              position: "relative",
                              cursor: "pointer",
                              background: e.status.cancelled
                                ? "crimson"
                                : e.status.ongoing
                                ? "seagreen"
                                : e.status.finished
                                ? "indigo"
                                : "white",
                              color: e.status.cancelled
                                ? "white"
                                : e.status.ongoing
                                ? "white"
                                : e.status.finished
                                ? "white"
                                : "grey",
                            }}
                            onClick={() => {
                              router.push(`/match/${e.id}`);
                            }}
                            className="hvr-float-shadow"
                            // data-name={`${e.home.name} - ${e.away.name}`}
                            // className="selectMatch"
                          >
                            <div
                              style={{
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={`https://images.fotmob.com/image_resources/logo/teamlogo/${
                                    e.home.id === 8567 ||
                                    e.home.id === 394243 ||
                                    e.home.id === 5828
                                      ? ""
                                      : e.home.id
                                  }.png`}
                                  onError={(e) => {
                                    e.target.src = "/PICS/sheild.png";
                                    console.log("error and fix");
                                  }}
                                  width="30px"
                                />
                                <p className="textWrap">{e.home.name}</p>
                              </div>
                              <div
                                style={{
                                  height: "1px",
                                  width: "50%",
                                  backgroundColor: "gainsboro",
                                }}
                              ></div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={`https://images.fotmob.com/image_resources/logo/teamlogo/${
                                    e.away.id === 8567 ||
                                    e.away.id === 394243 ||
                                    e.away.id === 5828
                                      ? ""
                                      : e.away.id
                                  }.png`}
                                  onError={(e) => {
                                    e.target.src = "/PICS/sheild.png";
                                    console.log("error and fix");
                                  }}
                                  width="30px"
                                />
                                <p className="textWrap">{e.away.name}</p>
                              </div>
                            </div>
                            {e.status.cancelled ? (
                              <div
                                style={{
                                  borderLeft: "1px solid gainsboro",
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                  justifyContent: "center",
                                  alignItems: "end",
                                }}
                              >
                                <span>
                                  {moment(e.timeTS).format("hh:mm A")}
                                </span>
                                <div
                                  style={{
                                    height: "1px ",
                                    width: "50%",
                                    background: "gainsboro",
                                  }}
                                ></div>
                                <span>{e.status.reason.long}</span>
                              </div>
                            ) : e.status.ongoing ? (
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  height: "100%",
                                  placeItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <div
                                  style={{
                                    textAlign: "center",
                                    borderRight: "1px solid gainsboro",
                                    borderLeft: "1px solid gainsboro",
                                    background: "gray",
                                  }}
                                >
                                  <p>
                                    {e.home.score}{" "}
                                    {e.home.penScore
                                      ? `( ${
                                          e.home.penScore > 0
                                            ? e.home.penScore
                                            : 0
                                        } )`
                                      : null}
                                  </p>
                                  <div
                                    style={{
                                      height: "1px",
                                      width: "50px",
                                      backgroundColor: "gainsboro",
                                    }}
                                  ></div>
                                  <p>
                                    {e.away.score}{" "}
                                    {e.away.penScore
                                      ? `( ${
                                          e.away.penScore > 0
                                            ? e.away.penScore
                                            : 0
                                        } )`
                                      : null}
                                  </p>
                                </div>
                                <div>
                                  <p
                                    style={{
                                      color: "greenyellow",
                                      textAlign: "center",
                                    }}
                                    className="time"
                                  >
                                    {e.status.liveTime.short.slice(0, -1) >=
                                    e.status.liveTime.maxTime
                                      ? `${e.status.liveTime.maxTime}+ ${
                                          e.status.liveTime.short.slice(0, -1) -
                                          e.status.liveTime.maxTime
                                        }`
                                      : e.status.liveTime.short}
                                  </p>
                                </div>
                              </div>
                            ) : e.status.finished ? (
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  height: "100%",
                                  placeItems: "center",
                                  gap: "10px",
                                  background: "indigo",
                                  borderRadius: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    textAlign: "center",
                                    borderRight: "1px solid gainsboro",
                                    borderLeft: "1px solid gainsboro",
                                    background: "seagreen",
                                  }}
                                >
                                  <p>
                                    {e.home.score}{" "}
                                    {e.home.penScore
                                      ? `( ${e.home.penScore} )`
                                      : null}
                                  </p>
                                  <div
                                    style={{
                                      height: "1px",
                                      width: "50px",
                                      backgroundColor: "gainsboro",
                                    }}
                                  ></div>
                                  <p>
                                    {e.away.score}{" "}
                                    {e.away.penScore
                                      ? `( ${e.away.penScore} )`
                                      : null}
                                  </p>
                                </div>

                                {e.status.reason.short === "Pen" ? (
                                  <div>
                                    <span>FT</span>
                                    <div
                                      style={{
                                        height: "1px",
                                        width: "100%",
                                        background: "gainsboro",
                                        margin: "10px 0",
                                        padding: "0",
                                      }}
                                    ></div>
                                    <span>PEN</span>
                                  </div>
                                ) : (
                                  <div>
                                    <p>FT</p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div
                                style={{
                                  borderLeft: "1px solid gainsboro",
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                  justifyContent: "center",
                                  alignItems: "end",
                                  textAlign: "end",
                                }}
                              >
                                <span>
                                  {moment(e.timeTS).format("hh:mm A")}
                                </span>
                                <div
                                  style={{
                                    height: "1px ",
                                    width: "50%",
                                    background: "gainsboro",
                                  }}
                                ></div>
                                <span>{moment(e.timeTS).fromNow()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="centred">
          <img width="200px" src="/PICS/scoreboard.gif" />
        </div>
      )}

      {/* Matches */}
      <NavBottom />
    </>
  );
}
