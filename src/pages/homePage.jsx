import React, { useState, useEffect } from "react";
import axios from "axios";
// import NavBar from "../components/navBar";
import Room from "../components/room";
import Loading from "../components/loading";
import Error from "../components/error";
import { DatePicker, Space } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [type, setType] = useState("all");
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getAllRooms")).data;
        // const data = await response.data;

        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  function filterByType(e) {
    setType(e);
    if (e === "all") {
      const tempRooms = duplicateRooms;

      setRooms(tempRooms);
    } else {
      const tempRooms = duplicateRooms.filter(
        (rooms) => rooms.roomType.toLowerCase() == e.toLowerCase()
      );
      setRooms(tempRooms);
    }
  }
  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((rooms) =>
      rooms.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setRooms(tempRooms);
  }
  function filterByDate(dates, dateStrings) {
    setFromdate(moment(dateStrings[0], "DD-MM-YYYY").format("DD-MM-YYYY"));
    setTodate(moment(dateStrings[1], "DD-MM-YYYY").format("DD-MM-YYYY"));

    var tempRooms = [];
    var available = false;
    for (var room of duplicateRooms) {
      available = false;
      if (room.currentBookings.length > 0) {
        for (var booking of room.currentBookings) {
          if (
            !(
              (moment(dateStrings[0], "DD-MM-YYYY").format("DD-MM-YYYY") <
                booking.fromdate &&
                moment(dateStrings[1], "DD-MM-YYYY").format("DD-MM-YYYY") >
                  booking.fromdate) ||
              (moment(dateStrings[0], "DD-MM-YYYY").format("DD-MM-YYYY") <
                booking.todate &&
                moment(dateStrings[1], "DD-MM-YYYY").format("DD-MM-YYYY") >
                  booking.todate)
            )
          ) {
            if (
              moment(dateStrings[0], "DD-MM-YYYY").format("DD-MM-YYYY") !==
                booking.fromdate &&
              moment(dateStrings[0], "DD-MM-YYYY").format("DD-MM-YYYY") !==
                booking.todate &&
              moment(dateStrings[1], "DD-MM-YYYY").format("DD-MM-YYYY") !==
                booking.fromdate &&
              moment(dateStrings[1], "DD-MM-YYYY").format("DD-MM-YYYY") !==
                booking.todate
            ) {
              available = true;
            }
          }
        }
      }
      if (available === true || room.currentBookings.length === 0) {
        tempRooms.push(room);
      }
      setRooms(tempRooms);
    }
  }

  const disabledDate = (current) => {
    // Disable dates that are before today
    return current && current < moment().startOf("day");
  };
  return (
    <div className="contianer">
      <div className="row align-items-sm-baseline mt-5">
        <div className="col-12 text-center">
          <div className="d-flex justify-content-center flex-wrap">
            <div className="col-md-10 mt-2 bs">
              <div className="row">
                {" "}
                {/* Add a new row container */}
                <div className="col-md-4 mt-2 ">
                  <RangePicker
                    format={"DD-MM-YYYY"}
                    onChange={filterByDate}
                    disabledDate={disabledDate}
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="search room"
                    value={searchkey}
                    onChange={(e) => {
                      setSearchkey(e.target.value);
                    }}
                    onKeyUp={filterBySearch}
                  />
                </div>
                <div className="col-md-4 mt-2">
                  <select
                    value={type}
                    onChange={(e) => {
                      filterByType(e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="delux">Delux</option>
                    <option value="non-delux">Non-Delux</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row align-items-sm-baseline mt-5">
        <div className="col-12 text-center">
          {loading ? (
            <Loading />
          ) : (
            <div className="d-flex justify-content-center flex-wrap">
              {rooms.map((roomloop) => (
                <div className="col-md-9 mt-2" key={roomloop.id}>
                  <Room room={roomloop} fromdate={fromdate} todate={todate} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
