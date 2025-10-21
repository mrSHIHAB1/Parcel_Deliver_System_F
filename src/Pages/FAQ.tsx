import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // optional arrow icon

const faqs = [
  {
    question: "How do I track my parcel?",
    answer:
      "You can track your parcel by entering the tracking ID on the tracking page. You’ll receive real-time updates.",
  },
  {
    question: "What are the delivery charges?",
    answer:
      "Delivery charges depend on the parcel weight, distance, and delivery speed. You can calculate fees before booking.",
  },
  {
    question: "Can I reschedule my delivery?",
    answer:
      "Yes, you can reschedule deliveries up to 24 hours before the expected delivery time via your dashboard.",
  },
  {
    question: "Is my parcel insured?",
    answer:
      "All parcels are insured for damages or loss during transit. Contact support for claims.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Find answers to the most common questions about our parcel delivery service.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none group"
              >
                <span className="text-gray-800 dark:text-gray-200 font-semibold">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-max-height duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-96 py-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
