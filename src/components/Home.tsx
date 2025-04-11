// import React from 'react'
// import running from '../assets/running.jpg'
// import clothe from '../assets/clothe1.jpeg'
// import {Link} from "react-router-dom";
import clothe1 from '../assets/clothe2.jpeg'
import clothe2 from '../assets/clothe6.jpeg'
import clothe3 from '../assets/clothe4.jpeg'
// import Navbar from './Navbar'

function Home() {
  return (
    <div className="">
        {/* <Navbar/> */}
    <div className="flex items-center bg-white p-6 rounded-2xl shadow-md space-x-8 relative top-1">
  {/* Text Section */}
  <div className="max-w-md text-pink-800 font-semibold text-lg leading-relaxed bg-white p-6 rounded-2xl shadow-lg">
  <h2 className="text-2xl text-pink-600 font-bold mb-2">✨ Esthithia</h2>
  <p className="text-pink-700">
    Where timeless style, bold beauty, and modern trends meet to inspire your everyday magic.
  </p>
</div>

  {/* Image Section - Inline */}
  <div className="flex flex-row space-x-4">
    <img
      src={clothe2}
      alt="Running Product"
      className="w-40 h-auto object-contain drop-shadow-xl border-4 border-pink-500 rounded-xl"
    />
    <img
      src={clothe3}
      alt="Clothing Product"
      className="w-40 h-auto object-contain drop-shadow-xl border-4 border-pink-500 rounded-xl"
    />
    <img
      src={clothe1}
      alt="Clothing Product"
      className="w-40 h-auto object-contain drop-shadow-xl border-4 border-pink-500 rounded-xl"
    />
  </div>
</div>
</div>
  )
}

export default Home