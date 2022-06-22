import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tracksCard from "../VIEW/Tracks.module.css";
import backArrow from "../../images/backArrow.png";

export const Tracks = (props) => {
  const navigate = useNavigate();

  // console.log(props.albumSongs);
  // console.log(props.albumSongs.length);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          boxSizing: "border-box",
          backgroundImage: `url(${props.songArt})`,
          height: props.albumSongs.length < 3 ? "790px" : "",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            backdropFilter: "blur(30px)",
            boxShadow: "1440px -200px 400px 200px rgba(0,0,0,0.50) inset",
            height: props.albumSongs.length < 3 ? "790px" : "",
          }}
        >
          <div className={tracksCard.backbar}>
            <button
              onClick={() => {
                navigate("/albums");
              }}
            >
              <img src={backArrow} alt="" />
            </button>
          </div>
          <div style={{ opacity: "0", pointerEvents: "none" }}>
            Someting on top
          </div>
          <div className={tracksCard.songsContainer}>
            <div className={tracksCard.imageContainer}>
              <img
                src={props.songArt}
                height="300px"
                width="300px"
                alt=""
                // style={{ border: "2px solid green" }}
              />
              <div className={tracksCard.albumName}>
                {props.songName}
                <div className={tracksCard.noOfTracks}>
                  {props.songs} songs . {props.albumLength} . {props.albumDate}
                </div>
              </div>
            </div>
            {props.albumSongs.map((song, index) => (
              <div key={index}>
                <div className={tracksCard.song}>
                  <div className={tracksCard.songName}>
                    <div>{index + 1}</div>
                    <div className={tracksCard.name}>{song}</div>.
                    <div>{props.albumSongLength[index]}</div>
                  </div>
                  <audio controls>
                    <source src={props.songPreview[index]} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))}
            <div className={tracksCard.copyright}>{props.albumCopyright}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
