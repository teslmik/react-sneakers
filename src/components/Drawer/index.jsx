import React from 'react';
import axios from 'axios';
import styles from './Drawer.module.scss';
import Info from "../Info";
import { useCart } from '../../hooks/useCart';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems,totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplite, setIsOrderComplite] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("https://62d18e0fd4eb6c69e7dfd388.mockapi.io/orders", {
        items: cartItems
      });
      setOrderId(data.id);
      setIsOrderComplite(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://62d18e0fd4eb6c69e7dfd388.mockapi.io/cart/" + item.id);
        await delay();
      }

    } catch (error) {
      alert('Ошибка при создании заказа...');
    }
    setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items flex">
              {items.map((obj, index) => (
                <div key={index} className="cartItem d-flex align-center p-10 mb-20">
                  <img
                    className="mr-20"
                    width={70}
                    height={70}
                    src={obj.imgUrl}
                    alt="snickers"
                  />
                  <div className="mr-20">
                    <p className="mb-5 mt-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="btn-remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого: </span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{Math.floor(totalPrice / 100 * 5)} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ{" "}
                <img src="img/arrow-right.svg" alt="arrow-right" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplite ? "Заказ оформлен!" : "Корзина пустая"}
            description={isOrderComplite
              ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
              : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
            image={isOrderComplite ? "img/complite-order.png" : "img/cart-empty.png"}
          />
        )}
      </div>
    </div>

  );
}

export default Drawer;