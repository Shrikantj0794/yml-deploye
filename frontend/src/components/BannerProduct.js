import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const desktopImages = [image1, image2, image3, image4, image5];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

    return (
        <div className='container mx-auto px-4 rounded relative'>
            <div className='h-56 md:h-72 w-full relative' style={{ height: '250px' }}>
                
                {/* Desktop and tablet version */}
                <div className='hidden md:block h-full w-full relative'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        modules={[Pagination, Autoplay, EffectCoverflow]}
                        className='h-full'
                    >
                        {desktopImages.map((imageURL, index) => (
                            <SwiperSlide key={index} className='flex justify-center items-center'>
                                <img src={imageURL} className='w-full h-full object-cover rounded-md' alt={`Banner ${index}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Mobile version */}
                <div className='md:hidden h-full w-full relative'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        modules={[Pagination, Autoplay]}
                        className='h-full'
                    >
                        {mobileImages.map((imageURL, index) => (
                            <SwiperSlide key={index} className='flex justify-center items-center'>
                                <img src={imageURL} className='w-full h-full object-cover rounded-md' alt={`Banner ${index}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Swiper Pagination */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                    {/* Pagination is handled by Swiper */}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
