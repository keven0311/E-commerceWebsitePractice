import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios'

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements()

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing ] = useState("")
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method:"post",
                //stripe expects the total in a currencies subunits
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    },[basket])

    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            navigate('/orders')
        })
    }

    const handleChange = e => {
        //listen for changes in the CardElement
        //and display any errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "")
    }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout(<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>

            {/* payment section - delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 ADDRESS ST</p>
                    <p>CITY, STATE</p>
                </div>
            </div>

            {/* payment section - review items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            {/* payment section - payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/* Stripe magic will go */}

                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className='payment__priceContainer'>
                            <CurrencyFormat 
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
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                           {/* if there are some errors when entering card number informations, it will display the error to user */}
                        {error && <div>{error}</div>}
                    </form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Payment