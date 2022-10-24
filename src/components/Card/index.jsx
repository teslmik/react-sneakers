import React from "react";
import ContentLoader from "react-content-loader";
import AppContex from "../../contex";
import styles from "./Card.module.scss";

function Card({
  id,
  title,
  imgUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {

  const { isItemAdded } = React.useContext(AppContex);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, imgUrl, title, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={178}
          viewBox="0 0 150 178"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="100" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="119" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="151" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="143" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite &&
            (<div className={styles.favorite} onClick={onClickFavorite}>
              <img src={isFavorite
                ? "img/heart-like.svg"
                : "img/heart-notlike.svg"} alt="Notlike" />
            </div>)}
          <img width={133} height={112} src={imgUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="card-bottom d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена: </span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (<img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"}
              alt="plus"
            />)}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
