import HeroPage from "../../components/Hero/Hero"

import ParcelTrackingPage from "../Tracking/Tracking"

function Home() {
  return (
    <div className="dark:bg-gray-800 h-screen ">
    
    <HeroPage></HeroPage>
      <ParcelTrackingPage></ParcelTrackingPage>
      {/* <div><Features></Features></div> */}
   
      
    </div>
  )
}

export default Home