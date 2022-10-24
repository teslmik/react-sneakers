import React from "react";
import Card from "../components/Card";
import AppContex from "../contex";

function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContex);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap justify-between">
        {favorites.map((item, index) => (
          <Card key={index} favorited={true} onFavorite={onAddToFavorite} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
