import React from "react";
import albumCard from "./Album.module.css";
import backArrow from "./universalImages/backArrow.png";
import { useNavigate } from "react-router-dom";

export const Albums = (props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className={albumCard.backbar}>
        <button onClick={() => navigate("/artist")}>
          <img src={backArrow} alt="" />
        </button>
      </div>
      <div className={albumCard.displayPictureContainer}>
        <img src={props.details.imageUrl} alt="" />
      </div>
      <div className={albumCard.displayCard}>
        {props.details.name}{" "}
        <div className={albumCard.follower}>
          {props.details.followers.toLocaleString("en-US")} followers
        </div>
      </div>
      <div className={albumCard.albumContainer}>
        {props.artistAlbum.slice(1).map((data, index) => (
          <div key={index} className={albumCard.albumTrack}>
            <div className={albumCard.albumArt}>
              <img
                src={data.albumImage}
                alt="albumcover"
                onClick={() => {
                  console.log(props.songsId[index]);
                  props.sendDataToApp(props.songsId[index]);
                  navigate("/tracks");
                }}
              />{" "}
              <div className={albumCard.albumTitle}>
                {data.albumTitle}
                <div className={albumCard.release}>
                  release: {data.releaseDate}
                </div>
                <div className={albumCard.ofTacks}>
                  {data.noOfTracks} tracks
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
