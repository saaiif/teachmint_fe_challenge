import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useMembersContext } from "../App";
import PostCard from "../Profile/PostCard";
import UserInfo from "../Profile/UserInfo";
import { fetchUsers, fetchUserPosts } from "../Utils/Helper";
import "./Style.css";

function UserDetail() {
  const { userId } = useParams();
  const { state, dispatch } = useMembersContext();
  const { users, posts } = state || {};

  useEffect(() => {
    if (!users?.length || !posts?.length) {
      fetchUsers(dispatch);
      fetchUserPosts(dispatch);
    }
  }, []);

  return (
    <div className="userdetail">
      <div className="userdetail_topbar">
        <NavLink to="/">Back</NavLink>
        <div className="userdetail_topbar__right">
          <select className="userdetail_topbar__dropdown">
            <option>ACdfdsfsd sdfdghf dfgfsag</option>
          </select>
          <span>10:00:00</span>
          <button className="userdetail_topbar__btn">Start</button>
        </div>
      </div>
      <h3 style={{ textAlign: "center" }}>Profile</h3>
      <div>
        <UserInfo users={users} userId={userId} />
      </div>
      <h3 style={{ textAlign: "center" }}>Posts</h3>
      <div className="postCard">
        {posts?.map((post) => {
          if (post.userId === Number(userId)) {
            return <PostCard post={post} userId={userId} />;
          }
        })}
      </div>
    </div>
  );
}

export default UserDetail;
