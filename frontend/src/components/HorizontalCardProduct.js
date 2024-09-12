import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import StarRatings from 'react-star-ratings';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);

    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setData(Array.isArray(categoryProduct?.data) ? categoryProduct.data : []);
        } catch (error) {
            console.error("Failed to fetch category-wise products:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}>
                    <FaAngleRight />
                </button>

                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[320px] md:min-w-[360px] max-w-[320px] md:max-w-[360px] h-48 bg-white rounded-sm shadow flex animate-pulse'>
                            <div className='bg-slate-200 h-full p-4 min-w-[140px] md:min-w-[160px]'></div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full rounded-full'></p>
                                </div>
                                <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product, index) => (
                        <Link
                            key={product?._id}
                            to={"product/" + product?._id}
                            className='w-full min-w-[320px] md:min-w-[360px] max-w-[320px] md:max-w-[360px] h-48 bg-white rounded-lg shadow-md flex transition-transform transform hover:scale-105 hover:shadow-lg'
                        >
                            <div className='bg-slate-200 h-full p-4 min-w-[140px] md:min-w-[160px]'>
                                <img
                                    src={product?.productImage[0]}
                                    className='object-scale-down h-full w-full transition-transform transform hover:scale-110'
                                    alt={product?.productName}
                                />
                            </div>
                            <div className='p-4 grid'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <div className='flex items-center'>
    <StarRatings
        rating={4.5} // Fixed rating
        starRatedColor="gold"
        starDimension="15px"
        starSpacing="0px" // No space between the star and the text
        numberOfStars={1} // Display only one star
        name='rating'
    />
    <span className='text-slate-500 ml-1 flex items-center'>4.5</span> {/* Flexbox alignment for consistent spacing */}
    <span className='text-slate-500 ml-1 flex items-center'>(10)</span> {/* Flexbox alignment for consistent spacing */}
</div>

   
                                <div className='flex flex-col md:flex-row gap-2 mt-2'>
                                    <button
                                        className='text-xs md:text-sm bg-green-600 hover:bg-green-700 text-white px-2 md:px-3 py-1 rounded-full text-center w-full md:w-auto'
                                    >
                                        Buy Now
                                    </button>
                                    <button className='text-sm bg-sky-600 hover:bg-sky-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>
                                    Add to Cart
                                </button>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default HorizontalCardProduct;