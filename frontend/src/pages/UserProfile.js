import React, { useState,useEffect } from 'react';
import { MdLocationOff } from "react-icons/md";
import { FaTimes, FaBars } from 'react-icons/fa';
import { BsBagXFill } from "react-icons/bs";
import { CgTrack } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { MdModeEditOutline } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import SummaryApi from '../common';
import {toast} from 'react-toastify'



const Profile = ( ) => {
  const [activeSection, setActiveSection] = useState('Profile Information');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [userData, setUserData] = useState(null)
  const [orderData, setOrderData] = useState(null)

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadAddress.url, {  // Update the API endpoint
      method: SummaryApi.uploadAddress.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
     
      // fetchUserData(); // Call a function to refresh the user data
      setUserData((prevUserData) => ({
        ...prevUserData,
        address: address,
    }));
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };


  const user = useSelector(state => state?.user?.user)
  // const token = localStorage.getItem('token');
  // alert(token)


  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/user-details', {
                method: 'GET',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            

            const data = await response.json();
                setUserData(data.data);
                
                setOrderData(data.orderDetail);
                setAddress({
                  street: data.data.address?.street || '',
                  city: data.data.address?.city || '',
                  state: data.data.address?.state || '',
                  zip: data.data.address?.zip || ''
              });
              // console.log(orderData[0].deliveryStatus)
              
                

        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchUserData();
}, []);



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // const trackOrder=()=>{
    
  // }

  
  

  const renderContent = () => {
    switch (activeSection) {
      case 'Profile Information':
        return (
            <div>
            <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
            <div className="flex flex-col items-center mb-6">
            <div className="relative inline-block">
            {userData?.profilePic ? (
              <img
                src={`${userData?.profilePic}`}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-2"
              />
              ) : (
                <FaRegCircleUser size={70} className="text-gray-500" />
              )}
            <MdModeEditOutline className="bg-sky-600 text-white rounded-full p-1 text-3xl absolute bottom-3 right-5 transform translate-x-1/2 translate-y-1/2" />
          </div>

              <h2 className="text-xl font-semibold">{userData?.name.toUpperCase()}</h2>
              {/* <h2>{orderData.signature}</h2> */}
            </div>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="first-name" className="font-semibold mb-1">Name</label>
                <input id="first-name" value={`${userData?.name}`} className="border border-gray-300 p-2 rounded"/>
                  
                
              </div>
             
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-semibold mb-1">Phone Number</label>
                <input id="mobileNo" value={`${userData?.mobileNo}`}  className="border border-gray-300 p-2 rounded"/>               
                
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold mb-1">Email</label>
                <input id="email" value={`${userData?.email}`} className="border border-gray-300 p-2 rounded"/>               
              </div>
              <button type="submit" className="bg-sky-600 text-white py-2 px-4 rounded mt-4 w-full">Edit</button>
            </form>
          </div>
          
        );
      case 'My Orders':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

            {orderData ? (
                <div className='w-full max-w-3xl'>
                {orderData && orderData.length > 0 ? (
                    <div>
                        <h2 className='text-xl font-semibold mb-4'>Order Details</h2>
                        {orderData.map((order) => (
    <div key={order._id} className='mb-6 relative'>
        <div className="order-container p-6 border border-gray-300 rounded-lg bg-white shadow-lg relative">
    {order.products.map((product) => (
        <div 
            key={product._id} 
            className='w-full h-32 my-3 p-3 border border-gray-200 rounded-lg flex items-center bg-sky-50 shadow-sm'
        >                                    
            <div className='h-24 w-24 overflow-hidden rounded-lg shadow-md'>
                <img  
                    src={product.image[0]} 
                    alt={product.name} 
                    className='w-full h-full object-cover' 
                />
            </div>
            <div className='ml-4 flex flex-col justify-between'>
                <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>
                <h4 className='text-sm text-gray-600'>{product.category}</h4>
                <p className='text-sm text-gray-700'><strong>Quantity:</strong> {product.quantity}</p>
                <p className='text-sm text-gray-700'><strong>Total Cost:</strong> <span className="font-bold text-gray-800">{"₹" + (product.price * product.quantity)}</span></p>
                <p className='text-sm'><strong>Status:</strong> <span className='text-green-700 font-semibold'>{order.status}</span></p>
            </div>
        </div>
    ))}
    {/* Order ID and Tracking Status */}
    <div className='absolute bottom-0 right-0 p-4 bg-white rounded-lg shadow-lg'>
        {/* <p className='text-sm text-gray-700 font-semibold'>Order ID: {order._id}</p> */}
        <p className='text-sm text-blue-600 font-semibold'>Tracking Status: {order.deliveryStatus}</p>
    </div>
</div>

    </div>
))}

                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <BsBagXFill style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
                        <p>No orders found!</p>
                    </div>
                )}
            </div>
            ) : (
                <div className="flex flex-col items-center">
                    <BsBagXFill style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
                    <p>No order found!</p>
                </div>
            )}
            
          </div>
        );
      // case 'Wishlist':
      //   return (
      //     <div>
      //       <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      //       <div className="flex flex-col items-center">
      //         <MdSpeakerNotesOff style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
      //         <p>No product found in wishlist</p>
      //       </div>
      //     </div>
      //   );
      case 'Address':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Address</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
    {userData.address ? (
        <div className="flex flex-col lg:flex-row justify-between items-center bg-slate-50 p-4 rounded-md mb-6 shadow-sm">
            <div className="text-lg">
                <p className="mb-2"><strong>Street:</strong> {userData.address.street}</p>
                <p className="mb-2"><strong>City:</strong> {userData.address.city}</p>
            </div>
            <div className="text-lg">
                <p className="mb-2"><strong>State:</strong> {userData.address.state}</p>
                <p><strong>ZIP Code:</strong> {userData.address.zip}</p>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center text-center bg-slate-50 p-6 rounded-md shadow-sm">
            <MdLocationOff style={{ fontSize: '6rem' }} className="text-sky-600 mb-3" />
            <p className="text-gray-600">No address is saved</p>
        </div>
    )}

    <form className="grid gap-4" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street:</label>
            <input 
                type="text"
                id="street"
                name="street"
                value={address.street}
                onChange={handleOnChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-sky-600"
                required
            />
        </div>

        <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City:</label>
            <input 
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleOnChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-sky-600"
                required
            />
        </div>

        <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State:</label>
            <input 
                type="text"
                id="state"
                name="state"
                value={address.state}
                onChange={handleOnChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-sky-600"
                required
            />
        </div>

        <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code:</label>
            <input 
                type="text"
                id="zip"
                name="zip"
                value={address.zip}
                onChange={handleOnChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-sky-600"
                required
            />
        </div>

        <button className="mt-4 py-3 bg-sky-600 text-white font-medium rounded-md hover:bg-sky-600 transition duration-200">
            Update Address
        </button>
    </form>
</div>

          </div>
        );
      // case 'Coupons':
      //   return (
      //     <div>
      //       <h1 className="text-2xl font-bold mb-4">Your Coupons</h1>
      //       <div className="flex flex-col items-center">
      //       <RiDiscountPercentFill style={{ fontSize: '6rem' }} className="text-sky-600 mb-2" />
      //       <p>No coupon found!</p>
      //       </div>
      //     </div>
      //   );
      case 'Track Order':
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
            <div className="flex flex-col items-center">
              <CgTrack style={{ fontSize: '6rem' }} className="text-sky-600 text-6xl mb-2" />
              {/* <form action="" onSubmit={trackOrder}>
                <input type="text" name="" placeholder='Enter Tracking Id' id="" />
                <button className='bg-slate-400' type="submit">Track Your Order</button>
              </form> */}
              <p>Order not found!</p>
            </div>
          </div>
        );
      default:
        return <div><h1 className="text-2xl font-bold mb-4">Profile Information</h1></div>;
    }
  };

  return (
    <div className="flex items-center justify-center mt-40 bg-gray-100">
      <div className="relative flex w-full max-w-5xl  bg-white rounded-lg shadow-lg">
      <button className="absolute top-4 right-4 bg-sky-600 text-white p-2 rounded-md md:hidden" onClick={toggleSidebar}>
  {sidebarOpen ? <FaTimes /> : <FaBars />}
</button>

        <aside className={`z-50 md:z-10 md:h-auto fixed top-0 left-0 mt[0] h-[100vh] bg-gray-100 p-4 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64`}>
          <ul className="space-y-5">
            <li className={activeSection === 'Profile Information' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Profile Information'); toggleSidebar(); }} className="text-lg">Profile Information</button>
            </li>
            <li className={activeSection === 'My Orders' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('My Orders'); toggleSidebar(); }} className="text-lg">My Orders</button>
            </li>
            {/* <li className={activeSection === 'Wishlist' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Wishlist'); toggleSidebar(); }} className="text-lg">Wishlist</button>
            </li> */}
            <li className={activeSection === 'Address' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Address'); toggleSidebar(); }} className="text-lg">Address</button>
            </li>
            {/* <li className={activeSection === 'Coupons' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Coupons'); toggleSidebar(); }} className="text-lg">Coupons</button>
            </li> */}
            <li className={activeSection === 'Track Order' ? 'font-bold text-sky-600' : ''}>
              <button onClick={() => { setActiveSection('Track Order'); toggleSidebar(); }} className="text-lg">Track Order</button>
            </li>
          </ul>
        </aside>
        <main className="flex-1 p-4 md:ml-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Profile;
