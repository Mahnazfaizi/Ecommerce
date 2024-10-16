import { useContext, useState } from "react";
import LoginI from "../assets/Signin.gif";
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../helper/apiClient";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {

  // this state variable is used to toggle the password input to 
  // text or password
  const [passToggle, setPassToggle] = useState(false);
  // this state variable stores the form data like email and password
  const [formData, setFormData] = useState({email:"", password:""});
  // this state variable is used to check the submitting state 
  // like if form data is sending to server then disable the buttons
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { fetchUserDetails, fetchCartQuantity } = useContext(AppContext);

  const navigate = useNavigate();

  // set all the input fields data to the state variable
  const handleForm = (e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  // this function is used to send the user input email and password to 
  // the backend server to check if they are correct or not.
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const response = await apiClient.post('/auth/login',
        formData,
        {
          headers: {
            'Content-Type' : 'application/json'
          },
          withCredentials: true
        },
      );
      const data = response.data;
      if(data.success) {
        toast.success(data.message);
        navigate('/')
        fetchUserDetails();
        fetchCartQuantity();
      } else {
        toast.error(data.message);
      }

    } catch(err) {
      toast.error(err.message);
    }
    finally {
      setIsSubmitting(false);
    }
  
  }


  return (
    <section id="login">
      
      <div className="container mx-auto p-4">
        <div id="form" className="bg-white py-4 px-4 max-w-sm mx-auto rounded-md">
        
          <img src={LoginI} alt="login icon" className="w-20 h-20 mx-auto rounded-full" />

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          
            <div>
              <label htmlFor="">Email:</label>
              <div className="bg-slate-100 p-2">
                <input type="email" value={formData.email} name="email" onChange={handleForm} placeholder="Enter email"  className="w-full h-full outline-none bg-transparent"/>
              </div>
            </div>

            <div>
              <label htmlFor="">Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input type={passToggle?"text":"password"} value={formData.password} name="password" onChange={handleForm} placeholder="Enter password" className="w-full h-full outline-none bg-transparent" />
                <span>
                  {
                    passToggle? <FaEyeSlash className="cursor-pointer" onClick={()=>{setPassToggle(prev=>!prev)}} />
                    : <FaEye className="cursor-pointer" onClick={()=>{setPassToggle(prev=>!prev)}} />
                  }
                </span>
              </div>
              <Link to={"/forgotPass"} className="w-fit ml-auto block italic tracking-wide hover:underline hover:text-green-500">Forgot password ?</Link>
            </div>

            <button disabled={isSubmitting} className={`${isSubmitting? "bg-green-200":""} bg-green-400 mx-auto block text-white px-8 py-2 rounded-full mt-4 hover:scale-110 transition-all duration-150 ease-linear hover:opacity-80`}> {isSubmitting? "Loading...": "Login"} </button>
          
          </form>

          <p className="mt-5 block mx-auto">Don&apos;t have a account ? <Link to={'/signup'} className="text-green-400 hover:underline hover:text-green-500">Sign up</Link></p>
        
        </div>
      </div>
    
    </section>
  )
}

export default Login