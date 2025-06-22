import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products as allProducts, Product } from '../data/product';

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'men', label: "Men's Shoes" },
    { value: 'women', label: "Women's Shoes" }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 funky-text-gradient animate-fade-in">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Collection'}
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Discover the perfect pair for your unique style
          </p>
        </div>

        {/* Category Filter */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-zoom-in">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all hover-scale ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-primary-foreground neon-glow'
                    : 'glass-effect hover:bg-primary/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-2xl text-muted-foreground">
              {searchQuery
                ? `No shoes found matching "${searchQuery}"`
                : 'No products found in this category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
