import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import Feed from "./components/Feed";
import CreateTweetForm from "./components/CreateTweet/CreateTweetForm";
import "./index.css";
import TweetDetail from "./components/TweetDetails";
import ProfilePage from "./components/Profile/profile";

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
        <Route exact path="/users/:userId">
          <div style={{display:"flex"}}>
          <NavBar />
          <ProfilePage />
          </div>
        </Route>
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
          <NavBar />
          <div className="pageNotFound">404 Page Not Found</div>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
