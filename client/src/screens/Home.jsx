import EachCategoryProduct from "../components/EachCategoryProduct"
import HorizontalCardProducts from "../components/HorizontalCardProducts"
import SlidingBanner from "../components/SlidingBanner"
import VerticalCardProducts from "../components/VerticalCardProducts"

const Home = () => {
  // This is the main home page of the website
  return (
    <div>
      <EachCategoryProduct />
      
      <HorizontalCardProducts category={"airpodes"} heading={"Top Airpodes"} />
      <HorizontalCardProducts category={"mobiles"} heading={"Popular Phones"} />

      <VerticalCardProducts category={"television"} heading={"Trending Televisions"} />
      <VerticalCardProducts category={"speakers"} heading={"Ultimate Speakers"} />

      <HorizontalCardProducts category={"camera"} heading={"Picture Perfect Cameras"} />

      <VerticalCardProducts category={"headphones"} heading={"Highly rated HeadPhones"} />
      <VerticalCardProducts category={"watches"} heading={"For Fitness Freaks"} />
      
      <HorizontalCardProducts category={"earphones"} heading={"For Music Lovers"} />



    </div>
  )
}

export default Home