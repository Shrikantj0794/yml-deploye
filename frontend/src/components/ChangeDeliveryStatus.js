import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const ChangeDeliveryStatus = ({ _id, deliveryStatus, onClose, callFunc }) => {
    const [newStatus, setNewStatus] = useState(deliveryStatus);

    const handleStatusChange = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ deliveryStatus: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update delivery status');
            }

            const data = await response.json();
            console.log('Delivery status updated:', data);
            callFunc(); // Refresh the order list
            onClose(); // Close the dropdown
        } catch (error) {
            console.error('Error updating delivery status:', error);
        }
    };

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change Delivery Status</h1>
                <p>Order ID: {_id}</p>
                <div className='flex items-center justify-between my-4'>
                    <p>Status:</p>
                    <select 
                        className='border px-4 py-1' 
                        value={newStatus} 
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="Ordered">Ordered</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <button 
                    className='w-fit mx-auto block py-1 px-3 rounded-full bg-sky-600 text-white hover:bg-sky-700' 
                    onClick={handleStatusChange}
                >
                    Change Delivery Status
                </button>
            </div>
        </div>
    );
};

export default ChangeDeliveryStatus;
