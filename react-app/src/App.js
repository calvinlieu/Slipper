import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import LoginFormModal from "./components/auth";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Feed from "./components/Feed";
import CreateTweetForm from "./components/CreateTweet/CreateTweetForm";
import "./index.css";
import TweetDetail from "./components/TweetDetails";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        {/* <Route exact path="/login">
          <LoginFormModal />
        </Route> */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <NavBar />
          <User />
        </ProtectedRoute>
        <Route path="/tweets/create" exact={true}>
          <NavBar />
          <CreateTweetForm />
        </Route>
        <Route path="/tweets/:tweetId" exact={true}>
          <TweetDetail />
        </Route>
        <ProtectedRoute path="/" exact={true}>
          <Feed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
