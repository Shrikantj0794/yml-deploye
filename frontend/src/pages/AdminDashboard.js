import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const Dashboard = () => {
    // const [orders, setOrders] = useState();
    const [totalRevenue, setTotalRevenue] = useState(0);

    // useEffect(() => {
    //     // Fetch orders from the backend
    //     fetch('/api/orders')
    //         .then(response => response.json())
    //         .then(data => {
    //             setOrders(data.orders);
    //             setTotalRevenue(data.totalRevenue);
    //         });
    // }, []);

    const [orderData, setOrderData] = useState([])



    


    // const totalOrders = orders.length;
    // const pendingOrders = orders.filter(order => order.status === 'Pending').length;
    // const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p>{orderData.length}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Pending Orders</h3>
                    {/* <p>{pendingOrders}</p> */}
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Delivered Orders</h3>
                    {/* <p>{deliveredOrders}</p> */}
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    {/* <p>₹{totalRevenue}</p> */}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
