import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home, Search, X } from 'lucide-react';
import { products } from '../data/product';

const Logo = '/assets/Logo.jpeg';

const navLinks = [
  { to: '/',                    label: 'Home',      icon: true },
  { to: '/about',               label: 'About'              },
  { to: '/products',            label: 'Products'           },
  { to: '/products?category=men',   label: 'Men'            },
  { to: '/products?category=women', label: 'Women'          },
  { to: '/customize',           label: 'Customize'          },
  { to: '/contact',             label: 'Contact'            },
];

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

  // Determine if a nav link is active.
  // For query-string links (Men / Women) we match the full pathname+search.
  const isActive = (to: string) => {
    if (to.includes('?')) {
      return location.pathname + location.search === to;
    }
    return location.pathname === to;
  };

  /* ── Close search on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        if (!searchQuery.trim()) setShowSearch(false);
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchQuery]);

  /* ── Filter products as user types ── */
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  /* ── Auto-focus search input ── */
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  /* ── Close mobile nav on route change ── */
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location]);

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
      closeSearch();
    }
  };

  const handleProductClick = (productName: string) => {
    navigate(`/products?search=${encodeURIComponent(productName)}`);
    closeSearch();
  };

  const closeSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
    setShowDropdown(false);
  };

  /* ── Shared link class helper ── */
  const linkClass = (to: string, extra = '') =>
    `transition-colors duration-150 ${
      isActive(to)
        ? 'text-primary font-semibold'
        : 'text-foreground hover:text-primary'
    } ${extra}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className={`items-center space-x-3 hover-scale ${showSearch ? 'hidden md:flex' : 'flex'}`}
          >
            <img
              src={Logo}
              alt="ShoeStopper Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
            />
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent sm:block">
              ShoeStopper
            </span>
          </Link>

          {/* ── Search input ── */}
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
                      className="w-full px-4 py-2 pr-10 rounded-lg glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={closeSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </form>

                {showDropdown && filteredProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 glass-effect border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.name)}
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0 flex justify-between items-center"
                      >
                        <span className="font-medium text-sm">{product.name}</span>
                        <span className="text-sm text-primary font-semibold text-white">Rs.{product.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            {navLinks.map(({ to, label, icon }) => (
              <Link key={to} to={to} className={linkClass(to, 'flex items-center gap-1.5')}>
                {icon && <Home size={16} />}
                {label}
              </Link>
            ))}
          </div>

          {/* ── Icon buttons ── */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={handleSearchToggle}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle search"
            >
              <Search size={18} className="text-foreground" />
            </button>

            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Cart">
              <ShoppingCart size={18} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileNavOpen(prev => !prev)}
              className="p-2 md:hidden hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <div className="space-y-1">
                <span className={`block w-4 h-0.5 bg-foreground transition-all duration-200 ${mobileNavOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block w-4 h-0.5 bg-foreground transition-all duration-200 ${mobileNavOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-4 h-0.5 bg-foreground transition-all duration-200 ${mobileNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile nav dropdown ── */}
        {mobileNavOpen && (
          <div className="md:hidden py-4 border-t border-border glass-effect">
            <div className="flex flex-col space-y-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileNavOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;