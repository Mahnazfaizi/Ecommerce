import { AppContext } from "./AppContext";
import apiClient from "../helper/apiClient";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AppProvider = ({children}) => {

    const [userData, setUserData] = useState({});
    const [quantity, setQuantity] = useState(0);


    // this function is used to fetch the current logged in user details from backend
    const fetchUserDetails = async () =>{
        const response = await apiClient.get(
          '/user/details',
          {
            withCredentials: true
          }
        );
        const data = response.data;
        if(data.success) {
            setUserData(data)
        }
      }

      // This function is used to fetch the current updated cart quantity from backend
      const fetchCartQuantity = async () =>{
        const response = await apiClient.get('/cart/getQuantity',
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
    
        const data = response.data;
        setQuantity(data?.data?.count);
      }

  return (
    <AppContext.Provider value={{fetchUserDetails, userData, setUserData, fetchCartQuantity, quantity}}>
        {children}
    </AppContext.Provider>
  )
}

export default AppProvider;