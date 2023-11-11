import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MembersContext } from "../App";
import { POSTS, USER_LIST } from "../Utils/Contants";
import { getData, getPostsLength } from "../Utils/Helper";
import { POSTS_URL, USERS_URL } from "../Utils/Endpoints";
import "./Style.css";

function UserDirectory() {
  const [users, setUsers] = useState([]);
  const { state, dispatch } = useContext(MembersContext);

  const fetchUsers = async () => {
    const data = await getData(USERS_URL, "Users");
    setUsers(data);
    dispatch({ type: USER_LIST, payload: data });
  };

  const fetchUserPosts = async (userId) => {
    const data = await getData(POSTS_URL, "Posts");
    dispatch({ type: POSTS, payload: data });
  };

  useEffect(() => {
    fetchUsers();
    fetchUserPosts();
  }, []);

  console.log(state);
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Directory</h2>
      {users?.map((user, index) => (
        <Link to={`/user/${user.id}`} className="linkStyle">
          <div key={user.id} className="user_directory__Container">
            <div>Name: {user.name}</div>
            <div>{`Posts: ${getPostsLength(state?.posts, user?.id)}`}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default UserDirectory;