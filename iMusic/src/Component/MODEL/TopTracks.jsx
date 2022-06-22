import React, { useEffect } from "react";
import toptracksCard from "../VIEW/TopTracks.module.css";

export const TopTracks = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <div className={toptracksCard.text}>TOP TRACKS</div>
      <div className={toptracksCard.topTrackContainter}>
        {props.tracks.slice(1).map((value, index) => (
          <div key={index}>
            <div className={toptracksCard.topTrackRow}>
              <img src={value.image} alt="" height="90px" width="90px" />
              <div className={toptracksCard.trackName}>{value.name}</div>
              <div className={toptracksCard.trackDuration}>
                . {value.duration}
              </div>
              <audio controls>
                <source src={value.preview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
