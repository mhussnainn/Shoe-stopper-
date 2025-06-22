import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home, Search, X } from 'lucide-react';
import Logo from '../../public/assets/WhatsApp Image 2025-06-18 at 7.58.08 PM.jpeg';
import { products } from '../data/product';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (!searchQuery.trim()) {
          setShowSearch(false);
        }
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchToggle = () => {
    if (showSearch && !searchQuery.trim()) {
      setShowSearch(false);
      setShowDropdown(false);
    } else {
      setShowSearch(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
      setShowDropdown(false);
    }
  };

  const handleProductClick = (productName: string) => {
    navigate(`/products?search=${encodeURIComponent(productName)}`);
    setSearchQuery('');
    setShowSearch(false);
    setShowDropdown(false);
  };

  const closeSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
    setShowDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Hidden on mobile when search is active */}
          <Link 
            to="/" 
            className={`items-center space-x-3 hover-scale ${
              showSearch ? 'hidden md:flex' : 'flex'
            }`}
          >
            <img 
              src={Logo} 
              alt="ShoeStopper Logo" 
              className="w-10 h-10 md:w-13 md:h-13 rounded-lg object-cover"
            />
            <span className="text-lg md:text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent sm:block">
              ShoeStopper
            </span>
          </Link>

          {/* Search Input */}
          <div ref={searchRef} className="relative flex-1 max-w-md mx-4">
            {showSearch && (
              <div className="relative">
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative flex-1">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search shoes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pr-10 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={closeSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </form>

                {showDropdown && filteredProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-transparent border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.name)}
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0 flex justify-between items-center"
                      >
                        <span className="font-medium">{product.name}</span>
                        <span className="text-sm text-primary font-semibold">${product.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`flex items-center space-x-2 ${isActive('/') ? 'text-primary' : 'text-foreground'}`}>
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/products" className={`hover:text-secondary ${isActive('/products') ? 'text-secondary' : 'text-foreground'}`}>
              Products
            </Link>
            <Link to="/products?category=men" className="hover:text-accent">Men</Link>
            <Link to="/products?category=women" className="hover:text-accent">Women</Link>
            <Link to="/customize" className={`hover:text-primary ${isActive('/customize') ? 'text-primary' : 'text-foreground'}`}>
              Customize
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <button onClick={handleSearchToggle} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Search size={18} className="text-foreground" />
            </button>

            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart size={18} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-2 md:hidden hover:bg-muted rounded-lg transition-colors">
              <div className="space-y-1">
                <span className="block w-4 h-0.5 bg-foreground"></span>
                <span className="block w-4 h-0.5 bg-foreground"></span>
                <span className="block w-4 h-0.5 bg-foreground"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white">
            <div className="flex flex-col space-y-3">
              <Link to="/" onClick={() => setMobileNavOpen(false)} className="px-2 py-2 hover:bg-muted rounded-lg">
                Home
              </Link>
              <Link to="/products" onClick={() => setMobileNavOpen(false)} className="px-2 py-2 hover:bg-muted rounded-lg">
                Products
              </Link>
              <Link to="/products?category=men" onClick={() => setMobileNavOpen(false)} className="px-2 py-2 hover:bg-muted rounded-lg">
                Men
              </Link>
              <Link to="/products?category=women" onClick={() => setMobileNavOpen(false)} className="px-2 py-2 hover:bg-muted rounded-lg">
                Women
              </Link>
              <Link to="/customize" onClick={() => setMobileNavOpen(false)} className="px-2 py-2 hover:bg-muted rounded-lg">
                Customize
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
