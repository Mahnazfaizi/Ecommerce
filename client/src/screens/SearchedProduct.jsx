import { useLocation } from "react-router-dom";
import apiClient from "../helper/apiClient";
import { useEffect, useState } from "react";
import DisplaySearched from "../components/DisplaySearched";

const SearchedProduct = () => {
    // this stores the user search text query
    const query = useLocation();

    // this sotres the user search result products
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // this function sends the get request and get all the products which match 
    // with the search query
    const searchForProducts = async () =>{
        setLoading(true);
        const response = await apiClient.get(`/product/searchProduct${query?.search}`);
        const data = response.data;
        if(data?.success) {
            setSearchedProducts(data?.data);
        }
        setLoading(false);
        console.log("data is -> ", data);
    }

    useEffect(()=>{
        searchForProducts();
    },[query]);
  return (
    
    <div className="p-4">
        {
            loading&&(
                <p className="text-xl font-medium text-center">Loading...</p>
            )
        }
        {

        }
        
        <p className="text-xl font-medium tracking-wide">Searched: {searchedProducts.length}</p>

        {
            searchedProducts.length===0 && ! loading&&(
                <p className="bg-white text-center p-4">No Data Found</p>
            )
        }

        {
            searchedProducts.length!==0 && !loading && (
                <DisplaySearched loading={loading} data={searchedProducts} />
            )
        }

        
    </div>
  )
}

export default SearchedProduct;