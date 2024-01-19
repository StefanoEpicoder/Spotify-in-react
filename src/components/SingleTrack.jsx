import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";

const SingleTrack = (props) => {
  const track = props.track;
  const dispatch = useDispatch();
  let clicked = false;
  const favourites = useSelector((state) => state.favourites.favourites);

  if (favourites && favourites.length > 0) {
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id === track.id) {
        clicked = true;
        break;
      }
    }
  }
  const handleClick = () => {
    if (clicked) {
      dispatch({
        type: "REMOVE_FAVOURITE",
        payload: track,
      });
    } else {
      dispatch({
        type: "ADD_FAVOURITE",
        payload: track,
      });
    }
    console.log("track", track);
  };

  return (
    <Row className="py-3 trackHover">
      <Col
        xs={8}
        lg={10}
        className="card-title px-3 m-0 d-block"
        style={{ color: "white" }}
        onClick={() => {
          dispatch({ type: "SELECT_SONG", payload: track });
        }}
      >
        {track.title}
      </Col>
      <Col xs={2} lg={1} className="duration" style={{ color: "white" }}>
        {Math.floor(parseInt(track.duration) / 60)}:
        {parseInt(track.duration) % 60 < 10 ? "0" + (parseInt(track.duration) % 60) : parseInt(track.duration) % 60}
      </Col>
      <Col xs={2} lg={1}>
        {clicked ? (
          <FaHeart color="gold" className="ms-3" onClick={() => handleClick()} />
        ) : (
          <FaRegHeart className="text-light ms-3" onClick={() => handleClick()} />
        )}
      </Col>
    </Row>
  );
};

export default SingleTrack;
