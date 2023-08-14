import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loading";
import Error from "../components/error";
import moment from "moment";
import Swal from "sweetalert2";
import StripeCheckout from "react-stripe-checkout";

function BookingPage({ match }) {
  const { roomid, fromdate, todate } = useParams();
  const [rooms, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const todate1 = moment(todate, "DD-MM-YYY");
  const fromdate1 = moment(fromdate, "DD-MM-YYY");
  const totalDays = moment.duration(todate1.diff(fromdate1)).asDays() + 1;

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }
    async function getData() {
      const params = { roomid: roomid };

      try {
        setLoading(true);
        // const params = { roomid: match.params.roomid };
        const data = (await axios.post("/api/rooms/getroombyid", params)).data;
        // const data = await response.data;

        setRoom(data); // Update the blogs state with the fetched data
        setTotalAmount(rooms.rent * totalDays);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    getData();
  }, []);
  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      rooms,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount: rooms.rent * totalDays,
      totalDays,
      token,
    };
    console.log(bookingDetails);
    try {
      setLoading(true);
      const result = await axios.post("/api/booking/book", bookingDetails);
      setLoading(false);
      Swal.fire(
        "Congratulations!",
        "Your Room Has Been Booked Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/home";
      });
    } catch (error) {
      setLoading(false);
      Swal.fire(
        "Woops",
        "An Error Occured While Booking Your Room",
        "error"
      ).then((result) => {
        window.location.href = "/bookings";
      });
    }
  }
  return (
    // <div>
    //   <h1>Room Id= {roomid}</h1>
    //   <h2>Name = {rooms.name}</h2>
    // </div>
    <div className="m-5">
      {loading ? (
        <Loading />
      ) : rooms ? (
        <div className="row  mt-5 bs">
          <div className="col-md-6">
            <h1>{rooms.name}</h1>
            <img src={rooms.images[0]} alt="Room Image" className="bigimg" />
          </div>
          <div className="col-md-6">
            <div style={{ textAlign: "right" }}>
              <b>
                <h1>Booking Details</h1>
                <hr />
                <p>
                  Name : {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>From Date : {fromdate}</p>
                <p>To Date : {todate}</p>
                <p>Max No. of Guests : {rooms.maxCount}</p>
              </b>
            </div>

            <div style={{ textAlign: "right" }}>
              <b>
                <h1>Amount</h1>
                <hr />
                <p>Total Days : {totalDays} </p>
                <p>Rent Per Day : {rooms.rent}</p>
                <p>Total Amount : {rooms.rent * totalDays}</p>
              </b>
            </div>
            <div style={{ float: "right" }}>
              <StripeCheckout
                token={onToken}
                amount={rooms.rent * totalDays * 100}
                currency="PKR"
                stripeKey="pk_test_51NeLZlFniPfFU8qjxpC6AdaRBUIDPjHZQJGA9b9fjB0lr2unT5o7DrjaTR7tD5ObrLlVnQh9hMpMZRBZy2vCgBcc00J8wJ2Vs5"
              >
                <button className="btn btn-primary">Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingPage;
