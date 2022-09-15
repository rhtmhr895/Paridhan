import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import {BsFillBagCheckFill} from 'react-icons/bs'
import Link from 'next/link'
import Head from 'next/head';
import Script from 'next/script';
const Checkout = ({cart, addToCart, removeFromCart, subTotal}) => {
  const initiatePayment = ()=>{
    function onScriptLoad(){
      let txnToken;
      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
        "orderId": "Math.random(", /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": amount /* update amount */
        },
        "handler": {
          "notifyMerchant": function(eventName,data){
            console.log("notifyMerchant handler function called");
            console.log("eventName => ",eventName);
            console.log("data => ",data);
          } 
        }
      };

      if(window.Paytm && window.Paytm.CheckoutJS){
          window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
              // initialze configuration using init method 
              window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                  // after successfully updating configuration, invoke JS Checkout
                  window.Paytm.CheckoutJS.invoke();
              }).catch(function onError(error){
                  console.log("error => ",error);
              });
          });
      } 
  }
  }
  return (
    <div className='container px-2 sm:m-auto'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head><Script type="application/javascript" crossorigin="anonymous" src={`{process.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} onload="onScriptLoad();"/>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
      <div className='mx-auto flex my-4'>
        <div className='px-2 w-1/2'>
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        </div>
        <div className='px-2 w-full'>
          <div className="mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea name="address" id="address" cols="30" row ="10" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
          </div>
        </div>
        <div className='mx-auto flex my-4'>
        <div className='px-2 w-1/2'>
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        </div>
        <div className='mx-auto flex my-4'>
        <div className='px-2 w-1/2'>
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 w-1/2'>
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        </div>
       
       
        <h2 className='font-semibold text-xl'>2. Review Cart Items</h2>
        <div  className =" sidecart m-2 py-6 px-6 bg-red-200">
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length ==0 && 
                    <div className='my-4 text-base font-semibold'>Your Cart Is Empty</div>
                    }
                   {Object.keys(cart).map((k)=> {return <li key={k}>
                        <div className="item flex my-5">
                        <div className='font-semibold'>{cart[k].name}({cart[k].variant}/{cart[k].size})</div>
                        <div className='flex font-semibold items-center justify-center w-1/3 text-lg'><AiFillMinusCircle onClick={() => {removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant )}} className='cursor-pointer text-red-500'/><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => {addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant )}}  className='cursor-pointer text-red-500'/></div>
                         </div>   
                    </li>})}
                </ol>
                <span className='total font-bold'>Subtotal: ₹{subTotal}</span>
            </div>
            <div className='mx-4'>
            <Link href={'/checkout'}><button onClick={initiatePayment} className="flex mr-2 text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-m"><BsFillBagCheckFill className='m-1'/>Pay ₹{subTotal}</button></Link></div>  
        </div>
        

  )
}

export default Checkout