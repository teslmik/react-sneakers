import React from "react";
import AppContex from "../contex";

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContex);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        src={image}
        alt="cartEmpty"
        className="mb-20"
        width={120}
      />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="img/arrow-right.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
