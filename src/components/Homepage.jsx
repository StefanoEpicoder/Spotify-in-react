import { Row } from "react-bootstrap";
import AlbumList from "./AlbumList";
import FetchAlbumsData from "./FetchAlbumsData";
import { useSelector } from "react-redux";
import SearchResults from "./SearchResults";
import { useEffect, useState } from "react";

const Home = () => {
  let rockArtists = [
    'queen',
    'arcticmonkeys',
    'thepolice',
    'linkinpark',
    'thelastshadowpuppets',
    'oasis',
    'thewho',
    'bonjovi',
  ]

  let popArtists = [
    'maroon5',
    'coldplay',
    'harrystyles',
    'taylorswift',
    'katyperry',
    'arianagrande',
  ]

  let hipHopArtists = [
    'eminem',
    'snoopdogg',
    'lilwayne',
    'drake',
    'kanyewest',
  ]
  const rockAlbums = FetchAlbumsData(rockArtists);
  const popAlbums = FetchAlbumsData(popArtists);
  const hiphopAlbums = FetchAlbumsData(hipHopArtists);

  const results = useSelector((state) => state.search.searchResults);
  
  useEffect(() => {
    console.log('ciao home')
  })

  return (
    <Row className="col-12 col-md-9" id="mainPage">
      <SearchResults results={results} />
      <AlbumList title="Rock Classics" albums={rockAlbums} />
      <AlbumList title="Pop Culture" albums={popAlbums} />
      <AlbumList title="#HipHop" albums={hiphopAlbums} />
    </Row>
  );
};

export default Home;
