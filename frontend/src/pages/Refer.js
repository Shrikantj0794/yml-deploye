import React from 'react';

const ReferCard = () => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('https://img.freepik.com/free-vector/colorful-dating-app-concept_23-2148523515.jpg?size=626&ext=jpg&ga=GA1.1.745416819.1724534193&semt=ais_hybrid')" }}
    >
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-96">
        {/* Background Image for the Card */}
        <div className="absolute inset-0">
          <img
            src="https://imgs.search.brave.com/nBKohrYU0UeocTtfRvWa4VP3M58E3wEx5qPZ6V0yTE8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzgzLzU1Lzgx/LzM2MF9GXzI4MzU1/ODEyMl91TjZ6aXhR/VTFIMVdZTzZabWN2/NWQ4RnZ4U2x3ODZm/dC5qcGc" // Ensure this path is correct
            alt="Referral Background"
            className="object-cover w-full h-full opacity-20"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 text-center">
          <h1 className="text-lg font-semibold text-gray-900 mb-4">Welcome message</h1>
          
          <div className="mb-4">
            <div className="text-2xl font-bold text-black">$00</div>
            <div className="text-sm text-gray-600">NO of refer</div>
          </div>

          <button className="bg-white border border-gray-300 w-full py-3 rounded-full shadow-md text-black font-semibold mb-4">
            Refer Link/ Button
          </button>

          <div className="mb-4">
            <div className="text-sm font-bold text-gray-900 mb-2">REDEEM NOW</div>
            <button className="bg-white border border-gray-300 w-full py-3 rounded-full shadow-md text-red-600 font-semibold">
              UPI CASH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferCard;
