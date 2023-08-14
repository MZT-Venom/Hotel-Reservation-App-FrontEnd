import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import Error from "./error";

function UserAll() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [er, setEr] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        // Fetch user names
        const usersResponse = await axios.get("/api/users/getallusers");
        const data = usersResponse.data;
        setUsers(data);

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
        <h3>Users</h3>
        {loading && <Loading />}
        <table className="table table-striped table-dark bs table-hover">
          <thead className="bs">
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin Access</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {er && <Error message={"An Error Occured....."} />}
      </div>
    </div>
  );
}

export default UserAll;
