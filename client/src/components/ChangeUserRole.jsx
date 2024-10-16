import { useState } from "react";
import { Role } from "../helper/role";
import { IoMdClose } from 'react-icons/io';
import apiClient from "../helper/apiClient";
import { toast } from "react-toastify";


// eslint-disable-next-line react/prop-types
const ChangeUserRole = ({name, email, role, onClose, userId, fetchFunc}) => {

    // handling user role state
    const [userRole, setUserRole] = useState(role);


    const handleChange = (e) =>{
        setUserRole(e.target.value);
    }

    // This function sends post request to backend wiht the updated role
    // and userId of the user to update it's role in database
    const updateUser = async () =>{
        const response = await apiClient.post('/user/updateuser', 
            {
                userId: userId,
                role: userRole,
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );

        const data = response.data;
        if(data?.success) {
            toast.success(data?.message);
            onClose();
            fetchFunc();
        } else {
            toast.error(data?.message);
        }
    }

  return (
    <div className="fixed bg-slate-200 bg-opacity-50 inset-0 w-full h-full p-4 border flex items-center justify-center rounded-lg  shadow-md">
        
        <div className=" relative max-w-sm z-20 h-fit flex flex-col gap-3 p-6 rounded-lg shadow-md bg-white">
            <div onClick={onClose} className="absolute -top-2 -right-2 cursor-pointer hover:bg-red-500 bg-red-400 w-fit p-2 rounded-full text-white">
                <IoMdClose size={18} />
            </div>
            <h1 className="text-xl font-semibold tracking-wide pb-4 ">Change User Role</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>

            <div className="flex items-center gap-2">
                <p>Role:</p>
                <select className="border px-2 py-1 rounded-md outline-none" value={userRole} onChange={handleChange}>
                    {
                        // mapping over the Role js file and displaying all the availble roles
                        Object.values(Role).map(item=>(
                            <option value={item} key={item}>{item}</option>
                        ))
                    }
                </select>
            </div>
            
            {/** This button updates the user role by sending request to backend */}
            <button onClick={updateUser} className="border py-1 rounded-md bg-green-400 text-white font-medium hover:opacity-80"> Change Role</button>
            
        </div>
    </div>
  )
}

export default ChangeUserRole;

{/** 5:08:34 */}