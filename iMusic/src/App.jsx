import React, { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Artist } from "./Component/MODEL/Artist";
import { Albums } from "./Component/MODEL/Albums";
import { Tracks } from "./Component/MODEL/Tracks";
import { LandingPage } from "./Component/MODEL/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./privateRoute/PrivateRoute";

const App = () => {
  const data = {
    access_token:
      "BQCrUdweMkpMIbK1x2saJu6HGUFdazD_ZzMRI-bqfuSgXamEZsnc3yr5OPP8qNm8ryrZKRrVXan5RDUhq6peuJA-9xe-nhhalGlPX86PYQWW8WggCUjfyDk5GTXlwS64TpGsOe1wUA5hoPvzDiz-eg4PrirkeJVF8Dx7VZk47uSgzqkJMaaVp6AOB7RSNkEYkkXdmJWzfnRiZnuzVT9dbyANA1HdeCQ19v_LPaGiiw",
    token_type: "Bearer",
    expires_in: 3600,
    refresh_token:
      "AQBZC9Mhl3hE76l5loTgGNJpHzH0DVC-2Qcqd4gQwPb6ZX-PO1dKnjxJEKAHzxmfVkVcvlALxuCuGoh7SpUIXFpSWUYTAoK-NDskPNBB74yHQv8u53s4FiUSFLWQc6m5jjM",
    scope: "playlist-modify-private",
  };

  const [artist, setArtist] = useState([]);
  const [images, setImages] = useState([]);
  const [id, setId] = useState([]);
  const [followers, setFollowers] = useState([]);

  const [albums, setAlbums] = useState([{}]);
  const [albumId, setAlbumId] = useState([]);
  const [albumName, setAlbumName] = useState([]);
  const [albumDate, setAlbumDate] = useState([]);
  const [noOfTracks, setNoOfTracks] = useState([]);
  const [totalAlbumLength, setTotalAlbumLength] = useState([]);

  const [artistDetails, setArtistDetails] = useState({});
  const [songs, setSongs] = useState([]);
  const [songsLength, setSongsLength] = useState([]);
  const [previewSong, setPreviewSong] = useState([]);
  const [albumArt, setAlbumArt] = useState([]);
  const [copyright, setCopyright] = useState([]);

  const [topTracks, setTopTracks] = useState([{}]);

  const artistId = [
    "3TVXtAsR1Inumwj472S9r4",
    "1Xyo4u8uXC1ZmMpatF05PJ",
    "1uNFoZAHBGtllmzznpCI3s",
    "246dkjvS1zLTtiykXe5h60",
    "66CXWjxzNUsdJxJ2JdwvnR",
    "6eUKZXaKkcviH0Ku9w2n3V",
    "6M2wZ9GZgrQXHCFfjv46we",
    "0C8ZW7ezQVs4URX5aX7Kqx",
    "2YZyLoL8N0Wb9xBt1NhZWg",
    "6DPYiyq5kWVQS4RGwxzPC7",
    "4tZwfgrHOc3mvqYlEYSvVi",
    "3nFkdlSjzX9mRTtwJOzDYB",
    "5K4W6rqBFWDnAN6FQUkS6x",
    "5cj0lLjcoR7YOSnhnX0Po5",
    "06HL4z0CvFAxyc27GXpf02",
    "1McMsnEElThX1knmY4oliG",
    "6VuMaDnrHyPL1p4EHjYLi7",
    "1h6Cn3P4NGzXbaXidqURXs",
    "7hJcb9fa4alzcOq3EaNPoG",
    "1RyvyyTE3xzB2ZywiAwp0i",
    "2LIk90788K0zvyj2JJVwkJ",
    "69GGBxA162lTqCwzJG5jLp",
    "4gzpq5DPGxSnKTe4SA8HAU",
    "04gDigrS5kc9YWfZHwBETP",
    "0Y5tJX1MQlPlqiwlOH1tJY",
    "7vk5e3vY1uw9plTHJAMwjN",
    "64KEffDW9EtZ1y2vBYgq8T",
    "7dGJo4pcD2V6oG8kP0tJRR",
    "0QHgL1lAIqAw0HtD7YldmP",
    "4fxd5Ee7UefO4CUXgwJ7IP",
    "6LuN9FCkKOj5PcnpouEgny",
    "4MCBfE4596Uoi2O4DtmEMz",
    "6qqNVTkY8uBg9cP3Jd7DAH",
    "3fMbdgg4jU18AjLCKBhRSm",
    "15UsOTVnJzReFVN1VCnxy4",
    "2tIP7SsRs7vjIcLrU85W8J",
    "6l3HvQ5sa6mXTsMTB19rO5",
    "6KImCVD70vtIoJWnq6nGn3",
    "6vXTefBL93Dj5IqAWq6OTv",
    "4q3ewBCX7sLwd24euuV69X",
    "4Uc8Dsxct0oMqx0P6i60ea",
    "0du5cEVh5yTK9QJze8zA0C",
    "7jVv8c5Fj3E9VhNjxT4snq",
    "540vIaP2JwjQb9dm3aArA4",
    "7c0XG5cIJTrrAgEC3ULPiq",
    "0z4gvV4rjIZ9wHck67ucSV",
    "7qG3b048QCHVRO5Pv1T5lw",
    "2HPaUgqeutzr3jx5a9WyDV",
    "0bdfiayQAKewqEvaU6rXCv",
    "6XyY86QOPPrYVGvF9ch6wz",
    "5rSXSAkZ67PYJSvpUpkOr7",
    "53XhwfbYqKCa1cC15pYq2q",
    "3jK9MiCrA42lLAdMGUZpwa",
  ];

  useEffect(() => {
    for (let i = 0; i < artistId.length; i++) {
      fetch(`https://api.spotify.com/v1/artists/${artistId[i]}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${data.access_token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          setArtist((old) => [...old, response.name]);
          setImages((old) => [...old, response.images[0].url]);
          setId((old) => [...old, response.id]);
          setFollowers((old) => [...old, response.followers.total]);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const getDataFromArtist = (albumId, imgUrl, artistName, artistFollowers) => {
    setAlbumId([]);
    setAlbums([{}]);
    setArtistDetails({});
    setTopTracks([{}]);

    //all the albumsss.......
    fetch(`https://api.spotify.com/v1/artists/${albumId}/albums`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        var filteredItems = response.items.filter(
          (v, i, a) => a.findIndex((v2) => v2.name === v.name) === i
        );
        console.log(filteredItems);
        for (let i = 0; i < filteredItems.length; i++) {
          // console.log(filteredItems[i].id);
          setAlbums((old) => [
            ...old,
            {
              albumTitle: filteredItems[i].name,
              albumImage: filteredItems[i].images[0].url,
              releaseDate: filteredItems[i].release_date,
              noOfTracks: filteredItems[i].total_tracks,
            },
          ]);

          setAlbumId((old) => [...old, filteredItems[i].id]);
        }
      })
      .catch((error) => console.log(error));

    fetch(
      `https://api.spotify.com/v1/artists/${albumId}/top-tracks?market=ES`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${data.access_token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        for (let i = 0; i < 5; i++) {
          console.log(response.tracks[i].preview_url);
          setTopTracks((old) => [
            ...old,
            {
              name: response.tracks[i].name,
              duration: millisToMinutesAndSeconds(
                response.tracks[i].duration_ms
              ),
              image: response.tracks[i].album.images[0].url,
              preview: response.tracks[i].preview_url,
            },
          ]);
        }
      });

    setArtistDetails({
      imageUrl: imgUrl,
      name: artistName,
      followers: artistFollowers,
    });
  };

  //for fetching album songs...
  const getDataFromAlbums = (albumId) => {
    setSongs([]);
    setPreviewSong([]);
    setSongsLength([]);
    setAlbumArt([]);
    setCopyright([]);
    setAlbumName([]);
    setNoOfTracks([]);
    setAlbumDate([]);
    fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setAlbumDate(response.release_date.split("-")[0]);
        setCopyright(response.copyrights[0].text);
        setAlbumArt(response.images[0].url);
        setAlbumName(response.name);
        setNoOfTracks(response.total_tracks);
        var total = 0;

        for (let i = 0; i < response.tracks.items.length; i++) {
          total += response.tracks.items[i].duration_ms;
          setPreviewSong((old) => [
            ...old,
            response.tracks.items[i].preview_url,
          ]);

          setSongs((old) => [...old, response.tracks.items[i].name]);
          setSongsLength((old) => [
            ...old,
            millisToMinutesAndSeconds(response.tracks.items[i].duration_ms),
          ]);
        }
        setTotalAlbumLength(msToTime(total));
      })
      .catch((e) => console.log(e));
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const msToTime = (duration) => {
    var minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    if (hours === "00") {
      return minutes + " minutes";
    } else {
      return hours + " hours " + minutes + " minutes ";
    }
  };

  return (
    <React.Fragment>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/artist"
                element={
                  <Artist
                    artists={artist}
                    artistImage={images}
                    artistsId={id}
                    artistFollowers={followers}
                    sendDataToApp={getDataFromArtist}
                  />
                }
              />
              <Route
                path="/albums"
                element={
                  <Albums
                    artistAlbum={albums}
                    songsId={albumId}
                    details={artistDetails}
                    toptracks={topTracks}
                    sendDataToApp={getDataFromAlbums}
                  />
                }
              />
              <Route
                path="/tracks"
                element={
                  <Tracks
                    albumSongs={songs}
                    albumSongLength={songsLength}
                    songPreview={previewSong}
                    songArt={albumArt}
                    albumCopyright={copyright}
                    songName={albumName}
                    songs={noOfTracks}
                    albumLength={totalAlbumLength}
                    albumDate={albumDate}
                  />
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;

//#Shivu@29
