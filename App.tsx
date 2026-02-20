
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Assistant from './components/Assistant';
import { CATEGORIES, MOCK_PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products based on search and category
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header onSearch={setSearchQuery} cartCount={cartCount} />

      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-3 text-xs text-gray-500">
          Home {selectedCategory && `> ${selectedCategory.toUpperCase()}`} {searchQuery && `> Search: "${searchQuery}"`}
        </div>

        {/* Hero Section (Only on Home with no search/filter) */}
        {!selectedCategory && !searchQuery && (
          <section className="bg-gradient-to-r from-[#003366] to-[#004488] py-12 mb-8">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-white max-w-xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                  YOUR PARTNER IN <br/><span className="text-red-500 uppercase">Industrial Productivity</span>
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                  Over 1.5 million products in stock. Same-day shipping. <br/>
                  Get expert technical advice powered by Allied AI.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition-all">
                    SHOP ALL PRODUCTS
                  </button>
                  <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#003366] text-white font-bold py-3 px-8 rounded transition-all">
                    REQUEST CATALOG
                  </button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                 <img 
                   src="https://picsum.photos/seed/warehouse/600/400" 
                   alt="Industrial Supply" 
                   className="rounded-lg shadow-2xl border-4 border-white/20"
                 />
                 <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl text-[#003366]">
                    <div className="text-3xl font-black">24/7</div>
                    <div className="text-xs uppercase font-bold text-gray-500">Inventory Monitoring</div>
                 </div>
              </div>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 pb-12">
          {/* Sidebar Categories */}
          <aside className="w-full lg:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-bold border-b-2 border-red-600 pb-2 mb-4">SHOP CATEGORIES</h3>
              <ul className="space-y-1">
                {CATEGORIES.map(cat => (
                  <li 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors text-sm ${
                      selectedCategory === cat.id ? 'bg-blue-100 font-bold text-[#003366]' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`fa ${cat.icon} w-6 text-blue-800`}></i>
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">({cat.itemCount.toLocaleString()})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
               <h4 className="font-bold text-[#003366] mb-2 text-sm uppercase">Quick Links</h4>
               <ul className="text-xs space-y-2 text-blue-900">
                 <li className="hover:underline cursor-pointer"><i className="fa fa-angle-right mr-1"></i> Order Tracking</li>
                 <li className="hover:underline cursor-pointer"><i className="fa fa-angle-right mr-1"></i> Special Orders</li>
                 <li className="hover:underline cursor-pointer"><i className="fa fa-angle-right mr-1"></i> Branch Locator</li>
                 <li className="hover:underline cursor-pointer"><i className="fa fa-angle-right mr-1"></i> MSDS Search</li>
               </ul>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
               <img src="https://picsum.photos/seed/promo/300/400" className="w-full h-auto" alt="Promo" />
               <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                  <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full mb-2">LIMITED TIME</span>
                  <h5 className="text-white font-black text-xl leading-tight">SUMMER SAFETY SAVINGS</h5>
                  <p className="text-gray-200 text-xs mt-2">Up to 30% off PPE Essentials</p>
                  <button className="mt-4 bg-white text-gray-900 text-xs font-bold py-2 px-4 rounded">SHOP NOW</button>
               </div>
            </div>
          </aside>

          {/* Product Feed */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-3 rounded shadow-sm border">
               <h2 className="text-xl font-bold">
                 {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory ? `${selectedCategory.toUpperCase()} PRODUCTS` : 'FEATURED PRODUCTS'}
               </h2>
               <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <span className="text-xs text-gray-500">Show:</span>
                  <select className="text-xs border p-1 rounded">
                    <option>24 per page</option>
                    <option>48 per page</option>
                  </select>
                  <span className="text-xs text-gray-500">Sort:</span>
                  <select className="text-xs border p-1 rounded">
                    <option>Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
               </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white border rounded shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                    <div className="relative p-4 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover rounded group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <button className="bg-white/90 p-2 rounded-full shadow hover:text-red-600 transition-colors">
                          <i className="fa fa-heart"></i>
                        </button>
                        <button className="bg-white/90 p-2 rounded-full shadow hover:text-blue-600 transition-colors">
                          <i className="fa fa-share-alt"></i>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex-grow border-t">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">SKU: {product.sku}</div>
                      <h3 className="font-bold text-sm text-[#003366] hover:text-red-600 cursor-pointer mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mb-4">
                        <p className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</p>
                        <p className="text-[10px] text-gray-500">Price per {product.unit}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-2 rounded mb-4">
                        <table className="w-full text-[10px] text-gray-600">
                          <tbody>
                            {Object.entries(product.specifications).slice(0, 3).map(([k, v]) => (
                              <tr key={k}>
                                <td className="font-bold py-0.5">{k}:</td>
                                <td className="text-right">{v}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-auto flex gap-2">
                        <div className="flex border rounded overflow-hidden">
                          <button className="px-3 bg-gray-100 hover:bg-gray-200">-</button>
                          <input type="text" defaultValue="1" className="w-10 text-center text-xs border-x focus:outline-none" />
                          <button className="px-3 bg-gray-100 hover:bg-gray-200">+</button>
                        </div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="flex-grow bg-[#003366] text-white py-2 rounded text-sm font-bold hover:bg-[#004488] transition-colors"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded border border-dashed border-gray-300">
                 <i className="fa fa-search text-4xl text-gray-300 mb-4"></i>
                 <h3 className="text-xl font-bold text-gray-500">No products found for this query</h3>
                 <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                 <button onClick={() => {setSearchQuery(''); setSelectedCategory(null);}} className="mt-6 text-blue-600 hover:underline">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
           <div>
             <h4 className="text-white font-bold mb-6">ALLIED INDUSTRIAL</h4>
             <ul className="text-sm space-y-3">
               <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
               <li className="hover:text-white cursor-pointer transition-colors">Our History</li>
               <li className="hover:text-white cursor-pointer transition-colors">Sustainability</li>
               <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
               <li className="hover:text-white cursor-pointer transition-colors">Investor Relations</li>
             </ul>
           </div>
           <div>
             <h4 className="text-white font-bold mb-6">CUSTOMER SUPPORT</h4>
             <ul className="text-sm space-y-3">
               <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
               <li className="hover:text-white cursor-pointer transition-colors">Shipping Information</li>
               <li className="hover:text-white cursor-pointer transition-colors">Returns & Exchanges</li>
               <li className="hover:text-white cursor-pointer transition-colors">Credit Applications</li>
               <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
             </ul>
           </div>
           <div>
             <h4 className="text-white font-bold mb-6">SERVICES</h4>
             <ul className="text-sm space-y-3">
               <li className="hover:text-white cursor-pointer transition-colors">Inventory Management</li>
               <li className="hover:text-white cursor-pointer transition-colors">Machine Refurbishment</li>
               <li className="hover:text-white cursor-pointer transition-colors">Allied Vending Solutions</li>
               <li className="hover:text-white cursor-pointer transition-colors">Safety Consulting</li>
               <li className="hover:text-white cursor-pointer transition-colors">Custom Manufacturing</li>
             </ul>
           </div>
           <div>
             <h4 className="text-white font-bold mb-6">NEWSLETTER</h4>
             <p className="text-xs mb-4">Get the latest product news and exclusive offers delivered to your inbox.</p>
             <form className="flex">
               <input type="email" placeholder="Email Address" className="bg-gray-800 border-none rounded-l px-4 py-2 w-full text-sm focus:ring-1 focus:ring-red-600" />
               <button className="bg-red-600 text-white px-4 rounded-r font-bold hover:bg-red-700 transition-colors">JOIN</button>
             </form>
             <div className="flex space-x-4 mt-8">
                <i className="fab fa-facebook-f hover:text-white cursor-pointer transition-colors"></i>
                <i className="fab fa-twitter hover:text-white cursor-pointer transition-colors"></i>
                <i className="fab fa-linkedin-in hover:text-white cursor-pointer transition-colors"></i>
                <i className="fab fa-youtube hover:text-white cursor-pointer transition-colors"></i>
             </div>
           </div>
        </div>
        <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px]">
           <p>© 2024 Allied Industrial Parts, Inc. All rights reserved. 200 Allied Way, Industrial Park, OH 44101</p>
           <div className="flex space-x-4 mt-4 md:mt-0">
             <span className="hover:underline cursor-pointer">Privacy Policy</span>
             <span className="hover:underline cursor-pointer">Terms of Sale</span>
             <span className="hover:underline cursor-pointer">Accessibility Statement</span>
           </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <Assistant />
    </div>
  );
};

export default App;
