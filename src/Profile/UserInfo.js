import React from "react";
import "./Style.css";

function UserInfo({ users, userId }) {
  const name = users?.find((user) => user.id === Number(userId))?.name;
  const userName = users?.find((user) => user.id === Number(userId))?.username;
  const catchPhrase = users?.find((user) => user.id === Number(userId))?.company
    ?.catchPhrase;
  const street = users?.find((user) => user.id === Number(userId))?.address
    .street;
  const suite = users?.find((user) => user.id === Number(userId))?.address
    .suite;
  const city = users?.find((user) => user.id === Number(userId))?.address.city;
  const zipcode = users?.find((user) => user.id === Number(userId))?.address
    .zipcode;
  const phone = users?.find((user) => user.id === Number(userId))?.phone;
  const email = users?.find((user) => user.id === Number(userId))?.email;

  return (
    <div className="userInfo">
      <div className="userInfo_left">
        <h4>Name: {name}</h4>
        <h4>
          Username: {userName} | Catch phrase: {catchPhrase}
        </h4>
      </div>
      <div>
        <h4>
          Address: {street}, {suite}, {city}, {zipcode}.
        </h4>
        <h4>
          Phone: {phone} | Email: {email}
        </h4>
      </div>
    </div>
  );
}

export default UserInfo;
