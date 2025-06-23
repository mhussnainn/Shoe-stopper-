import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/product';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ui/use-toast'; // adjust path if needed


const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState('');

  // Convert id to number if your product ids are numbers
  const product = products.find(p => String(p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center text-center">
        <p className="text-2xl text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
  
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: selectedSize,
      quantity: 1,
    });
  
    toast({
      title: 'Added to Cart',
      description: `${product.name} (Size ${selectedSize}) was added to your cart.`,
    });
  };
  

  return (
    <div className="min-h-screen pt-20 pb-20 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="glass-effect rounded-xl overflow-hidden neon-glow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 funky-text-gradient">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">Rs.{product.price}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Choose Size</h3>
              <div className="grid grid-cols-6 gap-3">
                {['7', '8', '9', '10', '11', '12'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg font-semibold transition-all hover-scale ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground neon-glow'
                        : 'glass-effect hover:bg-primary/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Notice */}
            <div className="glass-effect rounded-xl p-6 border border-secondary/50">
              <h3 className="text-xl font-semibold mb-2 text-secondary">Want to customize?</h3>
              <p className="text-muted-foreground mb-4">
                Design your own unique shoe with custom colors and patterns!
              </p>
              <Link
                to="/customize"
                className="inline-block px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover-scale transition-all"
              >
                Start Customizing
              </Link>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover-scale neon-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart - Rs.{product.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
