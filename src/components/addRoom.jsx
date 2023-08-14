import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../components/loading";
function AddRoom() {
  const [name, setName] = useState();
  const [rent, setRent] = useState();
  const [maxCount, setMaxCount] = useState();
  const [roomType, setRoomType] = useState();
  const [description, setDescription] = useState();
  const [imageUrl1, setImageUrl1] = useState();
  const [imageUrl2, setImageUrl2] = useState();
  const [imageUrl3, setImageUrl3] = useState();
  const [loading, setLoading] = useState(false);

  async function add() {
    if (
      !name ||
      !rent ||
      !maxCount ||
      !roomType ||
      !description ||
      !imageUrl1 ||
      !imageUrl2 ||
      !imageUrl3
    ) {
      alert("All fields are required.");
      return;
    }
    setLoading(true);
    const newRoom = {
      name,
      maxCount,
      rent,
      images: [imageUrl1, imageUrl2, imageUrl3],
      roomType,
      description,
    };

    try {
      const result = await axios.post("/api/rooms/addroom", newRoom);
      const data = result.data;
      console.log(data);
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "New Room Has Been Added Successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops", "An Error Occured While Saving New Room", "error").then(
        (result) => {
          window.location.reload();
        }
      );
    }
  }

  return (
    <div className="row">
      {loading && <Loading />}
      <h3>Add Room</h3>
      <div className="col-md-5 mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control"
          placeholder="Rent Per Day"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control"
          placeholder="Maximum Number of Guests"
          value={maxCount}
          onChange={(e) => setMaxCount(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="col-md-5 mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Type of Room"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 1"
          value={imageUrl1}
          onChange={(e) => setImageUrl1(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 2"
          value={imageUrl2}
          onChange={(e) => setImageUrl2(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 3"
          value={imageUrl3}
          onChange={(e) => setImageUrl3(e.target.value)}
          required
        />

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={add}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;
