import { useLocation, useNavigate } from "react-router-dom";
import { productCategory } from "../helper/productCategory";
import { useEffect, useState } from "react";
import apiClient from "../helper/apiClient";
import DisplaySearched from "../components/DisplaySearched";

const CategoryProduct = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const UriCategory = new URLSearchParams(location.search);
    const UriCategoryArray = UriCategory.getAll("category");
    const categoryListObject = {};

    UriCategoryArray.forEach((item)=>{ 
      categoryListObject[item] = true;
    })
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(categoryListObject);
    const [filterCategory, setFilterCategory] = useState([]);

    const [sortBy, setSortBy] = useState("");
    console.log("sort by value -> ", sortBy);

    // this function sends the post request to the backend server
    // with all the selected categories and return all the related products
    const fetchData = async () =>{
      setLoading(true);
      const response = await apiClient.post('/product/filterProduct',
        {
          category: filterCategory
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      const resData = response.data;
      if(resData.success) {
        setData(resData?.data || []);
      }
      setLoading(false);
    }

    // this function is used to update the setSelectedCategories state variable object
    const handleSelectedCategories = (e) =>{
      const { value, checked } = e.target;
      setSelectedCategories((prev)=>({
        ...prev,
        [value] : checked
      }))
    }

    useEffect(()=>{
      fetchData();
    },[filterCategory])

    useEffect(()=>{
      // this function creates a array of the selected categories by mapping over the
      // setSelectedCategories object keys and add a corresponding boolean value to it
      // then set that array to the filterCategory
      const arrayOfCategory = Object.keys(selectedCategories).map(categoryName=>{
        if(selectedCategories[categoryName]) {
          return categoryName;
        }
        return null;
      }).filter(el=>el);

      setFilterCategory(arrayOfCategory);

      // this function is used to create the queyr url
      // e.g. ?category="mouse"&&category="mobile"
      const formatUrl = arrayOfCategory.map((item,index)=>{
        if((arrayOfCategory.length-1)===index ) {
          return `category=${item}`
        } else {
          return `category=${item}&&`
        }
      })
      // Here i join all the selected categories to the url
      navigate('/specific-category?'+formatUrl.join(""));

    },[selectedCategories]);

    // this function sort the products result 
    // ascending or descending by selling price
    const handleSortChange = (e) =>{
      const { value } = e.target;
      setSortBy(value);

      if(value === 'asc') {
        setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice));
      }

      if(value === 'desc') {
        setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice));
      }
    }

    useEffect(()=>{

    },[sortBy])

  return (
    <div className="p-4 flex">

      <div className="hidden lg:flex items-start gap-4 p-4 w-full ">
        
        <div className="bg-white sticky top-[5rem] flex flex-col gap-4 p-4 min-h-[75vh] overflow-y-scroll min-w-[200px] max-w-[200px] ">
          
          <div className="">
            <h1 className="text-base font-medium text-slate-500 border-b border-slate-200 pb-1">Sort By</h1>
            <form className="mt-2 text-sm">
                
                <div className="flex items-center gap-2">
                <input type="radio" name="sort" checked={sortBy==='asc'} id="low" value={"asc"} onChange={handleSortChange} />
                <label htmlFor="low">Price - Low to High</label>
                </div>
                
                <div className="flex items-center gap-2">
                <input type="radio" name="sort" checked={sortBy==='desc'} id="high" value={"desc"} onChange={handleSortChange} />
                <label htmlFor="high">Price - High to Low</label>
                </div>
            
            </form>
          </div>

          <div className="">
            <h1 className="text-base font-medium text-slate-500 border-b border-slate-200 pb-1">Filter By category</h1>
            <form className="mt-2 text-sm">
                {
                  productCategory.map((item,index)=>(
                    <div key={index+item.id} className="flex items-center gap-2">
                      <input type="checkbox" 
                             name="category" 
                             checked={!!selectedCategories[item?.value] } 
                             value={item?.value} 
                             id={item?.value} 
                             onChange={handleSelectedCategories} />
                      <label htmlFor={item.value}>{item?.label}  </label>
                    </div>
                  ))
                }
            </form>
          </div>


        </div>

        <div className="w-full overflow-hidden">
          <h3 className="font-medium text-slate-700 text-lg">Search Results: {data?.length}</h3>
          <div>
            {
              data.length!==0 && (
                <DisplaySearched loading={loading} data={data} />
              )
            }
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default CategoryProduct;