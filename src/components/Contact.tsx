import React, { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you shortly.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-pink-700">Your Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-pink-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-pink-700">Your Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-pink-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-semibold text-pink-700">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-pink-200 rounded-lg"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg hover:bg-pink-700 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
