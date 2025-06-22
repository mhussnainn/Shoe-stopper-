import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women';
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  image, 
  category, 
  featured = false 
}) => {
  return (
    <Link to={`/product/${id}`}>
      <div className={`glass-effect rounded-xl overflow-hidden hover-scale group cursor-pointer ${
        featured ? 'neon-glow' : ''
      }`}>
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              category === 'men' 
                ? 'bg-secondary text-secondary-foreground' 
                : 'bg-primary text-primary-foreground'
            }`}>
              {category.toUpperCase()}
            </span>
          </div>
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground animate-pulse-glow">
                FEATURED
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:funky-text-gradient transition-all truncate">
            {name}
          </h3>
          <p className="text-2xl font-bold text-white text-primary">
            Rs.{price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
