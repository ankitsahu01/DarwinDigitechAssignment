import "./css/Login.css";
import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from '../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [eyeToggle, setEyeToggle] = useState(false);

  const handleChange = (e) => {
    let tagName = e.target.id;
    let value = e.target.value;
    setCredentials({ ...credentials, [tagName]: value });
  };

  const handleEye = () => {
    let pwd = document.getElementById("password");
    if (eyeToggle) {
      pwd.type = "password";
    } else {
      pwd.type = "text";
    }
    setEyeToggle(!eyeToggle);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // console.log(credentials);
    const res = await fetch("https://myphysio.digitaldarwin.in/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: credentials.username,
        password: credentials.password,
        blocked: 0,
      }),
    });
    if (res.status !== 200) {
      alert("Invalid credentials");
      return;
    }
    const data = await res.json();
    // console.log(data);
    localStorage.clear();
    localStorage.setItem("jwt", data.jwt);
    localStorage.setItem("jwt_data", JSON.stringify(jwt_decode(data.jwt)));
    localStorage.setItem("role", data.role);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("basic_info", JSON.stringify(data.basic_info));
    setCredentials({ username: "", password: "" });
    dispatch(login({...data, status:true}));
    // alert("Login Successful.");
  };

  return (
    <div className="container">
      <h1 className="title">Physioai</h1>
      <p className="welcome">Welcome Back!</p>
      <form className="login-form" onSubmit={submitForm}>
        <label className="required-label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Enter Username..."
          title="Enter Username"
          required
        />
        <label className="required-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter Password..."
          title="Enter Password"
          required
        />
        <span onClick={handleEye} className="eye">
          {eyeToggle ? <BiShow /> : <BiHide />}
        </span>
        <a href="/#">Forgot Password?</a>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
