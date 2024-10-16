import { useEffect, useState } from "react";
import apiClient from "../helper/apiClient";
import { toast } from "react-toastify";
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {

    const [allusers, setAllUsers] = useState([]);
    const [model, setModel] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
        role: "",
        _id: "",
    })

    // this function get all the users from the backend 
    const getAllUsers = async () =>{
        
        const response = await apiClient.get('/user/allusers',
            {
                withCredentials: true,
            });
        
        const data = response.data;
        if(data.success) {
            setAllUsers(data.data)
        } else {
            toast.error(data.message)
        }
    }

    useEffect(()=>{
        getAllUsers();
    },[])

  return (
    <div className="relative">
        <table className="w-full userTable" border={1}>
            <thead>
                <tr className="bg-black text-white">
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    allusers?.map((item,index)=>(
                        <tr key={index}>
                            <td> {index+1} </td>
                            <td> {item?.name} </td>
                            <td> {item?.email} </td>
                            <td> {item?.role} </td>
                            <td> {moment(item?.createdAt).format('ll')} </td>
                            <td>
                                <button onClick={()=>{
                                    setCurrentUser(item)
                                    setModel(true);
                                    }} 
                                    className="bg-green-200 rounded-full p-2 cursor-pointer hover:bg-green-400 hover:text-white">
                                    
                                    <MdModeEdit size={20} />
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {
            model? (<ChangeUserRole onClose={()=>{setModel(false)}} 
                        name={currentUser.name} 
                        email={currentUser.email} 
                        role={currentUser.role}
                        userId={currentUser._id}
                        fetchFunc={getAllUsers}
                         />):""
        }
        
    </div>
  )
}

export default AllUsers;