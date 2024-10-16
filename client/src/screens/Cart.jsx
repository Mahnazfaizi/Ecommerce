import { useContext, useEffect, useState } from "react";
import apiClient from "../helper/apiClient";
import { AppContext } from "../context/AppContext";
import { displayAFNCurrency } from "../helper/displayCurrency";
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { RiDeleteBin5Fill } from "react-icons/ri";

const Cart = () => {

    // state variable to store all the user cart products
    const [cartItems, setCartItems] = useState([]);
    const [loading ,setLoading] = useState(false);

    const { quantity, fetchCartQuantity } = useContext(AppContext);

    const totalQuantity = cartItems.reduce((prev,curr)=>prev + (curr?.quantity),0);
    const totalPrice = cartItems.reduce((prev,curr)=>prev + (curr?.quantity * curr?.productId?.sellingPrice),0);

    // this function is used to user cart items from the backend
    const fetchCartItems = async () =>{
        setLoading(true);
        const response = await apiClient.get('/cart/getCartProducts',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        
        const data = response.data;
        if(data.success) {
            setCartItems(data?.data);
        }

        setLoading(false);
    }

    // this function update the cart quantity by one 
    const updateQuantity = async (id,currQ) =>{
        try {
            const response = await apiClient.post('/cart/updateQuantity',
                {
                    productId: id,
                    quantity: currQ + 1,
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
                fetchCartItems();
            }
        } catch(err) {
            console.error("Error updating quantity", err)
        }
    }

    // this function descrement the cart quantity by one 
    const decrementQuantity = async (id,currQ) =>{
        try {
           if(currQ >=2) {
                const response = await apiClient.post('/cart/updateQuantity',
                    {
                        productId: id,
                        quantity: currQ - 1,
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
                    fetchCartItems();
                }
           }
        } catch(err) {
            console.error("Error updating quantity", err)
        }
    }

    // this function deteles the product from the userCart
    const handleDelete = async (id) =>{
        
        try {
            const response = await apiClient.post('/cart/deleteItem',
                {
                    productId: id
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
    
            const data = response.data;
            if(data?.success) {
                fetchCartItems();
                fetchCartQuantity();
            }
        } catch(err) {
            console.error("Error deleting item from cart :" , err);
        }
    }

    useEffect(()=>{
        fetchCartItems();
    },[]);

  return (
    <div className="">

        {
            <div className="text-center p-1 text-xl md:text-2xl font-medium">
                {
                    cartItems.length===0 && !loading && (
                        <p>No product is in the cart...</p>
                    )
                }
            </div>
        }

        <div className="flex flex-col p-2 lg:justify-between gap-10 lg:flex-row">
            <div className="w-full max-w-2xl ">
                
                {
                    loading? (
                        Array.from({length: quantity}).map((_,index)=>(
                        <div key={index} className="w-full rounded-md my-2 bg-slate-200 h-32 animate-pulse">
                        </div>
                        ))
                        
                    ):(
                        <div className="p-4">
                            {
                                cartItems?.map((item,index)=>(
                                <div key={index+"item"} className="flex w-full rounded-md my-2 bg-white shadow-sm h-32 grid-cols-[128px,1fr]">
                                        
                                        {/**image container */}
                                    <div className="min-w-28 max-w-28 h-full bg-slate-200">
                                        <img src={item?.productId?.productImage[0]} alt="" className=" p-2 mix-blend-multiply w-full h-full object-contain" />
                                    </div>

                                    <div className=" relative py-2 px-4 w-full flex flex-col gap-1">
                                        {/** To delete product from cart */}
                                        <div className="absolute right-2 cursor-pointer p-1 rounded-full hover:bg-red-600 hover:text-white top-2 text-red-500">
                                            <RiDeleteBin5Fill size={20} onClick={()=>{handleDelete(item?._id,)}} />
                                        </div>
                                        
                                        <h2 className="text-lg lg:text-xl w-[90%] h-fit text-ellipsis line-clamp-1"> {item?.productId?.productName} </h2>
                                        <p className="capitalize font-medium text-slate-400"> {item?.productId?.category} </p>
                                        
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium text-lg">{displayAFNCurrency(item?.productId?.sellingPrice)}</p>
                                            <p className="font-semibold text-lg">Total: {displayAFNCurrency((item?.productId?.sellingPrice) * item?.quantity)}</p>
                                        </div>

                                        <div className="flex gap-4 border px-1 rounded-md items-center justify-center w-fit">
                                            <button className="border-r hover:bg-slate-50" onClick={()=>{decrementQuantity(item._id,item?.quantity)}}> <IoIosRemove size={20} /> </button>
                                            <span> {item?.quantity} </span>
                                            <button className="border-l hover:bg-slate-100" onClick={()=>{updateQuantity(item._id,item?.quantity)}}> <IoIosAdd size={20} /> </button>
                                        </div>
                                    </div>

                                </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            
            <div className="p-4 w-full flex justify-center lg:justify-end ">
                {
                    loading? (
                    <div className="h-36 bg-slate-200 w-full lg:m-2 max-w-sm rounded-md animate-pulse">    
                    </div>
                    ):(
                    <div className="h-fit sticky top-[5rem] bg-white shadow-md w-full max-w-sm rounded-md lg:m-2">
                        <h1 className="text-lg font-medium rounded-tl-md rounded-tr-md bg-green-400 p-2 text-white">Summary</h1>
                        <div className="px-2 py-1 flex items-center justify-between gap-2 font-medium text-lg">
                            <p> Quantity</p> 
                            <p>{totalQuantity} </p>
                        </div>
                        
                        <div className="px-2 py-1 flex items-center justify-between gap-2 font-medium text-lg">
                            <p>Total Price</p>
                            <p>{displayAFNCurrency(totalPrice)}</p>
                        </div>

                        <button className="text-lg w-full font-medium rounded-bl-md rounded-br-md bg-blue-600 text-white px-2 py-1">Payment</button>
                    
                    </div>
                    )
                }
            </div>
        
        </div>

    </div>
  )
}

export default Cart;