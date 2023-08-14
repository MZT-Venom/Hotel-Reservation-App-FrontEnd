import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import BookingAll from "../components/bookingAll";
import UserAll from "../components/userAll";
import RoomAll from "../components/roomsAll";
import AddRoom from "../components/addRoom";
const { TabPane } = Tabs;

function AdminPage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user.isAdmin) {
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }
  }, []);
  return (
    <div>
      <div
        className="ml-3 mt-3 mr-3 bs"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <div>
          <h1 className="text-center">
            <b>Admin Panel</b>
          </h1>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Bookings" key="1">
              <BookingAll />
            </TabPane>
            <TabPane tab="Users" key="2">
              <UserAll />
            </TabPane>
            <TabPane tab="Rooms" key="3">
              <RoomAll />
            </TabPane>
            <TabPane tab="Add Room" key="4">
              <AddRoom />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
