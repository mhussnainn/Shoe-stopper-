import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/product'; // import your product data

const Home = () => {
  const featuredProducts = products.slice(0, 6); // get first 6 products

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated Color Drops */}
      <div className="color-drop color-drop-1"></div>
      <div className="color-drop color-drop-2"></div>
      <div className="color-drop color-drop-3"></div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-4 split-text">
              <span className="tech-text-gradient animate-text-reveal">WALK YOUR</span>
            </h1>
            <h1 className="text-6xl md:text-8xl font-black mb-8 split-text" style={{ animationDelay: '0.5s' }}>
              <span className="tech-text-gradient animate-text-reveal">OWN WAY</span>
            </h1>
          </div>

          <div className="relative mb-12">
            <p className="text-lD md:text-xl font-light text-secondary animate-fade-in opacity-80" style={{ animationDelay: '1s' }}>
              You Are Exactly Where Innovation Meets Style
            </p>
            <div className="absolute inset-0 tech-gradient opacity-20 blur-xl animate-pulse-glow"></div>
          </div>

          <p className="text-lg md:text-xl mb-12 text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '1.2s' }}>
            Design your perfect footwear with cutting-edge technology. 
            Express your unique style with limitless customization possibilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-zoom-in" style={{ animationDelay: '1.5s' }}>
            <Link 
              to="/products" 
              className="px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold hover-scale neon-glow transition-all animate-pulse-glow text-lg"
            >
              Explore Collection
            </Link>
            <Link 
              to="/customize" 
              className="px-10 py-5 glass-effect rounded-2xl font-bold hover-scale transition-all border-2 border-secondary text-lg animate-float"
            >
              Start Customizing
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-16 w-6 h-6 bg-primary rounded-full opacity-60 animate-ping"></div>
        <div className="absolute bottom-32 right-20 w-4 h-4 bg-secondary rounded-full opacity-40 animate-bounce-slow"></div>
        <div className="absolute top-48 right-32 w-8 h-8 bg-accent rounded-full opacity-50 animate-float"></div>
        <div className="absolute top-80 left-1/4 w-3 h-3 bg-primary rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute bottom-48 left-32 w-5 h-5 bg-secondary rounded-full opacity-30 animate-spin-slow"></div>
        <div className="absolute top-40 right-1/3 w-7 h-7 bg-accent rounded-full opacity-40 animate-wiggle"></div>
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-primary rounded-full opacity-80 animate-ping"></div>
        <div className="absolute bottom-80 left-1/3 w-10 h-10 border-2 border-secondary rounded-full opacity-20 animate-spin"></div>
        <div className="absolute top-60 right-1/4 w-12 h-12 border border-accent rounded-full opacity-25 animate-pulse"></div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tech-text-gradient animate-fade-in">
              Featured Collection
            </h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Discover our most innovative and cutting-edge designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-zoom-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/products?category=men" className="group animate-slide-up">
              <div className="glass-effect rounded-2xl p-12 hover-scale transition-all h-80 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <h3 className="text-5xl font-bold mb-6 group-hover:tech-text-gradient transition-all">
                    Men's
                  </h3>
                  <p className="text-2xl text-muted-foreground">
                    Performance & Innovation
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/40 transition-all animate-pulse"></div>
              </div>
            </Link>

            <Link to="/products?category=women" className="group animate-slide-up">
              <div className="glass-effect rounded-2xl p-12 hover-scale transition-all h-80 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <h3 className="text-5xl font-bold mb-6 group-hover:tech-text-gradient transition-all">
                    Women's
                  </h3>
                  <p className="text-2xl text-muted-foreground">
                    Style & Sophistication
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent group-hover:from-secondary/40 transition-all animate-pulse"></div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
