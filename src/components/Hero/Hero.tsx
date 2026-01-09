import { LocateFixed } from "lucide-react";
import courierImg from "../../assets/courierimg.png"
import { Link } from "react-router-dom";
const HeroPage = () => {
  return (
    <div className="">
         <section className="relative overflow-hidden  dark:bg-[#0F1F1A] transition-colors duration-300">

      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#DDF4EA] dark:bg-[#1E3A34] rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#E6F8F1] dark:bg-[#16312A] rounded-full blur-3xl"></div>

      {/* Decorative stars */}
      <span className="absolute top-20 left-1/2 text-[#2BB38A] dark:text-[#4ADE80] text-2xl">✦</span>
      <span className="absolute top-40 right-32 text-[#F5B971] dark:text-[#FACC15] text-xl">✦</span>
      <span className="absolute bottom-32 left-20 text-[#2BB38A] dark:text-[#4ADE80] text-lg">✦</span>

      {/* Decorative dots */}
      <div className="absolute right-24 top-24 grid grid-cols-6 gap-2 opacity-30">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-[#2BB38A] dark:bg-[#4ADE80] rounded-full"
          ></span>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#17463C] dark:text-[#ECFDF5] leading-tight">
              Largest and reliable <br />
              courier service
            </h1>

            <div className="inline-block mt-4 px-4 py-2 border-2 border-[#2BB38A] dark:border-[#4ADE80]
              text-[#17463C] dark:text-[#ECFDF5]
              text-xl font-semibold rounded-md
              bg-[#E9FBF4] dark:bg-[#1B3A32]">
              in your city
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              Experience fast and reliable courier services with our advanced tracking system. Stay updated on your parcel's journey in time. Trust us for secure and timely deliveries, every time.
            </p>

            {/* SEARCH BOX */}
            <div className="mt-6  dark:bg-[#122A24] rounded-md  overflow-hidden flex">
              <Link to="/track">
              <button 
              
              className="p-4  rounded bg-[#2BB38A] dark:bg-[#22C55E] flex
                px-6 text-white font-semibold
                hover:bg-[#239c78] dark:hover:bg-[#16A34A]
                transition">
                <LocateFixed className="mr-2" /><p>Track Parcel</p>
              </button>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={courierImg}
              alt="Courier Delivery"
              className="w-full max-w-lg z-10"
            />
          </div>

        </div>
      </div>
    </section>

    </div>
  )
}
export default HeroPage;