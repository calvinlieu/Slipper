import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import TwitterLogo from "./twitterlogo.svg";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onLogin}>
        <div className="sign-in-icon">
          <img className="twitter-icon-sign-in" alt="" src={TwitterLogo} />
        </div>
        <p className="sign-in-header">Sign in to Slipper</p>
        <div className="login-error">
          {errors.map((error, ind) => (
            <div key={ind}>{error.split(":")[1]}</div>
          ))}
        </div>
        <div>
          <input
            className="email-sign-in-input"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <input
            className="password-sign-in-input"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className="login-form-btn" type="submit">
          Login
        </button>
        {/* <div>
          Don't have an account?
          <NavLink to="/sign-up">Sign Up</NavLink>
        </div> */}
      </form>
    </div>
  );
};

export default LoginForm;
