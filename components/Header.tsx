
import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onSearch, cartCount }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <header className="bg-[#003366] text-white">
      {/* Top utility bar */}
      <div className="bg-[#002244] py-1 px-4 text-xs flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="cursor-pointer hover:underline">Find a Branch</span>
          <span className="cursor-pointer hover:underline">Customer Support: 1-800-ALLIED-1</span>
        </div>
        <div className="flex space-x-4">
          <span className="cursor-pointer hover:underline">Request a Quote</span>
          <span className="cursor-pointer hover:underline">Safety Resources</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0 cursor-pointer" onClick={() => window.location.hash = ''}>
          <div className="bg-red-600 text-white p-2 rounded font-bold text-2xl tracking-tighter">
            ALLIED
          </div>
          <div className="text-xl font-light italic text-gray-200">
            Industrial Parts
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-grow max-w-3xl w-full relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by Keyword, Part #, Brand or Category..."
            className="w-full py-2 px-4 rounded-l text-gray-800 focus:outline-none"
          />
          <button type="submit" className="absolute right-0 top-0 bottom-0 bg-red-600 hover:bg-red-700 px-6 rounded-r transition-colors">
            <i className="fa fa-search"></i>
          </button>
        </form>

        {/* User Actions */}
        <div className="flex items-center space-x-6 whitespace-nowrap">
          <div className="flex items-center cursor-pointer group">
            <i className="fa fa-user-circle text-2xl mr-2 group-hover:text-blue-300"></i>
            <div className="text-sm">
              <p className="font-bold">Sign In</p>
              <p className="text-xs text-gray-300">Your Account</p>
            </div>
          </div>
          <div className="flex items-center cursor-pointer group relative">
            <i className="fa fa-shopping-cart text-2xl mr-2 group-hover:text-blue-300"></i>
            <div className="text-sm">
              <p className="font-bold">Cart</p>
              <p className="text-xs text-gray-300">{cartCount} items</p>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 rounded-full ring-2 ring-[#003366]">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Links */}
      <nav className="bg-white text-[#003366] shadow-md border-b">
        <div className="container mx-auto px-4 flex space-x-8 py-2 text-sm font-bold overflow-x-auto no-scrollbar">
          <div className="group relative cursor-pointer flex items-center">
            <i className="fa fa-bars mr-2"></i> PRODUCTS
          </div>
          <div className="hover:text-red-600 cursor-pointer">SERVICES</div>
          <div className="hover:text-red-600 cursor-pointer">BRANDS</div>
          <div className="hover:text-red-600 cursor-pointer">RESOURCES</div>
          <div className="hover:text-red-600 cursor-pointer">OFFERS</div>
          <div className="flex-grow"></div>
          <div className="text-red-600 cursor-pointer">CLEARANCE</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
