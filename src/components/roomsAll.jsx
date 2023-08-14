import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import Error from "./error";

function RoomAll() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [er, setEr] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        // Fetch user names
        const roomResponse = await axios.get("/api/rooms/getAllRooms");
        const data = roomResponse.data;
        setRooms(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setEr(true);
      }
    }
    getData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h3>Rooms</h3>
        {loading && <Loading />}
        <table className="table table-striped table-dark bs table-hover">
          <thead className="bs">
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">Room Name</th>
              <th scope="col">Max Count</th>
              <th scope="col">Rent Per Day</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room._id}</td>
                <td>{room.name}</td>
                <td>{room.maxCount}</td>
                <td>{room.rent}</td>
                <td>{room.roomType}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {er && <Error message={"An Error Occured....."} />}
      </div>
    </div>
  );
}

export default RoomAll;
