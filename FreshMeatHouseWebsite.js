import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const FreshMeatHouseWebsite = () => {
  console.log("FreshMeatHouseWebsite component loaded");

  const products = [
    { name: "Ribeye Steak", price: "$11.99/lb", img: "/images/raw-ribeye-steak.jpg" },
    { name: "T-Bone Steak", price: "$11.99/lb", img: "/images/raw-tbone-steak.jpg" },
    { name: "Sirloin Steak", price: "$11.99/lb", img: "/images/raw-sirloin-steak.jpg" }
  ];

  useEffect(() => {
    console.log("Products loaded:", products);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-wide">Fresh Meat House</h1>
          <nav className="space-x-4 text-lg">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#shop" className="hover:underline">Shop</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-[500px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url("/images/raw-ribeye-steak.jpg")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div className="text-center z-10 p-6 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-5xl font-extrabold text-white drop-shadow-md">Fresh Meat Delivered to Your Doorstep</h2>
          <p className="text-white mt-4 text-lg">Delivery Only | Order Now for Evening Deliveries</p>
          <Button className="mt-6 bg-white text-red-600 px-6 py-3 font-bold hover:bg-red-100" onClick={() => console.log("Shop Now button clicked")}>Shop Now</Button>
        </motion.div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Our Meat Selection</h2>
          <p className="text-gray-700 mb-8 text-center">We deliver fresh, high-quality meats to your home every evening. Pre-order now to enjoy our premium cuts.</p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
            {products.map((product, index) => (
              <motion.div key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <Card className="hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-2">
                  <img src={product.img} alt={product.name} className="rounded-t-lg" />
                  <CardContent>
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                    <Button className="mt-4 w-full bg-red-600 text-white" onClick={() => console.log(`${product.name} added to cart`)}>Add to Cart</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">Fresh Meat House specializes in providing top-quality meats delivered straight to your doorstep. We are a delivery-only service, operating with a commitment to freshness and customer convenience.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-8">Have questions? Contact us for more information about our products or delivery services.</p>
          <form className="max-w-md mx-auto space-y-4">
            <Input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg" onChange={(e) => console.log("Name input changed: ", e.target.value)} />
            <Input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-lg" onChange={(e) => console.log("Email input changed: ", e.target.value)} />
            <textarea placeholder="Your Message" className="w-full p-4 border rounded-lg h-32 resize-none" onChange={(e) => console.log("Message input changed: ", e.target.value)}></textarea>
            <Button className="w-full bg-red-600 text-white py-3 font-bold hover:bg-red-700" onClick={() => console.log("Contact form submitted")}>Send Message</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-6 text-center">
        <p>&copy; 2025 Fresh Meat House. Delivery Only. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FreshMeatHouseWebsite;
