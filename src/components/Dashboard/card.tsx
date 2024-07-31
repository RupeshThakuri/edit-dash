"use client";

import React from "react";

//css
import "./card.css";

//circular progress bar
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card = (props) => {
  const Png = props.png;
  return (
    <>
      <div
        className="compactCard"
        style={{
          background: props.color.backGround,
          boxShadow: props.color.boxShadow,
        }}
      >
        <div className="radialBar">
          <CircularProgressbar
            value={props.barValue}
            text={`${props.barValue}%`}
          />
          <span>{props.title}</span>
        </div>
        <div className="detail">
          <Png />
          <span>${props.value}</span>
          <span>Lst 24 hrs</span>
        </div>
      </div>
    </>
  );
};
export default Card;
