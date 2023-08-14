import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Space, Tag } from "antd";

function MyProfile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href("/home");
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-7">
        <div className="bs">
          <h3>{user.name}</h3>
          <p>
            <b>User ID:</b> {user._id}
          </p>
          <p>
            <b>Email :</b> {user.email}
          </p>
          <p>
            <b>Admin Access :</b>{" "}
            {user.isAdmin ? (
              <Tag color="green">Yes</Tag>
            ) : (
              <Tag color="orange">No</Tag>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
