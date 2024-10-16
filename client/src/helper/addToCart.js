import apiClient from "./apiClient";
import { toast } from 'react-toastify';

export const addToCart = async (e,id) =>{
    e.stopPropagation();
    e.preventDefault();

    // This function sends the post request to the backend server with the productId
    // and add the product to the cart
    const response = await apiClient.post('/cart/addToCart',
        {
            productId: id
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
        toast.success(data?.message)
    } else {
        toast.error(data?.message);
    }

    return data?.data;
}