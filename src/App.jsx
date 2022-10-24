import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import AppContex from './contex';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62d18e0fd4eb6c69e7dfd388.mockapi.io/cart'),
          axios.get('https://62d18e0fd4eb6c69e7dfd388.mockapi.io/favorites'),
          axios.get('https://62d18e0fd4eb6c69e7dfd388.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Error');
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const finedItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (finedItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62d18e0fd4eb6c69e7dfd388.mockapi.io/cart/${finedItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://62d18e0fd4eb6c69e7dfd388.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Не удалось добавить в корзину...');
    }
  };

  const onRemoveItem = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      axios.delete(`https://62d18e0fd4eb6c69e7dfd388.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Не удалось удалить из корзины...');
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62d18e0fd4eb6c69e7dfd388.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          'https://62d18e0fd4eb6c69e7dfd388.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки...');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContex.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path="/react-sneakers" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path="react-sneakers/favorites" exact>
          <Favorites onAddToFavorite={onAddToFavorite} />
        </Route>
        <Route path="react-sneakers/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContex.Provider>
  );
}

export default App;
