import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import ChangeDeliveryStatus from '../components/ChangeDeliveryStatus';

const OrderList = () => {
    const [orderData, setOrderData] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [updateDeliveryDetails, setUpdateDeliveryDetails] = useState({
        _id: "",
        deliveryStatus: ""
    });

    // Define fetchAllOrders at the top level so it's accessible in the entire component
    const fetchAllOrders = async () => {
        try {
            const response = await fetch(SummaryApi.getOrders.url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setOrderData(data.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleStatusChangeClick = (order) => {
        setUpdateDeliveryDetails(order);
        setOpenDropdown(true);
    };

    return (
        <div className="p-4 bg-white">
            <h2 className="text-2xl font-bold mb-4">Order List</h2>
            <table className="min-w-full bg-white">
    <thead>
        <tr className="bg-black text-white">
            <th className="py-2">Sr. No.</th>
            <th className="py-2">Customer Name</th>
            <th className="py-2">Items</th>
            <th className="py-2">Payment Status</th>
            <th className="py-2">Delivery Status</th>
            <th className="py-2">Actions</th>
        </tr>
    </thead>
    {orderData.map((order, orderIndex) => (
        <tbody key={orderIndex} className="border border-gray-400">
            {order.products.map((product, productIndex) => (
                <tr className="bg-white" key={`${orderIndex}-${productIndex}`}>
                    {productIndex === 0 && (
                        <>
                            <td
                                rowSpan={order.products.length}
                                className="py-4 align-middle text-center border-gray-400 font-semibold text-black"
                            >
                                {orderIndex + 1}
                            </td>
                            <td
                                rowSpan={order.products.length}
                                className="py-4 align-middle text-center border-gray-400 font-semibold text-black"
                            >
                                {order.user}
                            </td>
                        </>
                    )}
                    <td className="text-center align-middle border-gray-400 font-medium text-black">
                        {product.name || 'No name available'}
                    </td>
                    {productIndex === 0 && (
                        <>
                            <td
                                rowSpan={order.products.length}
                                className="py-4 text-center align-middle border-gray-400 font-medium text-black"
                            >
                                {order.status || 'No status available'}
                            </td>
                            <td
                                rowSpan={order.products.length}
                                className="py-4 text-center align-middle border-gray-400 font-medium text-black"
                            >
                                {order.deliveryStatus || 'Ordered'}
                            </td>
                            <td
                                rowSpan={order.products.length}
                                className="py-4 text-center align-middle border-gray-400"
                            >
                                <button
                                    className="bg-sky-600 text-white px-2 py-1 rounded-lg shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-opacity-50 transition duration-200"
                                    onClick={() => handleStatusChangeClick(order)}
                                >
                                    Change Status
                                </button>
                            </td>
                        </>
                    )}
                </tr>
            ))}
        </tbody>
    ))}
</table>



            {openDropdown && (
                <ChangeDeliveryStatus
                    onClose={() => setOpenDropdown(false)}
                    _id={updateDeliveryDetails._id}
                    deliveryStatus={updateDeliveryDetails.deliveryStatus}
                    callFunc={fetchAllOrders} // Pass the fetchAllOrders function as a prop
                />
            )}
        </div>
    );
};

export default OrderList;
