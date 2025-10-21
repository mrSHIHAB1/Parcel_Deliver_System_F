import React from "react";
import { Truck, Clock, Shield, MapPin, DollarSign, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-10 h-10 text-teal-500" />,
    title: "Fast Delivery",
    description: "Get your parcels delivered quickly with our optimized routes and express options.",
  },
  {
    icon: <Clock className="w-10 h-10 text-teal-500" />,
    title: "Real-Time Tracking",
    description: "Track your parcels in real-time and stay updated at every step of the journey.",
  },
  {
    icon: <Shield className="w-10 h-10 text-teal-500" />,
    title: "Secure Packaging",
    description: "Your parcels are handled with care and delivered safely with secure packaging.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-teal-500" />,
    title: "Wide Coverage",
    description: "We deliver to cities and remote areas with ease, covering nationwide destinations.",
  },
  {
    icon: <DollarSign className="w-10 h-10 text-teal-500" />,
    title: "Affordable Pricing",
    description: "Enjoy competitive rates and value-for-money services without hidden charges.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-teal-500" />,
    title: "Reliable Service",
    description: "Our trusted service ensures your parcels arrive on time, every time.",
  },
];

export  function Features() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Features</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We provide a top-notch parcel delivery experience with speed, security, and reliability.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6 py-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transform transition text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Experience Premium Parcel Delivery</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Join thousands of happy customers who trust us with their parcels every day.
        </p>
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
          Get Started
        </button>
      </section>
    </div>
  );
}
