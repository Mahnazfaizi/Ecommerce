/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import AdminProductEdit from './AdminProductEdit';
import { displayAFNCurrency } from '../helper/displayCurrency';

const AdminProductCart = ({data, fetchProduct}) => {

    // State to toggle the edit model box
    const [editProduct, setEditProduct] = useState(false);

  return (

    //Admin Panel products list 
    <div className="relative w-44 bg-white p-4 rounded flex flex-col items-center justify-center group ">
        <div className='w-32 h-32 flex justify-center items-center'>
            <img src={data?.productImage[0]} alt="" className='mx-auto object-contain h-full' />
        </div>
        <h1 className='text-ellipsis line-clamp-1'> {data?.productName} </h1>
        <p className='font-medium'>
            {
                displayAFNCurrency(data?.sellingPrice)
            }
        </p>

            {/**Edit button for the particular product */}
        <div onClick={()=>{setEditProduct(true)}} className='absolute cursor-pointer hover:bg-green-600 hidden bottom-0 right-0 rounded-full w-fit p-2 text-white bg-green-400 group-hover:block '>
            <MdModeEdit className='' />
        </div>

        {
            // Show the model box to fill up the updated details 
            editProduct ? <AdminProductEdit fetchData={fetchProduct} product={data} onClose={()=>{setEditProduct(false)}} /> :""
        }

    </div>
  )
}

export default AdminProductCart;