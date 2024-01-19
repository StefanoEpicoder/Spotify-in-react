import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";

const ArtistPage = () => {
  const params = useParams();
  const [artistToShow, setArtistToShow] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  let headers = new Headers({
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "cdd508a58emsh8bca2c9791d7152p1e459ejsn0027337ba1da",
  });

  const fetchSingleArtist = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${params.id}`, {
        method: "GET",
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        setArtistToShow(data);
        setDataLoaded(true);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopTracks = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistToShow.name}`, {
        method: "GET",
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        setTopTracks(data.data);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleArtist();
  }, [params.id]);

  useEffect(() => {
    if (artistToShow) {
      fetchTopTracks();
    }
  }, [artistToShow]);

  if (!artistToShow) {
    return <Alert variant="warning">Nessun artista!</Alert>;
  }

  return (
    <div className="col-12 col-md-9 offset-md-1" id="mainPage">
      <div className="row">
        <div className="col-12 col-md-10 mt-5">
          <h2 className="titleMain">{artistToShow.name}</h2>
          <div id="followers">{artistToShow.nb_fan} followers</div>
          <div className="d-flex justify-content-center flex-wrap" id="button-container">
            {dataLoaded && (
              <>
                <button className="btn btn-success mr-2 mainButton d-block" id="playButton">
                  PLAY
                </button>
                <button className="btn btn-outline-light mainButton d-block" id="followButton">
                  FOLLOW
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 p-0">
          <div className="mt-4 d-flex justify-content-start">
            <h2 className="text-white font-weight-bold">Tracks</h2>
          </div>
          <Row className="mt-3">
            {topTracks.map((track) => (
              <Col xs={12} sm={6} md={4} lg={3} className="mb-3" key={track.id}>
                <div className="mr-3 mb-3" key={track.id}>
                  <img src={track.album.cover_big} alt={track.album.title} className="img-fluid" />
                  <div className="d-flex flex-column">
                    <Link className="h5 text-light" to={"/album/" + track.album.id}>
                      Track:&nbsp;
                      {track.title}
                    </Link>
                    <Link className="h6 text-light" to={"/album/" + track.album.id}>
                      Album:&nbsp;
                      {track.album.title}
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
