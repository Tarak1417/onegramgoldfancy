import react from 'react';
import Banner from '../Pages/banner';
import CategoryChips from '../Pages/CategoryChips';
import FeaturedProducts from '../Pages/FeaturedProducts';
import Quicku from '../Pages/QuickAccessCards';
import ProductCard from '../Pages/ProductCard';
import Footer from "./Footer";
import Navbar from './Navbar';
import MiniProductCards from '../Pages/MiniProductCards';


const Home = () => {
    return (
        <div>
             < Navbar/>
            <Banner/>
            <Quicku/>
          
            <MiniProductCards/>
            <FeaturedProducts/>
            <ProductCard/>
            <Footer/>
        </div>
    )
}

export default Home;