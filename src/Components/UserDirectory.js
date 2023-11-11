import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useMembersContext } from "../App";
import { fetchUserPosts, fetchUsers, getPostsLength } from "../Utils/Helper";
import "./Style.css";

function UserDirectory() {
  const { state, dispatch } = useMembersContext();

  const { users, posts } = state || {};

  useEffect(() => {
    if (!users?.length || !posts?.length) {
      fetchUsers(dispatch);
      fetchUserPosts(dispatch);
    }
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Directory</h2>
      {users?.map((user) => (
        <Link key={user.id} to={`/user/${user.id}`} className="linkStyle">
          <div className="user_directory__Container">
            <div>Name: {user.name}</div>
            <div>{`Posts: ${getPostsLength(state?.posts, user?.id)}`}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default UserDirectory;
