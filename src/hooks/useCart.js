import React from 'react';
import AppContex from '../contex';

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContex);
  const totalPrice = cartItems.reduce((sum, obj) => +obj.price + sum, 0);

  return { cartItems, setCartItems, totalPrice };
};