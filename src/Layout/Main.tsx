import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'

function Main() {
  return (
    <div className="flex flex-col min-h-screen">

      <div>
        <Navbar />
      </div>

      
      <div className="flex-grow">
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Main
