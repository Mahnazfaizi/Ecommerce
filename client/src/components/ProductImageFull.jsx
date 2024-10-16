import { IoMdClose } from 'react-icons/io';


// eslint-disable-next-line react/prop-types
const ProductImageFull = ({imageUrl, onClose}) => {
  return (
    // This component is used to display the image in full screen when the user clicks
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-slate-100 bg-opacity-50">
        <div className='relative'>
             <div onClick={onClose} className="absolute -top-2 -right-2 cursor-pointer hover:bg-red-500 bg-red-400 w-fit p-2 rounded-full text-white">
                <IoMdClose size={18} />
             </div>
             <div className='w-full h-full max-w-[80vh] max-h[80vh] flex items-center justify-center overflow-hidden'>
                <img src={imageUrl} alt="" className="object-cover object-center bg-white rounded-xl shadow-lg" />
            </div>
        </div>
        
    </div>
  )
}

export default ProductImageFull;