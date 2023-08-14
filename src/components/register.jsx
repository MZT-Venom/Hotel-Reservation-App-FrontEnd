import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/loading";
import Error from "../components/error";
import Success from "../components/sucess";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (user) {
      localStorage.removeItem("currentUser");
    }
  }, []);
  async function register() {
    setSuccess(false);
    setError(false);
    if (cpassword === password) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      console.log(user);
      try {
        setLoading(true);
        const response = await axios.post("/api/users/register", user);
        setLoading(false);
        setSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMsg = error.response.data.error;
          setErrorMessage(errorMsg);

          if (errorMsg === "Email already in use") {
            alert("Email Already Exists"); // Show alert for duplicate email
          }
        } else {
          setErrorMessage("An error occurred during registration");
        }

        setLoading(false);
        setError(true);
      }
    } else {
      alert("Password does not match");
    }
  }

  return (
    <div>
      {loading && <Loading />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 bs">
          {error && <Error message="An Error Occured..." />}
          {success && <Success message="Registeration Successsful" />}
          <div className="">
            <h2>Register</h2>
            <form action="#" method="post">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                className="form-control"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                required
              />
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />{" "}
                Show Passwords
              </label>
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={register}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
