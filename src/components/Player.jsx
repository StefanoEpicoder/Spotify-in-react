import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

const Player = () => {
  const song = useSelector((state) => state.player.selectedSong);
  const coverSmall = song.album && song.album.cover_small;
  const title = song.title || "";
  const artistName = (song.artist && song.artist.name) || "";
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    console.log(song);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [song]);

  if (!song || song.length === 0) {
    return null;
  }

  return (
    <Container fluid className="fixed-bottom bg-container pt-md-1">
      <Row>
        <Col lg={3} className="d-flex align-items-center offset-md-2">
          <img src={coverSmall} alt="album cover" className="mr-3" style={{ width: '60px' }} />
          <div>
            <div className="font-weight-bold text-light">{title}</div>
            <div className='text-light'>{artistName}</div>
          </div>
        </Col>
        <Col lg={7}>
          <Row>
            <Col xs={12} md={8} lg={6} className="offset-md-3 mt-md-1" id="playerControls">
              <Row className="iconsImg justify-content-center">
                <Col xs={1} className="col-sm-1">
                  <a href="#">
                    <img src="/assets/images/playerbuttons/Shuffle.png" alt="shuffle" />
                  </a>
                </Col>
                <Col xs={1} className="col-sm-1">
                  <a href="#">
                    <img src="/assets/images/playerbuttons/Previous.png" alt="previous" />
                  </a>
                </Col>
                <Col xs={1} className="col-sm-1">
                  <a href="#" onClick={handlePlayPause}>
                    <img src={isPlaying ? "/assets/images/playerbuttons/Pause.png" : "/assets/images/playerbuttons/Play.png"} alt="play/pause" />
                  </a>
                </Col>
                <Col xs={1} className="col-sm-1">
                  <a href="#">
                    <img src="/assets/images/playerbuttons/Next.png" alt="next" />
                  </a>
                </Col>
                <Col xs={1} className="col-sm-1">
                  <a href="#">
                    <img src="/assets/images/playerbuttons/Repeat.png" alt="repeat" />
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="row justify-content-center py-3" id="playBar">
            <div className="col-12 col-md-8 col-lg-6">
              <div id="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
              </div>
            </div>
          </div>
          <audio ref={audioRef}>
            <source src={song.preview} type="audio/mpeg" />
          </audio>
        </Col>
      </Row>
    </Container>
  );
};

export default Player;
