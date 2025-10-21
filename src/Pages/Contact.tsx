import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export  function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (API call or email)
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Have questions or want to work with us? Fill out the form and we’ll get back to you soon.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <MapPin className="w-5 h-5 text-teal-500" />
              <span>123 Parcel Street, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <Phone className="w-5 h-5 text-teal-500" />
              <span>+880 1234 567 890</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <Mail className="w-5 h-5 text-teal-500" />
              <span>support@parcelservice.com</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Us</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
          />

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-transform transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
