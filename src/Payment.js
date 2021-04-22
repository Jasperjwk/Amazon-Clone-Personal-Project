import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from './axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider'
import { db } from './firebase';

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // Generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            // Axios is like making a request, like a post request and get request
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket]) //Whenever the basket changes, it will make the request on top and it will update
    // the stripe secret which allows me to charge the customer the right amount 

    console.log("THE SECRET IS >>>", clientSecret)
    console.log(user);

    const handleSubmit = async (event) => {
        // Do all the fancy stripe stuff
        event.preventDefault();
        // Stop users from clicking the buy button multiple times 
        // It only allows them to click once and it will block
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent }) => {
            // Payment intent = payment confirmation
            db
            .collection('users')
            // .doc(user?.uid)
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
           <div className="payment__container">
               <h1>
                   Checkout (
                       <Link to = "/checkout">{basket?.length} items </Link>
                       )
               </h1>
               <div className="payment__section">
                   <div className="payment__title">
                       <h3>Delivery Address</h3>
                   </div>
                   <div className="payment__address">
                       {/* Pull email from data layer */}
                       <p>{user?.email}</p>
                       <p>Hougang</p>
                       <p>Blk 102, Street 31</p>
                   </div>
               </div>

               <div className="payment__section">
                   <div className="payment__title">
                       <h3>Review items and Delivery</h3>
                    </div>

                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                   
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    // Render out some total value
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Proccessing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                                {/* Errors */}
                                {error && <div>{error}</div>}

                        </form>


                    </div>
                   
                </div>

           </div>
        </div>
    )
}

export default Payment
