import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="glass-effect border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              ShoeStopper
            </h3>
            <p className="text-slate-300">
              Step into the future with our revolutionary shoe customization platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('quick')}
              className="md:cursor-default w-full text-left text-lg font-semibold md:pointer-events-none"
            >
              Quick Links
            </button>
            <div
              className={`space-y-2 text-sm md:block ${
                openSection === 'quick' || window.innerWidth >= 768 ? 'block' : 'hidden'
              }`}
            >
              <Link to="/" className="block text-slate-300 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="block text-slate-300 hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/customize" className="block text-slate-300 hover:text-primary transition-colors">
                Customize
              </Link>
              <Link to="/cart" className="block text-slate-300 hover:text-primary transition-colors">
                Cart
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('categories')}
              className="md:cursor-default w-full text-left text-lg font-semibold md:pointer-events-none"
            >
              Categories
            </button>
            <div
              className={`space-y-2 text-sm md:block ${
                openSection === 'categories' || window.innerWidth >= 768 ? 'block' : 'hidden'
              }`}
            >
              <Link to="/products?category=men" className="block text-slate-300 hover:text-secondary transition-colors">
                Men's Shoes
              </Link>
              <Link to="/products?category=women" className="block text-slate-300 hover:text-secondary transition-colors">
                Women's Shoes
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('contact')}
              className="md:cursor-default w-full text-left text-lg font-semibold md:pointer-events-none"
            >
              Contact
            </button>
            <div
              className={`space-y-2 text-sm text-slate-300 md:block ${
                openSection === 'contact' || window.innerWidth >= 768 ? 'block' : 'hidden'
              }`}
            >
              <p>info@shoestopper.com</p>
              <p>+92 (300) 420-3982</p>
              <p>24/7 Customer Support</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-slate-300">
            © 2024 ShoeStopper. All rights reserved. | Cash on Delivery Available
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
