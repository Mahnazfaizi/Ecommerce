import axios from 'axios';

const name = import.meta.env.VITE_CLOUDINARY_NAME;
const url = `https://api.cloudinary.com/v1_1/${name}/image/upload`;

export const uploadImage = async (image) =>{
    // this uploads image to the cloudinary
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset","ecommerce_product");
    const response = await axios.post(url,
        formData);

    return response.data;
}