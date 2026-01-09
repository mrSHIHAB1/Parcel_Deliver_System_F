
import { User, Globe, Star } from "lucide-react";
import react from "../../assets/Profile.svg"


export  function About() {
  return (
    <div className="min-h-screen bg-gray-50  dark:bg-[#0F1F1A] transition-colors duration-300 text-gray-800 dark:text-gray-200 p-6">
      {/* Hero Section */}
     <div className="container mx-auto">
       <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About ShipZone
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We are committed to delivering your parcels safely and efficiently, making your shipping experience seamless and reliable.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-3 gap-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transform transition">
          <Globe className="w-10 h-10 text-teal-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300">
            To provide the most reliable and fastest parcel delivery service for individuals and businesses alike.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transform transition">
          <Star className="w-10 h-10 text-teal-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300">
            To revolutionize the parcel delivery industry with cutting-edge technology and unmatched customer service.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transform transition">
          <User className="w-10 h-10 text-teal-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Integrity, transparency, and customer satisfaction are at the core of everything we do.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Team Member */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transform transition text-center">
            <img src={react} alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="font-semibold text-lg mb-1">Shihab Rahman</h3>
            <p className="text-gray-600 dark:text-gray-300">CEO & Developer</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transform transition text-center">
            <img src={react} alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="font-semibold text-lg mb-1">Rahim Uddin</h3>
            <p className="text-gray-600 dark:text-gray-300">CTO</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transform transition text-center">
            <img src={react} alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="font-semibold text-lg mb-1">Fahim Montasir</h3>
            <p className="text-gray-600 dark:text-gray-300">Public Relation</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to ship with us?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Join thousands of satisfied customers and experience hassle-free parcel delivery.
        </p>
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
          Get Started
        </button>
      </section>
     </div>
    </div>
  );
}
