import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink } from "react-router-dom";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );
        const userData = await userResponse.json();
        setUser(userData);
        setLoading(false);

        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        );
        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);
console.log(posts,"posts");
  return (
    <div>
      <NavLink to="/">Back to User Directory</NavLink>
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <>
          <h1>{user.name}</h1>
          <div>{/* Display user details */}</div>
          <div>
            {/* Clock section with pause/start button */}
            {/* Display posts */}
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetail;
