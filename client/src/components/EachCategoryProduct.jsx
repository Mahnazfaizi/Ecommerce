import { useEffect, useState } from 'react';
import apiClient from '../helper/apiClient';
import { Link } from 'react-router-dom';

const EachCategoryProduct = () => {

    // state variable to store the products from backend API
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const loaderArray = new Array(13).fill(null);
    
    // function to send get request to backend to receive one product from 
    // each category
    const fetchcategoryProduct = async ()=>{
        setLoading(true);
        const response = await apiClient.get('/product/getByCategory')
        const data = response.data;
        setLoading(false);
        setCategoryProduct(data.data);
    }

    useEffect(()=>{
        fetchcategoryProduct();
    },[])

    // This compoent displays the one product from each category at top of the homepage
  return (
    <div className="mx-auto p-2 flex justify-center gap-2">
        {
            !loading ? (
                <div className='flex items-center gap-2 overflow-x-scroll scrollbar-hidden'>
            {
                categoryProduct?.map((item,index)=>(
                    <Link to={'/specific-category?category='+item?.category} key={index+item?.category} className='cursor-pointer group flex flex-col gap-1 items-center justify-center'>
                        <div className='w-16 h-16 md:w-20 md:h-20 p-4 flex items-center justify-center rounded-full overflow-hidden bg-slate-200'>
                            <img src={item?.productImage[0]} alt={item?.category} className='h-full object-contain mix-blend-multiply group-hover:scale-125 transition-all duration-200 ease-linear' />
                        </div>
                        <p className='text-sm capitalize md:text-base'> {item?.category} </p>
                    </Link>
                ))
            }
                </div>
            ):  (
                loaderArray.map((item,index)=>(
                    <div key={index+item} className='flex items-center justify-center h-16 w-16 md:w-20 md:h-20 rounded-full overflow-x-scroll bg-slate-300 animate-pulse'>
                        {/* <img src='/loader.gif' width={70} height={70} alt='loader' /> */}
                    </div>
                ))
            )
        }
        
    </div>
  )
}

export default EachCategoryProduct;