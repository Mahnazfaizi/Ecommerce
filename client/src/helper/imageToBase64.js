// eslint-disable-next-line no-unused-vars
const imageToBase64 = async (image) =>{
    // This function reccives a image and then convert it to base64 format
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve, reject) =>{
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
    });
    return data;
}

export default imageToBase64