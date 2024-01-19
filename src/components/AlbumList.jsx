import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AlbumList = ({ title, albums }) => (
  <div className="col-12 pb-3 mt-5">
    <h2 className="text-light">{title}</h2>
    <Row className="imgLinks py-3 d-flex justify-content-between">
      {albums.length > 0 &&
        albums.slice(0, 4).map((singleAlbum) => (
          <Col key={singleAlbum.album.id} xs={12} md={6} lg={3} className="mb-3">
            <div>
              <img
                src={singleAlbum.album.cover_medium}
                alt={singleAlbum.album.title}
                className="img-fluid"
              />
              <div className="d-flex flex-column">
                <Link
                  className="h5 text-light"
                  to={"/album/" + singleAlbum.album.id}
                >
                  {singleAlbum.album.title}
                </Link>
                <Link
                  className="h6 text-light"
                  to={"/artist/" + singleAlbum.artist.id}
                >
                  {singleAlbum.artist.name}
                </Link>
              </div>
            </div>
          </Col>
        ))}
    </Row>
  </div>
);

export default AlbumList;