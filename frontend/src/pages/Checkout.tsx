
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    alert('Order placed successfully! Cash on Delivery confirmed.');
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        {/* Funky Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 funky-text-gradient animate-bounce-slow">
            Checkout
          </h1>
          <div className="inline-block glass-effect px-6 py-3 rounded-xl neon-glow animate-pulse-glow">
            <p className="text-xl font-semibold text-accent">
              🎉 CASH ON DELIVERY ONLY 🎉
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="glass-effect rounded-xl p-8 neon-glow">
              <h2 className="text-2xl font-bold mb-6 funky-text-gradient">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="glass-effect rounded-xl p-8 neon-glow">
              <h2 className="text-2xl font-bold mb-6 funky-text-gradient">
                Delivery Address
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Notice */}
            <div className="glass-effect rounded-xl p-8 border-2 border-accent animate-pulse-glow">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-accent">
                  💰 Payment Method: Cash on Delivery Only 💰
                </h3>
                <p className="text-lg text-muted-foreground">
                  Pay when your funky shoes arrive at your doorstep!
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover-scale neon-glow transition-all animate-pulse-glow"
            >
              Place Order - Cash on Delivery
            </button>

            <div className="text-center">
              <Link 
                to="/cart"
                className="text-secondary hover:text-secondary/80 transition-colors"
              >
                ← Back to Cart
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
