import React from 'react';
import clothe1 from '../assets/clothe2.jpeg';
import clothe2 from '../assets/clothe6.jpeg';
import clothe3 from '../assets/clothe4.jpeg';
import logo from '../assets/running.jpg';
import outfit from '../assets/outfit.jpeg';

const Home: React.FC = () => {
  return (
    <div className="background: #10a3de;
background: linear-gradient(90deg, rgba(16, 163, 222, 1) 0%, rgba(71, 164, 201, 1) 50%, rgba(83, 206, 237, 1) 100%);">

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto p-8 md:p-16 space-y-10 md:space-y-0 md:space-x-12">
        {/* Text Section */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold text-dodger blue-500 mb-4">✨ Esthithia</h2>
          <p className="text-lg text-dodger blue-800 leading-relaxed">
            Where timeless style, bold beauty, and modern trends meet to inspire your everyday magic.  
          </p>
        </div>

        {/* Hero Image */}
        <img
          src={logo}
          alt="Hero"
          className="w-full md:w-[450px] h-auto rounded-3xl shadow-2xl border-4 border-white object-cover"
        />
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <h3 className="text-2xl font-bold text-center text-#0E3386-700 mb-8"> Outfits</h3>
        <div className="flex justify-center flex-wrap gap-6">
          {[clothe2, clothe3, clothe1, outfit].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Clothing ${i + 1}`}
              className="w-60 h-80 object-cover rounded-2xl shadow-lg border-4 border-white transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      </div>

      {/* Push Footer to Bottom */}
      <div className="mt-auto" />
    </div>
  );
};

export default Home;
