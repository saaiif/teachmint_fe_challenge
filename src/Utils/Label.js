import React from "react";

const labelStyle = {
  color: "#1F4172",
};

function Label({ label }) {
  return <span style={labelStyle}>{label}: </span>;
}

export default Label;
