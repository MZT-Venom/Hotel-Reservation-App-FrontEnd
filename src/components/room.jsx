import React, { useEffect, useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.images[0]} className="smallimg" />
      </div>
      <div className="col-md-7 text-left">
        <h1>{room.name}</h1>
        <div>
          <p>
            <b>Guest Count:</b> {room.maxCount}
          </p>
          <p>
            <b>Type:</b> {room.roomType}
          </p>
          <p>
            <b>Rent:</b> {room.rent}
          </p>
        </div>
        <div className="d-flex justify-content-end">
          {fromdate && todate && (
            <Link to={`/booking/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}
          <button className="btn btn-primary m-2" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.images.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="Room Image"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
