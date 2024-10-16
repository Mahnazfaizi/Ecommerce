import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'

const App = ()=> {
  
  const { fetchUserDetails, fetchCartQuantity,} = useContext(AppContext);
  

  useEffect(()=>{
    fetchUserDetails();
    fetchCartQuantity();
  },[])

  return (
    <>
       {/**t Top header */}
        <Header />
        {/** Main body */}
        <main className='min-h-[calc(100vh-120px)] mt-16'>
          <Outlet />
        </main>
        {/** footer part */}
        <Footer />
        <ToastContainer position='bottom-right' />
    </>
  )
}

export default App
