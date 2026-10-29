
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const placeholder = (name) =>
  `https://placehold.co/300x300/2e7d32/ffffff?text=${encodeURIComponent(name)}`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', cost: 15, image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.png' },
      { name: 'Spider Plant', cost: 12, image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg' },
      { name: 'Peace Lily', cost: 18, image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg' },
      { name: 'Boston Fern', cost: 20, image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg' },
      { name: 'Rubber Plant', cost: 17, image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg' },
      { name: 'Aloe Vera', cost: 14, image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', cost: 20, image: placeholder('Lavender') },
      { name: 'Jasmine', cost: 18, image: placeholder('Jasmine') },
      { name: 'Rosemary', cost: 15, image: placeholder('Rosemary') },
      { name: 'Mint', cost: 12, image: placeholder('Mint') },
      { name: 'Lemon Balm', cost: 14, image: placeholder('Lemon Balm') },
      { name: 'Hyacinth', cost: 22, image: placeholder('Hyacinth') },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'Jade Plant', cost: 13, image: placeholder('Jade Plant') },
      { name: 'ZZ Plant', cost: 25, image: placeholder('ZZ Plant') },
      { name: 'Cast Iron Plant', cost: 16, image: placeholder('Cast Iron Plant') },
      { name: 'Pothos', cost: 10, image: placeholder('Pothos') },
      { name: 'Haworthia', cost: 11, image: placeholder('Haworthia') },
      { name: 'Echeveria', cost: 12, image: placeholder('Echeveria') },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div>
      {/* Navbar: shown on both the Product Listing and Cart pages */}
      <nav className="navbar">
        <div className="brand" onClick={onHomeClick}>
          Paradise Nursery
        </div>
        <div className="nav-links">
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          <a href="#cart" onClick={handleCartClick} className="cart-icon" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256" fill="currentColor">
              <path d="M96 216a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm88-16a16 16 0 1 0 16 16 16 16 0 0 0-16-16ZM231.8 70.4 205.4 168a16 16 0 0 1-15.4 12H84.6a16 16 0 0 1-15.4-11.7L38.5 56H24a8 8 0 0 1 0-16h14.5a16 16 0 0 1 15.4 11.7L58.4 72H224a8 8 0 0 1 7.8 6.4 8.2 8.2 0 0 1 0 0Z" />
            </svg>
            <span className="cart-count">{totalCartCount}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-page">
          {plantsArray.map((group) => (
            <div key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholder(plant.name);
                      }}
                    />
                    <h3>{plant.name}</h3>
                    <div className="product-price">${plant.cost}</div>
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
