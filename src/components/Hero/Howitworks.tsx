import {
  Calendar,
  Package,
  Truck,
  Send
} from "lucide-react";

const steps = [
  {
    step: "Step 1",
    title: "Booking",
    description:
      "Schedule a pickup or drop-off by entering shipment details through our app or website.",
    icon: <Calendar size={28} />,
  },
  {
    step: "Step 2",
    title: "Packing",
    description:
      "Your package is securely packed and labeled to ensure safe handling during transit.",
    icon: <Package size={28} />,
  },
  {
    step: "Step 3",
    title: "Transportation",
    description:
      "The shipment is transported through our optimized delivery network for fast and reliable movement.",
    icon: <Truck size={28} />,
  },
  {
    step: "Step 4",
    title: "Delivery",
    description:
      "The package is delivered to the recipient’s address with real-time tracking updates.",
    icon: <Send size={28} />,
  },
];
const HowItWorks = () => { 
    return (
<div>
       <section className="relative bg-white dark:bg-[#0F1F1A] py-24 transition-colors">

      {/* Decorative stars */}
      <span className="absolute top-16 right-20 text-[#2BB38A] dark:text-[#4ADE80] text-3xl">✦</span>
      <span className="absolute bottom-16 left-20 text-[#F5B971] dark:text-[#FACC15] text-xl">✦</span>

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 ">
            <h2 className="text-3xl md:text-4xl font-bold text-[#17463C] dark:text-[#ECFDF5] ">
           How ShipZone work
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">

          {steps.map((item, index) => (
            <div key={index} className="relative text-center px-6">

              {/* Dotted divider */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-0 h-24 border-r-2 border-dashed border-[#CDEDE1] dark:border-[#1F4D40]" />
              )}

              {/* Icon */}
              <div className="mx-auto w-16 h-16 rounded-xl bg-[#2BB38A] dark:bg-[#22C55E] flex items-center justify-center text-white shadow-lg">
                {item.icon}
              </div>

              <p className="mt-4 text-sm text-gray-400">
                {item.step}
              </p>

              <h3 className="mt-2 text-lg font-semibold text-[#17463C] dark:text-[#ECFDF5]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
    <div className="py-16 bg-[#F3FBF7] dark:bg-[#0F1F1A] p-4">
        <div className="max-w-7xl mx-auto px-6 text-center ">
            <h2 className="text-3xl md:text-4xl font-bold text-[#17463C] dark:text-[#ECFDF5] ">
           Grow Your Business with ShipZone
          </h2>
        </div>
    </div>
</div>
    );
}
export default HowItWorks;