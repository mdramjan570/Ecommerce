import React, { useState } from "react";
import "./CSS/LoginSignup.css";
const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const login = async () => {
    let responData;
    await fetch("https://ecommerce-2x8d.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responData = data));
    if (responData.success) {
      localStorage.setItem("auth-token", responData.token);
      window.location.replace("/");
    } else {
      alert(responData.error);
    }
  };
  const signup = async () => {
    let responData;
    await fetch("https://ecommerce-2x8d.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responData = data));
    if (responData.success) {
      localStorage.setItem("auth-token", responData.token);
      window.location.replace("/");
    } else {
      alert(responData.error);
    }
  };

  const fromHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              value={formData.username}
              onChange={fromHandler}
              name="username"
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            onChange={fromHandler}
            value={formData.email}
            name="email"
            type="email"
            placeholder="Email Address"
          />
          <input
            onChange={fromHandler}
            value={formData.password}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account ?
            <span onClick={() => setState("Login")}> Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account ?
            <span onClick={() => setState("Sign Up")}> click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, i agree to the term of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
