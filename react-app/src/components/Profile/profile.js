import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProfileThunk } from "../../store/profile";
import "./profile.css"

const ProfilePage = () => {
  const userSession = useSelector((state) => state?.session.user);
  const userProfile = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();

  console.log(userProfile, "profile");

  useEffect(() => {
    dispatch(getProfileThunk(userId));
  }, [dispatch, userId]);

  return (
    <div>
        <img className="profile-picture"src={userProfile.profile?.profile_image_url}></img>
        <div>{userProfile.profile?.username}</div>
        <div>@{userProfile.profile?.username}</div>

    </div>
  );
};

export default ProfilePage;
