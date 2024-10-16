import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const { userData } = useContext(AppContext);

  return (
    // This is the admin panel of the web site
    <div className="min-h-[calc(100vh-120px)] hidden md:flex">
        {/** Aside panel of the admin panel */}
        <aside className="min-h-full w-full max-w-60 bg-white shadow-cus">
            <div className="flex flex-col items-center justify-center gap-4 ">
                {
                userData?.data?.profilePic ? (
                    <img src={userData?.data?.profilePic} alt={userData?.data?.name} className="w-20 h-20 border object-center rounded-full" />
                ):(<FaRegCircleUser className="text-5xl cursor-pointer" />)
                }
                <h5 className="font-medium tracking-wide text-xl capitalize"> {userData?.data?.name} </h5>
                <p className="text-sm tracking-wide font-light"> {userData?.data?.role} </p>
            </div>
            <div className="w-3/4 h-[1px] mt-2 bg-slate-300 rounded-xl mx-auto"></div>

            <div>
                <nav className="grid p-4">
                    <Link to={'allUsers'} className="p-2 hover:bg-slate-100 rounded-md">All Users</Link>
                    <Link to={'products'} className="p-2 hover:bg-slate-100 rounded-md">Products</Link>
                </nav>
            </div>

        </aside>

        {/** this is the outlet to render the users and all products */}
        <main className=" w-full h-full p-4">
            <Outlet />
        </main>

    </div>
  )
}

export default AdminPanel