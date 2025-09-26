import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  // Calculate total cost for all items
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const costNum = parseFloat(item.cost.substring(1));
      total += costNum * item.quantity;
    });
    return total.toFixed(2);
  };

  // Calculate subtotal for a single item
  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.substring(1));
    return (costNum * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      {cart.length === 0 && <h2>Your cart is empty!</h2>}
      {cart.map(item => (
        <div key={item.name} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>
            <div className="cart-item-quantity">
              <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="total_cart_amount">
            Total: ${calculateTotalAmount()}
          </div>
          <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
        </>
      )}

      <button className="get-started-button1 continue_shopping_btn" onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartItem;
