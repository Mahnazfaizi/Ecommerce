import { useContext, useEffect, useState } from 'react';
import apiClient from '../helper/apiClient';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { displayAFNCurrency } from '../helper/displayCurrency';
import VerticalCardProducts from '../components/VerticalCardProducts';
import { addToCart } from '../helper/addToCart';
import { AppContext } from '../context/AppContext';

const ProductDetail = () => {

    const { fetchCartQuantity } = useContext(AppContext);
    
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productName: "",
        productBrand: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    });
    const [loading, setLoading] = useState(false);
    // set the main image of the product 
    const [activeImage, setActiveImage] = useState("");
    // this state variable toggle the zoom box model
    const [zoomModel, setZoomModel] = useState(false);
    // this state variable stores the x and y cordinates of the user to change
    // the backgroundPosition of the zoom box model image
    const [imageCoords, setImageCoords] = useState({
        x: 0,
        y: 0,
    });
    const { id } = useParams();

    // this function send the post request to backend to get all details of the user
    // selected products
    const fetchProductDetails = async ()=>{
        setLoading(true);
        const response = await apiClient.post('/product/getProductDetails',
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
        setProduct(data?.data);
        setActiveImage(data?.data?.productImage[0]);
        setLoading(false);
    }

    // this function sets the src url to the active image
    const handleHoverImage = (imgUrl) =>{
        setActiveImage(imgUrl);
    }

    // this function change the x and y cordinates on user mouse over the image
    const handleZoomImage = (e) =>{
        setZoomModel(true);
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setImageCoords({x,y})
    }

    // handles the add to cart to add product to cart
    const handleAddToCart = async (e, id) =>{
        await addToCart(e, id);
        fetchCartQuantity();
    }

    // this function add the product to cart and then navigate user to the usercart endpoint
    const handleBuyNow = async (e, id) =>{
        await addToCart(e, id);
        fetchCartQuantity();
        navigate('/userCart');
    }


    useEffect(()=>{
        fetchProductDetails();
    },[id])

  return (
    <div className='p-4 mx-auto'>
       
       <div className='min-h-[200px] flex gap-4 md:gap-6 flex-col md:flex-row'>
            
            <div className='h-96 flex gap-4 md:gap-6 flex-col-reverse md:flex-row'>
                
                <div className='h-full'>
                    {
                        loading?(
                            <div className='flex gap-2 md:flex-col overflow-scroll scrollbar-hidden h-full'>
                               {
                               Array.from({length: product?.productImage.length}).map((_,index)=>(
                                <div key={index} className='w-20 h-20 bg-slate-200 rounded animate-pulse'>
                                </div>
                               ))
                               }
                            </div>
                        ):(
                            <div className='flex gap-2 md:flex-col overflow-scroll scrollbar-hidden h-full'>
                               {
                                product?.productImage.map((item,index)=>(
                                <div key={index+item} className='w-20 h-20 bg-slate-200 rounded p-1'>
                                    <img onMouseEnter={()=>{handleHoverImage(item)}} src={item} alt="" className=' cursor-pointer w-full h-full mix-blend-multiply object-contain' />
                                </div>
                               ))
                               }
                            </div>
                        )
                    }
                </div>

                {
                    loading? (
                    <div className='h-[300px] w-[300px] p-2 md:h-96 md:w-96 bg-slate-200 animate-pulse '>
                    </div>
                    ):(
                    <div className='relative h-[300px] w-[300px] p-2 md:h-96 md:w-96 bg-slate-200'>
                        <img src={activeImage} 
                            alt="" 
                            onMouseMove={(e)=>{handleZoomImage(e)}}
                            onMouseLeave={()=>{setZoomModel(false)}}
                            className='h-full w-full object-scale-down mix-blend-multiply' />

                        {/** Mouse over image zoom */}
                        {
                            zoomModel? (
                            <div className='hidden lg:block absolute -right-[520px] top-0 overflow-hidden z-20 min-w-[500px] min-h-[400px] bg-slate-200 p-1 '>
                                <div className='w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply' 
                                    style={{
                                        backgroundImage: `url(${activeImage})`, 
                                        backgroundRepeat:'no-repeat', 
                                        backgroundPosition: `${imageCoords.x*100}% ${imageCoords.y*100}%`
                                        }}>
                                </div>
                            </div>
                            ):""
                        }

                    </div>
                    )
                }

                

            </div>
            
            {
                loading? (
                
                <div className='grid gap-2 w-full'>
                    <p className='bg-slate-200 animate-pulse h-6 md:h-8 w-full rounded-md '></p>
                    <h2 className='h-6 md:h-8 w-full bg-slate-200 animate-pulse rounded-md'></h2>
                    <p className='bg-slate-200 h-6 md:h-8 min-w-[100px] w-full animate-pulse rounded-md'></p>
                
                    <div className='flex gap-1 bg-slate-200 h-6 md:h-8 rounded-md animate-pulse'>
                    </div>

                    <div className='flex items-center w-full justify-start bg-slate-200 gap-2 h-6 md:h-8 animate-pulse'>
                        <p className='bg-slate-200 animate-pulse rounded-md h-6 md:h-8 w-full'></p>
                        <p className='bg-slate-200 animate-pulse rounded-md h-6 md:h-8 w-full'></p>
                    </div>

                    <div className='flex items-center justify-start gap-2 mt-3 w-full'>
                        <button className='h-6 md:h-8 rounded-md animate-pulse w-full'></button>
                        <button className='h-6 md:h-8 rounded-md animate-pulse w-full'></button>
                    </div>

                    <div className='flex flex-col gap-2 mt-2 w-full'>
                        <p className='bg-slate-200 h-6 md:h-8 animate-pulse rounded-md w-full'></p>
                        <p className=' bg-slate-200 h-10 md:h-16 animate-pulse rounded-md w-full'>  </p>
                    </div>
                </div>
                ):(
                <div className='flex flex-col gap-2'>
                    <p className='bg-slate-200 w-fit rounded-full px-2 py-1 font-medium shadow'> {product?.productBrand} </p>
                    <h2 className='text-2xl md:text-4xl font-medium'> {product?.productName} </h2>
                    <p className=' capitalize text-slate-400'> {product?.category} </p>
                
                    <div className='flex gap-1 text-yellow-400'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalf />
                    </div>

                    <div className='flex items-center justify-start gap-2'>
                        <p className='font-medium text-2xl md:text-3xl'> {displayAFNCurrency(product?.sellingPrice)} </p>
                        <p className='text-slate-400 text-xl line-through'> {displayAFNCurrency(product?.price)} </p>
                    </div>

                    <div className='flex items-center justify-start gap-2 mt-3'>
                        <button onClick={(e)=>{handleBuyNow(e,product?._id)}} className='border-2 border-green-400 min-w-[100px] px-2 py-1 rounded-md font-medium text-green-500 hover:bg-green-400 hover:text-white hover:border-none transition-all duration-200 ease-linear'>Buy Now</button>
                        <button onClick={(e)=>{handleAddToCart(e,product?._id)}} className='border-2 border-yellow-500 hover:bg-white hover:text-yellow-500 min-w-[100px] px-2 py-1 rounded-md font-medium text-white bg-yellow-500  transition-all duration-200 ease-linear'>Add to Cart</button>
                    </div>

                    <div className='mt-2'>
                        <p className='font-semibold text-lg'>Description: </p>
                        <p className='text-sm'> {product?.description} </p>
                    </div>
                </div>
                )
            }
       
       </div>

       {
        product?.category && (
            <VerticalCardProducts category={product?.category} heading={"You might also like"} />
        )
       }

    
    </div>
  )
}

export default ProductDetail;