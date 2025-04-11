import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-bold text-white-600 mb-6">About Us</h1>
      <p className="text-lg leading-relaxed text-black-700">
        Welcome to Esthithia! We are passionate about bringing you timeless style, bold beauty, and modern trends to inspire your everyday magic. 
        Our mission is to offer high-quality products that meet the needs of individuals who value uniqueness and excellence. 
        Join us in making every day a bit more magical!
      </p>
      <p className="text-lg leading-relaxed text-black-700 mt-6">
        We believe that fashion is more than just clothing – it's a way to express yourself. Esthithia offers a curated selection of clothing, accessories, and lifestyle products that blend comfort, beauty, and practicality. 
        Thank you for choosing us to be a part of your journey.
      </p>
    </div>
  );
};

export default About;
