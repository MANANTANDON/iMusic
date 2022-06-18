import React, { useState } from "react";
import artistCard from "./Artist.module.scss";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { AlertDialog } from "./Logout";
import playButton from "../images/playButton.png";
// import powerSwitch from "../images/powerButton5.png";

export const Artist = (props) => {
  const [searchArtist, setSearchArtist] = useState("");

  const navigate = useNavigate();

  const zip = (a1, a2, a3, a4) => a1.map((x, i) => [x, a2[i], a3[i], a4[i]]);
  const newArray = zip(
    props.artists,
    props.artistImage,
    props.artistFollowers,
    props.artistsId
  );
  // console.log(newArray);

  return (
    <React.Fragment>
      <div className={artistCard.searchBar}>
        <input
          type="text"
          placeholder="search artists.."
          onChange={(event) => {
            setSearchArtist(event.target.value);
            console.log(searchArtist);
          }}
        />
      </div>
      <div className={artistCard.power}>
        <AlertDialog />
      </div>
      {/* <div>
        <img
          src={powerSwitch}
          onClick={handleLogout}
          className={artistCard.power}
          height="90px"
        />
      </div> */}
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
                  console.log(val[0], val[1], val[2], val[3]);
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

 curl -d client_id=219920e764664a3dafb265f5cfc670a8 -d client_secret=c4f7d9f36c8e401ead612876b205f8e4 -d grant_type=authorization_code -d code=AQBMs8sFH7hC0of_gWBWPbUntOk1IHOwyZAwpcDWixA3oRiUj_sK5nlx0jVdImlR6QbRIL-5_Jn4Lci_r__fseJ2zFX5QPyJv43l0DDOspWe6dF6QcM4xoXBqT8meosDiCTBAsqEbfcdtu4PeOoULae3M0nKOcNDX8EA4657EM_e7ynvd7CopqRgkoLfxHDTADcn -d redirect_uri=https%3A%2F%2Flocalhost%3A3000 https://accounts.spotify.com/api/token
*/
