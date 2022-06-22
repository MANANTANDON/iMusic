import React, { useState, useEffect } from "react";
import artistCard from "../VIEW/Artist.module.scss";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { AlertDialog } from "./Logout";
import playButton from "../../images/playButton.png";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
// import powerSwitch from "../images/powerButton5.png";

export const Artist = (props) => {
  const [searchArtist, setSearchArtist] = useState("");
  const [loggedUser, setLoggedUser] = useState("");

  const navigate = useNavigate();

  const zip = (a1, a2, a3, a4) => a1.map((x, i) => [x, a2[i], a3[i], a4[i]]);
  const newArray = zip(
    props.artists,
    props.artistImage,
    props.artistFollowers,
    props.artistsId
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        const userData = snapshot.data();
        setLoggedUser(userData.userName);
      }
    });
  }, []);
  // console.log(newArray);

  return (
    <React.Fragment>
      <div className={artistCard.TopContainer}>
        <div className={artistCard.welcomeUser}>
          Welcome, <span className={artistCard.textDeco}>{loggedUser}</span>
        </div>
        <div style={{ marginTop: "15px" }}>
          <AlertDialog />
        </div>
      </div>
      <div className={artistCard.searchBar}>
        <input
          type="text"
          placeholder="search artists.."
          onChange={(event) => {
            setSearchArtist(event.target.value);
            // console.log(searchArtist);
          }}
        />
      </div>
      <div className={artistCard.output}>
        {newArray.length > 0 ? (
          <>
            {newArray
              .filter((val) => {
                if (searchArtist === "") {
                  return val;
                } else if (
                  val[0].toLowerCase().includes(searchArtist.toLowerCase())
                ) {
                  return val;
                }
                return 0;
              })
              .map((artistName, index) => (
                <div key={index} className={artistCard.artistCard}>
                  <div className={artistCard.playCircle}>
                    <img
                      src={playButton}
                      alt=""
                      height="21px"
                      width="21px"
                      onClick={() => {
                        console.log(props.artistsId[index]);

                        props.sendDataToApp(
                          artistName[3],
                          artistName[1],
                          artistName[0],
                          artistName[2]
                        );
                        navigate("/albums");
                      }}
                    />
                  </div>
                  <img
                    src={artistName[1]}
                    alt=""
                    style={{ cursor: "pointer" }}
                    className={artistCard.titleCover}
                    onClick={() => {
                      console.log(props.artistsId[index]);

                      props.sendDataToApp(
                        artistName[3],
                        artistName[1],
                        artistName[0],
                        artistName[2]
                      );
                      navigate("/albums");
                    }}
                  />

                  <div className={artistCard.songTitle}>{artistName[0]}</div>
                </div>
              ))}{" "}
          </>
        ) : (
          " nothing to show"
        )}
      </div>
    </React.Fragment>
  );
};

/*
 REDIRECT_URL = https://localhost:3000, https%3A%2F%2Flocalhost%3A3000
 CLIENT_ID = 219920e764664a3dafb265f5cfc670a8
 CLIENT_SECRET = c4f7d9f36c8e401ead612876b205f8e4
 https://accounts.spotify.com/authorize?response_type=code&client_id=219920e764664a3dafb265f5cfc670a8&scope=playlist-modify-private&redirect_uri=https%3A%2F%2Flocalhost%3A3000

 code=AQDaAVZZ4j2_c6ShLMl9JsQ89PK5-jOlVZUSzROKQVkq9meObL-0oJyWVPA_3AV9_l-s1RJNQYLAkmZQrq6gXdYP_5loeuNHQQOwlwxVqNaJzxcWKxBPu14gJ7FN4YuMLKWPQ2MSW3OlPwgq9-WO-T4YMRrL3K51cSl-93K4AMJ6iuEBD5L-_Yi8ACivR_5UpMd1"

 curl -d client_id=219920e764664a3dafb265f5cfc670a8 -d client_secret=c4f7d9f36c8e401ead612876b205f8e4 -d grant_type=authorization_code -d code=AQCKUvszKFj76NCY4RRE5jatgrEg7SGFKEzhwRA8uZgRc8RxtCscDDy4FTxXAn5CCJwPrNw0zBrHMQB13xB-Q6AfvMi60E3tdEtjt_Iap9tsCJH8_YNaGt0BGkmtCZRjn0Ixsf_vXOnn0z1HTPkslrMF8fN6dKCye_0h9LHbUzwvIOiR-7j2jsnvUIlEz-rgeU8L -d redirect_uri=https%3A%2F%2Flocalhost%3A3000 https://accounts.spotify.com/api/token
*/
