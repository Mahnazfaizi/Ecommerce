import Logo from "../assets/logo-no-background.svg"
import { GrSearch } from 'react-icons/gr'
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import apiClient from "../helper/apiClient";
import { toast } from "react-toastify";
import { useState } from 'react';
import { Role } from "../helper/role";

const Header = () => {

  const { userData, setUserData, quantity } = useContext(AppContext);

  const [menuToggle, setMenuToggle] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // funciton to handle the logout action
  const handleLogout = async () => {
    const response = await apiClient.get('/auth/logout',
      {
        withCredentials: true,
      });

      if(response.data.success) {
        toast.success(response.data.message);
        setUserData(null);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
  }

  // this function handles the search bar text
  const handleSearch = (e) =>{
    const { value } = e.target;
    setSearchText(value);
    if(value){
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  }

  // This the main top header of the page

  return (
    <header className=" fixed top-0 z-30 h-16 w-screen shadow-md bg-white">
      <div className="h-full w-full flex items-center justify-between container mx-auto">
        {/**Logo */}
        <Link to={'/'}>
          <div><img src={Logo} width={100} height={60} alt="Logo" className="" /></div>
        </Link>
       
       {/**Search bar */}
        <div className="hidden lg:flex overflow-hidden h-[35px] gap-2 items-center w-full max-w-sm justify-between border rounded-full">
          <input onChange={handleSearch} value={searchText} type="text" placeholder="Search product here..." className="outline-none w-full py-2 pl-3" />
          <GrSearch className="bg-green-400 p-1 min-w-[50px] h-full text-white text-xl cursor-pointer" />
        </div>

        {/**account */}
        <div className="flex items-center justify-center gap-7 ">
          
          <div className="relative group flex flex-col items-center justify-center" onClick={()=>{setMenuToggle(prev=>!prev)}}>
            {
              userData?.data?._id&& (
                  userData?.data?.profilePic ? (
                    // display the user profile or default icon
                    <img src={userData?.data?.profilePic} alt={userData?.data?.name} className="w-10 h-10 rounded-full cursor-pointer" />
                  ):(<FaRegCircleUser className="text-2xl cursor-pointer" />)
              )
            }
            

            {
              menuToggle && userData?.data?.role=== Role.ADMIN ? (
                // This is the drop down menu which have the option to open admin panel
                // only if the user role is admin
                <div className="absolute z-20 hidden md:block bg-white border bottom-0 top-10 shadow-lg rounded-md h-fit p-4">
                  <nav className="">
                  <Link to={'/admin-panel/products'} className=" text-nowrap hover:bg-slate-100 rounded-sm p-2">Admin Panel</Link>
                    {/* {
                      (userData?.data?.role === Role.ADMIN) ?
                      ():""
                    } */}
                  </nav>
                </div>
              ):""
            }
          </div>
           
          
          <Link to={'/userCart'} className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
            {
              userData?.data?._id && (
                <p className="bg-green-400 w-5 h-5 font-medium text-white text-xs flex rounded-full items-center justify-center absolute -top-3 -right-3 p-1"> {quantity} </p>
              )
            }
            
          </Link>

          <div>
          {
            userData?.data?._id ? (<button onClick={handleLogout} className="bg-green-400 px-3 py-1 rounded-full text-white hover:opacity-80">Logout</button>):
            (<Link to={'/login'} className="bg-green-400 px-3 py-1 rounded-full text-white hover:opacity-80">Login</Link>)
          }
          </div>
        
        </div>

      </div>
    </header>
  )
}

export default Header