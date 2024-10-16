import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { productCategory } from '../helper/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { uploadImage } from '../helper/uploadImage';
import ProductImageFull from './ProductImageFull';
import apiClient from '../helper/apiClient';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const UploadProduct = ({onClose, fetchData}) => {

    const [productData, setProductData] = useState({
        productName: "",
        productBrand: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    });

    const [clickedImage, setClickedImage] = useState("");
    const [toggleClickedImage, setToggleClickedImage] = useState(false);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setProductData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    
    // This function is used to upload the selected image to the cloudinary server
    const handleProductUpload = async (e) =>{
        const file = e.target.files[0];

        const cloudinaryUploadImage = await uploadImage(file)

        setProductData((prev)=>({
            ...prev,
            productImage: [...prev.productImage,cloudinaryUploadImage.url]
        }))
    }

    // This function deletes the selected image from the images array
    const handleDelete = async (index) =>{
        const newProductImages = [...productData.productImage];
        newProductImages.splice(index,1);

        setProductData((prev)=>({
            ...prev,
            productImage: [...newProductImages]
        }))
    }

    // This function fires when user submits the form then all the input data
    // is sent to backend server and saved in the database MongoDB
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await apiClient.post('/product/uploadProduct', 
            productData,
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
            fetchData();
            onClose();
        } else {
            toast.error(data?.message);
        }
    }

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-60 inset-0 flex  items-center justify-center">
        <div className="relative overflow-hidden bg-white p-4 rounded-lg h-full w-full max-w-2xl max-h-[70%]">
            
            <h3 className=' relative text-xl tracking-wide font-semibold pb-3'>
                Upload product
                <div onClick={onClose} className="absolute -top-2 -right-2 cursor-pointer hover:bg-red-500 bg-red-400 w-fit p-2 rounded-full text-white">
                <IoMdClose size={18} />
            </div>
            </h3>

            <form onSubmit={handleSubmit} className='grid gap-2 p-4 overflow-y-scroll h-full'>
                <label htmlFor="productName">Product Name:</label>
                <input id='productName' 
                       type="text" 
                       name='productName'
                       placeholder='Enter product name' 
                       value={productData.productName} 
                       required
                       className='bg-slate-100 p-2 rounded border outline-none'
                       onChange={handleChange} />
                
                <label htmlFor="productBrand">Product Brand:</label>
                <input id='productBrand' 
                       type="text" 
                       name='productBrand'
                       placeholder='Enter product brand name' 
                       value={productData.productBrand} 
                       required
                       className='bg-slate-100 p-2 rounded border outline-none'
                       onChange={handleChange} />
                
                <label htmlFor="category">Product Category:</label>
                <select required id='category' value={productData.category} name='category' onChange={handleChange} className='bg-slate-50 p-2 rounded border outline-none'>
                    <option value={""}>-Select a category-</option>
                    {
                        productCategory.map((item,index)=>(
                            <option key={item.id+index} value={item.value}> {item.label} </option>
                        ))
                    }
                </select>

                <label htmlFor="productImage">Product Image:</label>
                <div className='p-2 bg-slate-100 border rounded h-32 flex items-center justify-center'>
                    <label htmlFor='productImageUpload' className='flex flex-col gap-2 cursor-pointer items-center justify-center text-slate-500'>
                        <FaCloudUploadAlt size={30} />
                        <p className='text-sm'>Upload product image</p>
                    </label>
                    <input id='productImageUpload' hidden type="file" onChange={handleProductUpload} />
                </div>

                <div className='mb-5 flex gap-4'>
                    {
                        productData?.productImage[0] ? (
                            productData?.productImage?.map((item,index)=>(
                                <div key={index} className='relative group'>
                                    <MdDelete onClick={()=>{handleDelete(index)}} className='absolute cursor-pointer hidden p-1 rounded-full bg-red-500 text-white -top-2 -right-2 group-hover:block' size={20}/>
                                    <img src={item}
                                        alt={item} 
                                        width={80} 
                                        height={80} 
                                        className='bg-slate-100 cursor-pointer border rounded'
                                        onClick={()=>{
                                            setToggleClickedImage(true);
                                            setClickedImage(item);
                                        }}
                                        />
                                    </div>
                            ))
                        )
                            :(<p className='text-red-600 text-xs'>*Please upload Product images</p>)
                    }
                </div>

                <label htmlFor="price">Price:</label>
                <input id='price'
                       type="number" 
                       name='price'
                       placeholder='Enter product price'
                       value={productData.price} 
                       required
                       className='bg-slate-100 p-2 rounded border outline-none'
                       onChange={handleChange} />

                <label htmlFor="sellingPrice">Selling Price:</label>
                <input id='sellingPrice'
                       type="number" 
                       name='sellingPrice'
                       placeholder='Enter product selling price'
                       value={productData.sellingPrice} 
                       required
                       className='bg-slate-100 p-2 rounded border outline-none'
                       onChange={handleChange} />

                <label htmlFor="description">Product Description:</label>
                <textarea onChange={handleChange} 
                          name='description'
                          value={productData?.description} 
                          className='h-28 p-2 bg-slate-100 border rounded-md outline-none resize-none' 
                          placeholder='Enter product description...'>

                </textarea>


                <button className='p-2 w-fit mx-auto mb-5 rounded-lg bg-green-400 text-white hover:bg-opacity-80'>Upload Product</button>

            </form>
        </div>
        {
            toggleClickedImage ? (
                <ProductImageFull onClose={()=>{setToggleClickedImage(false)}} imageUrl={clickedImage} />
            ):""
        }
    </div>
  )
}

export default UploadProduct;