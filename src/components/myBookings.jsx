import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import { Divider, Space, Tag } from "antd";
import Swal from "sweetalert2";
function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.post("/api/booking/getbokingbyuserid", {
          userid: user._id,
        });
        const bk = response.data;
        setBookings(bk);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        Swal.fire("Oops", "Something Went Wrong", "error");
      }
    }
    getData();
  }, []);
  async function cancelBooking(roomid, bookingid) {
    setLoading(true);
    try {
      const result = await axios.post("/api/booking/cancelbooking", {
        bookingid,
        roomid,
      }).data;
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Booking Has Been Cancelled",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops", "Something Went Wrong", "error");
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-7">
          {loading && <Loading />}{" "}
          {/* Use <Loading /> instead of <loading /> */}
          {Array.isArray(bookings) &&
            bookings.map((booking) => (
              <div key={booking._id}>
                <div className="bs">
                  <h1>{booking.room}</h1>

                  <p>
                    {" "}
                    <b>Booking ID:</b> {booking._id}
                  </p>
                  <p>
                    <b>CheckIn Day : </b>
                    {booking.fromdate}
                  </p>
                  <p>
                    <b>CheckOut Day :</b> {booking.todate}
                  </p>
                  <p>
                    <b>Amount : </b>
                    {booking.totalAmount}
                  </p>
                  <p>
                    <b>Status :</b>{" "}
                    {booking.status == "booked" ? (
                      <Tag color="green">Confirmed</Tag>
                    ) : (
                      <Tag color="red">Cancelled</Tag>
                    )}
                  </p>
                  <div className="d-flex justify-content-end">
                    {booking.status == "booked" && (
                      <button
                        className="btn btn-primary m-2"
                        onClick={() => {
                          cancelBooking(booking.roomid, booking._id);
                        }}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
