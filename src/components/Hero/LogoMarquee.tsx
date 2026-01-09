
import htbazar from "../../assets/htbazar.png";
import lotto from "../../assets/lotto.png";
import naturo from"../../assets/naturo-01.png";
import rokomari from "../../assets/rokomari.png";
import sailor from "../../assets/sailor.png";
import sm_ghor from "../../assets/sm_ghor.png";
import sm_online from "../../assets/sm_online.png";
import othoba from "../../assets/othoba.png";

const logos = [
htbazar,
lotto,
naturo,
rokomari,
sailor,
sm_ghor,
sm_online,
othoba,
];

export default function LogoMarquee() {
  return (
    <div className="relative overflow-hidden bg-[#E9FBF4] dark:bg-[#0F1F1A] py-8">
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#E9FBF4] dark:from-[#0F1F1A] to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#E9FBF4] dark:from-[#0F1F1A] to-transparent z-10" />

      {/* Marquee */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="mx-10 flex items-center justify-center"
          >
            <img
              src={logo}
              alt="brand"
              className="h-8 md:h-10 opacity-80 dark:opacity-90"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
