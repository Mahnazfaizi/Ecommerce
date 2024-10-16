import apiClient from "./apiClient"

// This function is used to fetch the product from particular category from backend by a post request 
export const fetchCategoryWiseProducts = async (category) =>{
    const response = await apiClient.post('/product/getAllProductsByCategory', 
        {
            category: category
        },
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    );

    const data = response.data;
    return data;
}