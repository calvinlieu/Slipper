// import TweetDetail from "../TweetDetails";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
// import { useEffect } from "react";
// import { getAllProfileTweets } from "../../store/tweet";

// const ProfilePagev2 = () => {
//   const dispatch = useDispatch();
//   const tweets = useSelector((state) => Object.values(state.tweets));
//   const { userId } = useParams();
//   useEffect(() => {
//       dispatch(getAllProfileTweets(userId));
//   }, []);
//   return (
//     tweets.map((tweet) => {
//         return (
//             <TweetDetail  tweet={tweet}/>
//             // <div>{tweet.id}</div>
//         )
//     })
//     // <div>hi</div>
//   );
// };

// export default ProfilePagev2;
