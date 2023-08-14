import React from "react";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import BookingPage from "./pages/bookingPage";
import RegisterForm from "./components/register";
import LoginForm from "./components/login";
import ProfilePage from "./pages/profilePage";
import AdminPage from "./pages/adminPage";
import LandingPage from "./pages/landingPage";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact element={<HomePage />} />
        <Route
          path="/booking/:roomid/:fromdate/:todate"
          exact
          element={<BookingPage />}
        />
        <Route path="/register" exact element={<RegisterForm />} />
        <Route path="/login" exact element={<LoginForm />} />
        <Route path="/profile" exact element={<ProfilePage />} />
        <Route path="/admin" exact element={<AdminPage />} />
        <Route path="/" exact element={<LandingPage />} />
      </Switch>
    </Router>
  );
}

export default Routes;
