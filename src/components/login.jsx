import React, { useState,useEffect } from "react";
import axios from "axios";
import Loading from "../components/loading";
import Error from "../components/error";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (user) {
      localStorage.removeItem("currentUser");
    }
  }, []);

  async function login() {
    setError(false);
    const user = {
      email,
      password,
    };
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      setLoading(false);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div>
      {loading && <Loading />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bs">
          {error && <Error message={"Invalid Credentials"} />}
          <div className="">
            <h2>login</h2>
            <form action="#" method="post">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />{" "}
                Show Password
              </label>
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={login}
                >
                  login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
