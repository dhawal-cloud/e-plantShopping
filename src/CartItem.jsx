import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const placeholder = (name) =>
  `https://placehold.co/300x300/2e7d32/ffffff?text=${encodeURIComponent(name)}`;

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total cost for one plant type (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount for every plant in the cart
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-total-amount">
        Total Cart Amount: ${calculateTotalAmount()}
      </div>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      <div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img
              src={item.image}
              alt={item.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = placeholder(item.name);
              }}
            />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <div>Unit price: ${item.cost}</div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div>Total: ${calculateTotalCost(item)}</div>
            </div>
            <button className="delete-button" onClick={() => handleRemove(item)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button className="continue-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-button" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
