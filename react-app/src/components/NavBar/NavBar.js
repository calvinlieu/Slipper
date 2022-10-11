import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import CreateTweetModal from "../CreateTweet";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";

const NavBar = () => {
  const openInNewTab = (url) => {
    // 👇️ setting target to _blank with window.open
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const user = useSelector((state) => state.session.user)

  return (
    <nav className="whole-navbar">
      <ul className="each-item">
        <div className="img-div">
          <NavLink to="/" exact={true} activeClassName="active">
            <img
              className="logo-img"
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
            />
          </NavLink>
        </div>
        <div className="home-btn">
          <NavLink to="/" exact={true} className="home-text">
            <div className="icon">
            <i className="fa-solid fa-house-chimney-window"></i>
            </div>
            Home
          </NavLink>
        </div>
        <div className="home-btn">
          <NavLink to={`/users/${user?.id}`} exact={true} className="home-text">
            <div className="icon">
            <i className="fa-solid fa-user"></i>
            </div>
            Profile
          </NavLink>
        </div>
        <div
          className="about-linked-in"
          onClick={() =>
            openInNewTab("https://www.linkedin.com/in/calvin-lieu-3049b4228/")
          }
        >
          <div className="icon">
          <i className="fa-brands fa-linkedin"></i>
          </div>
          <div className="linked-in-div">LinkedIn</div>
        </div>
        <div
          className="feed-github"
          onClick={() => openInNewTab("https://github.com/calvinlieu")}
        >
          <div className="icon">
          <i className="fa-brands fa-square-github"></i>
          </div>
          <div className="github-div">GitHub</div>
        </div>
        <div
          className="about-linked-in"
          onClick={() =>
            openInNewTab("https://calvinlieu.github.io/")
          }
        >
          <div className="icon">
          <i className="fa-solid fa-folder"></i>
          </div>
          <div className="linked-in-div">Portfolio</div>
        </div>
        <div className="tweet-modal">
          <CreateTweetModal />
        </div>
        <div className="logout-div">
          <LogoutButton />
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
