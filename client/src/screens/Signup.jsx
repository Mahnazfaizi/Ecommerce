import { useState } from "react";
import LoginI from "../assets/Signin.gif";
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from '../helper/imageToBase64.js';
import apiClient from "../helper/apiClient.js";
import { toast } from "react-toastify";

const Signup = () => {

    const [passToggle, setPassToggle] = useState(false);
    const [confirmToggle, setConfirmToggle] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            name:"", 
            email:"", 
            password:"", 
            confirmPass: "",
            profilePic: ""
        });
  
    // this sotres the user input data to the state variable
    const handleForm = (e)=>{
      const {name, value} = e.target;
      setFormData((prev)=>({
        ...prev,
        [name]:value
      }))
    }

    // this function first converts the user selected to base64
    // then save it to the forData
    const handleUpload = async (e) =>{
        const file = e.target.files[0];
        const picture = await imageToBase64(file);
        setFormData((prev)=>({
            ...prev,
            profilePic: picture
        }))
    }

    // this function send the user input details to the backend server and stores 
    // it to the data
    const handleSubmit = async (e) =>{
      e.preventDefault();
      setIsSubmitting(true);

      try {
        
        if(formData.password === formData.confirmPass) {
          const response = await apiClient.post('/auth/register',
            formData,
            {
              headers: {
                'Content-Type' : 'application/json'
              }
            }
          );
          const data = response.data;
          if(data.success) {
            toast.success(data.message);
            navigate('/login')
          } else {
            toast.error(data.message);
          }
        } else {
          toast.warn("password and confirm password do not match")
        }

      } catch(err) {
        console.log(err);
        toast.error(err.message);
      }
      finally {
        setIsSubmitting(false);
      }

    }

  return (
    <section id="signup">
      
      <div className="container mx-auto p-4">
        <div id="form" className="bg-white py-4 px-4 max-w-sm mx-auto rounded-md">
            
            <div className="w-20 h-20 mx-auto relative group overflow-hidden rounded-full">
                <img src={formData.profilePic || LoginI} alt="signup icon" className="w-20 h-20 mx-auto" />
                <form>
                    <input type="file" name="" id="fileUP" hidden onChange={handleUpload} />
                    <label htmlFor="fileUP" className='text-xs cursor-pointer bg-slate-200 text-center py-2 absolute bottom-0 opacity-80 translate-y-12 group-hover:translate-y-0 transition-all duration-150 ease-linear font-medium rounded-t-full'>Upload Picture</label>
                </form>
            </div>

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

          <div>
              <label htmlFor="">Name:</label>
              <div className="bg-slate-100 p-2">
                <input type="text" required value={formData.name} name="name" onChange={handleForm} placeholder="Enter your name"  className="w-full h-full outline-none bg-transparent"/>
              </div>
            </div>
          
            <div>
              <label htmlFor="">Email:</label>
              <div className="bg-slate-100 p-2">
                <input type="email" required value={formData.email} name="email" onChange={handleForm} placeholder="Enter email"  className="w-full h-full outline-none bg-transparent"/>
              </div>
            </div>

            <div>
              <label htmlFor="">Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input type={passToggle?"text":"password"} value={formData.password} required name="password" onChange={handleForm} placeholder="Enter password" className="w-full h-full outline-none bg-transparent" />
                <span>
                  {
                    passToggle? <FaEyeSlash className="cursor-pointer" onClick={()=>{setPassToggle(prev=>!prev)}} />
                    : <FaEye className="cursor-pointer" onClick={()=>{setPassToggle(prev=>!prev)}} />
                  }
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="">Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input type={confirmToggle?"text":"password"} value={formData.confirmPass} required name="confirmPass" onChange={handleForm} placeholder="Confirm password" className="w-full h-full outline-none bg-transparent" />
                <span>
                  {
                    confirmToggle? <FaEyeSlash className="cursor-pointer" onClick={()=>{setConfirmToggle(prev=>!prev)}} />
                    : <FaEye className="cursor-pointer" onClick={()=>{setConfirmToggle(prev=>!prev)}} />
                  }
                </span>
              </div>
            </div>

            <button disabled={isSubmitting} className={` ${isSubmitting?"bg-green-200":""} bg-green-400 mx-auto block text-white px-8 py-2 rounded-full mt-4 hover:scale-110 transition-all duration-150 ease-linear hover:opacity-80`}>{isSubmitting? "Loading..." : "Sign up"}</button>
          
          </form>

          <p className="mt-5 block mx-auto">Already have a account ? <Link to={'/login'} className="text-green-400 hover:underline hover:text-green-500">Login</Link></p>
        
        </div>
      </div>
    
    </section>
  )
}

export default Signup;