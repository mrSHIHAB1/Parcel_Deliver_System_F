import HeroPage from "../../components/Hero/Hero"
import HowItWorks from "../../components/Hero/Howitworks"
import LogoMarquee from "../../components/Hero/LogoMarquee"
import { Footer } from "../../Layout/Footer"

import ParcelTrackingPage from "../Tracking/Tracking"

function Home() {
  return (
    <div className="dark:bg-gray-800 h-screen  ">
    
    <HeroPage></HeroPage>
      {/* <ParcelTrackingPage></ParcelTrackingPage> */}
      {/* <div><Features></Features></div> */}
   <LogoMarquee></LogoMarquee>
      <HowItWorks></HowItWorks>

      <Footer></Footer>
    </div>
  )
}

export default Home