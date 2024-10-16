import { useEffect, useState } from 'react';
import image1 from '../assets/banner/img1.webp';
import image1_mobile from '../assets/banner/img1_mobile.jpg';
import image2 from '../assets/banner/img2.webp';
import image2_mobile from '../assets/banner/img2_mobile.webp';
import image3 from '../assets/banner/img3.jpg';
import image3_mobile from '../assets/banner/img3_mobile.jpg';
import image4 from '../assets/banner/img4.jpg';
import image4_mobile from '../assets/banner/img4_mobile.jpg';
import image5 from '../assets/banner/img5.webp';
import image5_mobile from '../assets/banner/img5_mobile.png';
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

const SlidingBanner = () => {

    const [translateVal, setTranslateVal] = useState(0);

    const desktopImages =[image1, image2, image3, image4, image5]
    const mobileImages = [image1_mobile, image2_mobile, image3_mobile, image4_mobile, image5_mobile];

    // This function is used to handle the banner next slide 
    // by changing the translate value to +1
    const handleNextSlide = () =>{
        if(desktopImages.length-1 > translateVal) {
            setTranslateVal(prev=>prev+1);
        }
    }

    // This function is used to handle the banner prev slide 
    // by changing the translate value to -1
    const handlePrevSlide = () =>{
        if(translateVal != 0) {
            setTranslateVal(prev=>prev-1);
        }
    }

    // Here is useEffct setInterval is created to change the banner slides
    // after every 5 seconds
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length-1 > translateVal) {
                handleNextSlide();
            } else {
                setTranslateVal(0);
            }
        },5000);
        return ()=>{
            clearInterval(interval);
        }
    },[translateVal]);

  return (
    <div className="p-4">
        <div className="relative h-52 md:h-72 w-full bg-slate-200">

            {/** for desktop and tablets */}
           
            <div className='hidden md:flex w-full h-full overflow-hidden'>
                {
                    desktopImages.map((item,index)=>(
                        <div key={index+item} className={`w-full h-full min-w-full min-h-full transition-all duration-300 ease-linear`} style={{transform: `translateX(-${translateVal*100}%)`}}>
                            <img src={item} alt={item} className='w-full h-full' />
                        </div>
                    ))
                }
            </div>

            <div className='md:hidden flex w-full h-full overflow-hidden'>
                {
                    mobileImages.map((item,index)=>(
                        <div key={index+item} className={`w-full h-full min-w-full min-h-full transition-all duration-300 ease-linear`} style={{transform: `translateX(-${translateVal*100}%)`}}>
                            <img src={item} alt={item} className='w-full h-full object-cover' />
                        </div>
                    ))
                }
            </div>

            <button onClick={handlePrevSlide} className='hidden md:flex outline-none absolute top-1/2 left-0 p-2 w-10 h-10 rounded-full items-center justify-center hover:opacity-80 shadow-md m-2 bg-white'> <RiArrowLeftSLine size={20} /> </button>
            <button onClick={handleNextSlide} className='hidden md:flex outline-none absolute top-1/2 right-0 p-2 m-2 w-10 h-10 items-center justify-center shadow-md hover:opacity-80 rounded-full bg-white'> <RiArrowRightSLine size={20} /> </button>
        
        </div>
    </div>
  )
}

export default SlidingBanner;