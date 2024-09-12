import React from 'react'
import { MdOutlineLocationOn } from "react-icons/md";
import { IoIosCall,IoMdMail } from "react-icons/io";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";


const ContactUs = () => {
  return (
    <div>
      <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">Connect Us</h1>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="p-4 md:w-1/3">
        <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-sky-600 text-white flex-shrink-0">
              <MdOutlineLocationOn size={22}/>
            </div>
            <h2 class="text-gray-900 text-lg title-font font-medium">Address</h2>
          </div>
          <div class="flex-grow">
            <p class="leading-relaxed text-base">301, xyz building, Hinjewadi</p>
            <p> Dist: Pune</p>

          </div>
        </div>
      </div>
      <div className="p-4 md:w-1/3">
  <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
    <div className="flex items-center mb-3">
      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-sky-600 text-white flex-shrink-0">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <h2 className="text-gray-900 text-lg title-font font-medium">Socials</h2>
    </div>
    <div className="flex-grow flex space-x-4 mt-4">
      <FaInstagram size={30} color="#E1306C" />
      <FaTwitter size={30} color="#1DA1F2" />
      <FaLinkedin size={30} color="#0077B5" />
      <FaFacebook size={30} color="#1877F2" />
    </div>
  </div>
</div>

      <div class="p-4 md:w-1/3">
        <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-sky-600 text-white flex-shrink-0">
             <IoIosCall size={22}/>
            </div>
            <h2 class="text-gray-900 text-lg title-font font-medium">Call us</h2>
          </div>
          <div class="flex-grow">
            <div class="flex">
            <IoIosCall size={22}/>
            <p class="leading-relaxed text-base">+91 - 8888888888</p>
            </div>

            <div className="flex">
            <IoMdMail size={22}/>
            <p class="leading-relaxed text-base"> yahshuasoftware@gmail.com</p>

            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default ContactUs
