import UploadProduct from "../components/UploadProduct";
import { useEffect, useState } from 'react';
import apiClient from "../helper/apiClient";
import AdminProductCart from "../components/AdminProductCart";

const Products = () => {

  // this toggles the upload image model box
  const [model, setModel] = useState(false);
  // this stores all the products details from the backend
  const [allProducts, setAllProducts] = useState([]);

  // this funciton sends the get request to backend server and get all the products from the 
  // database
  const fetchAllProducts = async () =>{
    const response = await apiClient.get('/product/getAllProducts');
    const data = response.data;
    
    setAllProducts(data.data || []);
  };

  useEffect(()=>{
    fetchAllProducts();
  },[]);

  return (
    <div className="overflow-hidden">
      <div className=" bg-white p-2 shadow-md flex items-center justify-between">
        <h2 className="font-semibold text-xl">All Products</h2>
        <button onClick={()=>{setModel(true)}} className="border-2 border-green-300 hover:shadow-md hover:bg-green-300 hover:text-white transition-all duration-150 ease-linear font-medium px-3 py-2 rounded-full">Upload Product</button>
      </div>

      <div className="flex items-center justify-start flex-wrap gap-4 py-2 overflow-y-scroll max-h-[calc(100vh-190px)]">
        {
          allProducts?.map((item,index)=>(
            <AdminProductCart fetchProduct={fetchAllProducts} data={item} key={index + "allProducts"} />
          ))
        }
      </div>

      {
        model ? (<UploadProduct fetchData={fetchAllProducts} onClose={()=>{setModel(false)}} />):""
      }
    </div>
  )
}

export default Products;