import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useMembersContext } from "../App";
import PostCard from "../Screens/Profile/PostCard";
import UserInfo from "../Screens/Profile/UserInfo";
import Clock from "../Screens/Timezone/Clock";
import CountryListDropdown from "../Screens/Timezone/CountryListDropdown";
import { fetchUsers, fetchUserPosts, fetchCountryList } from "../Utils/Helper";
import "./Style.css";

function UserDetail() {
  const { userId } = useParams();
  const { state, dispatch } = useMembersContext();
  const { users, posts, country_list } = state || {};

  useEffect(() => {
    if (!users?.length || !posts?.length) {
      fetchUsers(dispatch);
      fetchUserPosts(dispatch);
    }
    fetchCountryList(dispatch);
  }, []);

  return (
    <div className="userdetail">
      <div className="userdetail_topbar">
        <NavLink to="/" className="userdetail_topbar__back">
          Back
        </NavLink>
        <div className="userdetail_topbar__right">
          <CountryListDropdown countries={country_list} />
          <Clock />
        </div>
      </div>
      <h3 style={{ textAlign: "center" }}>Profile Page</h3>
      <div>
        <UserInfo users={users} userId={userId} />
      </div>
      <div className="postCard">
        {posts?.map((post) => {
          if (post.userId === Number(userId)) {
            return <PostCard post={post} key={post?.id} />;
          }
        })}
      </div>
    </div>
  );
}

export default UserDetail;
