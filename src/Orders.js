import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import Order from './Order';
import './Orders.css';
import { useStateValue } from './StateProvider';

function Orders() {

    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]); 

    useEffect(() => {
        // If user exists
        if (user) {
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            // This gives me the real time snapshot of the database
            // This means if i push value into the database, 
            // Snapshot will provide a real time response,
            // This will update base on real time 
            .onSnapshot(snapshot => {
                // Return all the orders as documents
                // Map through every single one 
                // For each document, return an object
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        } else {
            setOrders([])
        }

    }, [user])

    return (
        <div className="orders">
            <h1>Your orders</h1>
            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order}/>
                ))}
            </div>
        </div>
    )
}

export default Orders
