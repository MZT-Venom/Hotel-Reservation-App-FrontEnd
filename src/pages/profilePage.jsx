import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import MyBookings from "../components/myBookings";
import MyProfile from "../components/myProfile";
const { TabPane } = Tabs;

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href("/home");
    }
  }, []);

  return (
    <div className="ml-3 mt-3" style={{ marginLeft: "10px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <MyProfile />
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
