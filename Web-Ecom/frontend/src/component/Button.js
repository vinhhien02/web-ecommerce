import React from "react";

const Button = ({ type, name, handleOnclick, style, iconLeft, iconRight }) => {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : "px-5  py-2.5 rounded-lg text-white text-sm w-full tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
      }
      onClick={() => {
        handleOnclick && handleOnclick();
      }}
    >
      {iconLeft}
      <span>{name}</span>
      {iconRight}
    </button>
  );
};

export default Button;
