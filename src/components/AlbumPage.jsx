import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import SingleTrack from "./SingleTrack";

const AlbumPage = () => {
  const params = useParams();
  const [albumToShow, setAlbumToShow] = useState(null);

  let headers = new Headers({
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "cdd508a58emsh8bca2c9791d7152p1e459ejsn0027337ba1da",
  });

  const fetchAlbum = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${params.id}`, {
        method: "GET",
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAlbumToShow(data);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, [params.id]);

  return (
    <div>
      {albumToShow ? (
        <Container fluid id="mainPage">
          <Row>
            <Col md={3} className="pt-5 text-center" id="img-container">
              <img src={albumToShow.cover} className="card-img img-fluid" alt="Album" />
              <div className="mt-4 text-center">
                <p className="album-title">{albumToShow.title}</p>
              </div>
              <div className="text-center">
                <Link to={"/artist/" + albumToShow.artist.id} className="artist-name">
                  {albumToShow.artist.name}
                </Link>
              </div>
              <div className="mt-4 text-center">
                <button id="btnPlay" className="btn btn-success" type="button">
                  Play
                </button>
              </div>
            </Col>
            <Col md={8} className="p-md-5">
              <Row>
                <Col md={10} className="mb-5" id="trackList">
                  {albumToShow.tracks.data.map((track) => {
                    return <SingleTrack key={track.id} track={track} />;
                  })}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  );
};

export default AlbumPage;

// <div
//   className="py-3 trackHover"
//   onClick={() => {
//     dispatch({ type: "SELECT_SONG", payload: track });
//   }}
// >
//   <a
//     className="card-title trackHover px-3 m-0"
//     style={{ color: "white" }}
//   >
//     {track.title}
//   </a>
//   <div className="duration" style={{ color: "white" }}>
//     {Math.floor(
//       parseInt(track.duration) / 60 // setting the duration minutes
//     )}
//     :
//     {parseInt(track.duration) % 60 < 10
//       ? "0" + (parseInt(track.duration) % 60) // checking the duration seconds, if they are less than 10 a 0 is prefixed
//       : parseInt(track.duration) % 60}
//     <FaRegHeart className="text-light mx-3"/>
//     {/* {clicked ? (
//       <FaHeart color="gold" className="mx-3" onClick={handleClick} />
//     ) : (
//       <FaRegHeart
//         className="text-light mx-3"
//         onClick={handleClick}
//       />
//     )} */}
//   </div>
// </div>
