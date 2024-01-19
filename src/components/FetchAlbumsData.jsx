import { useState, useEffect } from "react";

const FetchAlbumsData = (artists) => {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    let foundAlbums = [];
    let selectedArtists = [];

    while (selectedArtists.length < 4) {
      let artist = artists[Math.floor(Math.random() * artists.length)];
      if (!selectedArtists.includes(artist)) {
        selectedArtists.push(artist);
      }
    }
    for (let i = 0; i < selectedArtists.length; i++) {
      let artist = selectedArtists[i];

      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}&type=album`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          foundAlbums = foundAlbums.concat(data.data[0]);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (foundAlbums.length > 0) {
      setAlbums(foundAlbums);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return albums;
};

export default FetchAlbumsData;
