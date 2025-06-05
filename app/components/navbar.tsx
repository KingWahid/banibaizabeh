import React from 'react'

const Navbar = () => {
  return (
    <>
      
  <header
    className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative z-10"
  >
    <div className="text-black font-normal text-lg">Banibazabeh</div>
    <nav className="hidden md:flex space-x-8 text-sm font-normal text-black">
      <a className="hover:underline" href="#">Products</a>
      <a className="hover:underline" href="#">About</a>
      <a className="hover:underline" href="#">Reviews</a>
    </nav>
    <div className="flex items-center space-x-4">
      <button aria-label="Search" className="text-black text-lg focus:outline-none">
        <i className="fas fa-search"></i>
      </button>
      <button
        aria-label="Cart"
        className="bg-orange-500 hover:bg-orange-600 transition-colors duration-300 rounded-md p-2 text-white focus:outline-none"
      >
        <i className="fas fa-shopping-cart"></i>
      </button>
    </div>
    </header>
    </>
  )
}

export default Navbar
