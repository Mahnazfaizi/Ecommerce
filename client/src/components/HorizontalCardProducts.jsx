import { useContext, useEffect, useState } from "react";
import { fetchCategoryWiseProducts } from "../helper/fetchCategoryWiseProducts";
import { displayAFNCurrency } from "../helper/displayCurrency";
import { Link } from "react-router-dom";
import { addToCart } from "../helper/addToCart";
import { AppContext } from "../context/AppContext";

// eslint-disable-next-line react/prop-types
const HorizontalCardProducts = ({category, heading}) => {

    // setting data to this state variable after fetching it from the 
    // backend server using the fetchCategoryWiseProducts
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { fetchCartQuantity } = useContext(AppContext);

    // this function fetch the product from particular category from the backend
    const fetchProductData = async () =>{
        setLoading(true);
        const data = await fetchCategoryWiseProducts(category);
        setData(data?.data);
        setLoading(false);
    }

    // this function handle addToCart function using to update the product into cart
    const handleAddToCart = async (e, id) =>{
        await addToCart(e, id);
        fetchCartQuantity();
    }

    useEffect(()=>{
        fetchProductData();
    },[]);

    //This component displays the product from a particular category
  return (
    <div className="mx-auto p-4">
        
        <h2 className="text-2xl font-semibold"> {heading} </h2>

        <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-hidden">
            {
                loading? (
                    Array.from({length: 5}).map((_,index)=>(
                    <div key={index} className="w-full min-w-[280px] mt-5 md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                        <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] animate-pulse">
                        </div>
                
                        <div className="p-4 grid gap-2 w-full">
                            <h2 className="font-medium text-ellipsis bg-slate-200 rounded-md line-clamp-1 text-base md:text-md animate-pulse ">  </h2>
                            <p className=" capitalize bg-slate-200 p-1 rounded-md"></p>
                            
                            <div className="flex gap-2 w-full">
                                <p className="bg-slate-200 font-medium p-1 w-full animate-pulse rounded-md">  </p>
                                <p className=" line-through bg-slate-200 p-1 w-full animate-pulse rounded-md"></p>
                            </div>

                        <button className="outline-none bg-slate-200 animate-pulse w-full px-2 py-1 rounded-md transition-all duration-150 ease-linear" ></button>

                        </div>
                    </div>
                    ))
                ):(
                data?.map((item,index)=>(
                <Link to={`/productDetail/${item?._id}`} 
                      key={index+item?.category} 
                      className="w-full min-w-[280px] mt-5 md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                      onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})}
                      >

                    <div className="bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] group ">
                        <img src={item?.productImage[0]} alt={item?.productImage[0]} className="h-full object-scale-down mix-blend-multiply group-hover:scale-110 transition-all duration-200 ease-linear " />
                    </div>
                
                    <div className="p-4 flex flex-col gap-1">
                        <h2 className="font-medium text-ellipsis line-clamp-1 text-base md:text-md "> {item?.productName} </h2>
                        <p className=" capitalize text-slate-500"> {item?.category} </p>
                        <div className="flex gap-2">
                            <p className="text-red-500 font-medium"> {displayAFNCurrency(item?.sellingPrice)} </p>
                            <p className=" line-through text-slate-500 "> {displayAFNCurrency(item?.price)} </p>
                    </div>

                        <button className="outline-none text-sm w-fit px-2 py-1 hover:bg-green-600 rounded-lg bg-green-400 text-white transition-all duration-150 ease-linear" onClick={(e)=>{handleAddToCart(e, item?._id)}} >Add to Cart</button>

                    </div>
                </Link>
                ))
            )
            }
        </div>

        
    
    </div>
  )
}

export default HorizontalCardProducts;