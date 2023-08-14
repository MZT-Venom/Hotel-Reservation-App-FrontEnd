import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import Error from "./error";

function BookingAll() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [er, setEr] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/api/booking/getallbookings");
        const bk = response.data;
        setBookings(bk);

        // Fetch user names
        const usersResponse = await axios.get("/api/users/getallusers");
        const userMap = {};
        usersResponse.data.forEach((user) => {
          userMap[user._id] = user.name;
        });
        setUsers(userMap);

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
        <h3>Bookings</h3>
        {loading && <Loading />}
        <table className="table table-striped table-dark bs table-hover">
          <thead className="bs">
            <tr>
              <th scope="col">Booking ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Room</th>
              <th scope="col">CheckIn Date</th>
              <th scope="col">CheckOut Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{users[book.userid] || "Unknown User"}</td>
                <td>{book.room}</td>
                <td>{book.fromdate}</td>
                <td>{book.todate}</td>
                <td>{book.totalAmount}</td>
                <td>{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {er && <Error message={"An Error Occured....."} />}
      </div>
    </div>
  );
}

export default BookingAll;
