import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink, Link } from "react-router-dom";
import { signUp, demoLogin } from "../../store/session";
import "../SplashPage/SplashPage.css";
import LoginFormModal from ".";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Passwords must match!"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const signInClick = (e) => {
    history.push("/login");
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="home-page">
        <img className="splash-image" src="https://i.imgur.com/Qfj09lS.png" />
        <div className="signup-page">
          <div className="header">
            <div>Created By: Calvin Lieu</div>
            <div className="HomePage-LinkedIn">
              <img
                alt=""
                src="react-app/src/components/SplashPage/LinkedIn_Logo.svg.png"
                className="HomePage-logos"
              />
              <a
                className="link-text"
                href="https://www.linkedin.com/in/calvin-lieu-3049b4228/"
              >
                LinkedIn
              </a>
            </div>
            <div className="HomePage-GitHub">
              <img alt="" className="HomePage-logos" />
              <a className="link-text" href="https://github.com/calvinlieu">
                GitHub
              </a>
            </div>
          </div>
          <img
            className="twitter-icon"
            src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
          />
          <p className="happening">Happening now</p>
          <p className="join">Join Slipper today.</p>
          <form className="signup-form" onSubmit={onSignUp}>
            <div className="error-container">
              {errors.map((error, ind) => (
                <div key={ind}>{error.split(":")[1]}</div>
              ))}
            </div>
            <div>
              <div>
                <input
                  type="text"
                  name="username"
                  onChange={updateUsername}
                  value={username}
                  placeholder="Username"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  onChange={updateEmail}
                  value={email}
                  placeholder="Email"
                ></input>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  onChange={updatePassword}
                  value={password}
                  placeholder="Password"
                ></input>
              </div>
              <div>
                <input
                  type="password"
                  name="repeat_password"
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                  placeholder="Repeat Password"
                ></input>
              </div>
            </div>
            <button className="sign-up-btn" type="submit">
              Sign Up
            </button>
          </form>
          <button
            className="demo-login-btn"
            type="button"
            onClick={() => {
              dispatch(demoLogin());
            }}
          >
            Demo Login
          </button>
          <div className="signin-section">Already have an account?</div>
          <div>
            <button className="signin-btn">
              <LoginFormModal />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
