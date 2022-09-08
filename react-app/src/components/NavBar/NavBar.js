import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateTweetModal from '../CreateTweet';
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav className='whole-navbar'>
      <ul>
        <div className='img-div'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className="logo-img" src="https://cdn-icons-png.flaticon.com/512/124/124021.png"/>
          </NavLink>
        </div>
        <div className='home-btn'>
          <NavLink to="/" exact={true} className="home-text">
            Home
          </NavLink>
        </div>
        <div className="tweet-modal">
          {/* <NavLink to="/tweets/create" exact={true} className="tweet-text">
            Tweet
          </NavLink> */}
          <CreateTweetModal />
        </div>
        {/* <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div className='logout-div'>
          < LogoutButton />
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
