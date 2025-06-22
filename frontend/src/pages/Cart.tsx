import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Neon Runner Pro',
      price: 159,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
      size: '10',
      color: 'Electric Blue',
      design: 'Classic',
      quantity: 1
    },
    {
      id: '2',
      name: 'Electric Glam',
      price: 189,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop',
      size: '8',
      color: 'Neon Pink',
      design: 'Galaxy Print',
      quantity: 2
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 funky-text-gradient text-center">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">Your cart is empty</p>
            <Link 
              to="/products"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover-scale neon-glow transition-all inline-block text-sm md:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="glass-effect rounded-xl p-4 md:p-6">
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">{item.name}</h3>
                    </div>
                    <div className="text-center">
                      <p className="text-sm md:text-lg font-bold text-primary mb-2">
                        ${item.price}
                      </p>
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full glass-effect flex items-center justify-center hover-scale"
                        >
                          -
                        </button>
                        <span className="text-sm md:text-lg font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full glass-effect flex items-center justify-center hover-scale"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="glass-effect rounded-xl p-5 md:p-6 h-fit neon-glow">
              <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6 funky-text-gradient">
                Order Summary
              </h2>
              
              <div className="space-y-3 md:space-y-4 mb-5 md:mb-6 text-sm md:text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg md:text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total}</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="block w-full py-3 md:py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-sm md:text-lg hover-scale neon-glow transition-all mb-4 text-center"
              >
                Proceed to Checkout
              </Link>
              
              <Link 
                to="/products"
                className="block text-center text-secondary hover:text-secondary/80 transition-colors text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
