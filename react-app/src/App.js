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
        <Route exact path="/sign-up">
          <SignUpForm />
        </Route>
        <ProtectedRoute exact path="/users">
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute exact path="/users/:userId">
          <NavBar />
          <User />
        </ProtectedRoute>
        <Route exact path="/tweets/create">
          <NavBar />
          <CreateTweetForm />
        </Route>
        <Route exact path="/tweets/:tweetId">
          <TweetDetail />
        </Route>
        <ProtectedRoute exact path="/">
          <Feed />
        </ProtectedRoute>
        <ProtectedRoute path="*">
            <div className="pageNotFound">404 Page Not Found</div>
          </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
