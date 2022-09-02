import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink, Link } from "react-router-dom";
import { signUp, demoLogin } from "../../store/session";
import "../SplashPage/SplashPage.css";

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
        <div className="header" >
          <Link to="https://github.com/calvinlieu">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="github-link"/>
          </Link>
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
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <div>
                {/* <label>User Name:</label> */}
                <input
                  type="text"
                  name="username"
                  onChange={updateUsername}
                  value={username}
                  placeholder="Username"
                ></input>
              </div>
              <div>
                {/* <label>Email:</label> */}
                <input
                  type="text"
                  name="email"
                  onChange={updateEmail}
                  value={email}
                  placeholder="Email"
                ></input>
              </div>
              <div>
                {/* <label>Password:</label> */}
                <input
                  type="password"
                  name="password"
                  onChange={updatePassword}
                  value={password}
                  placeholder="Password"
                ></input>
              </div>
              <div>
                {/* <label>Repeat Password:</label> */}
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
            <button
              className="signin-btn"
              type="button"
              onClick={() => {
                signInClick();
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
