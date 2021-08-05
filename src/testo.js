import React from "react";

const Testo = (props) => {
  return <div onClick={props.onClick}>Alguien {props.person}</div>;
};

export default Testo;
