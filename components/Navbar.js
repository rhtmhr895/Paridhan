/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (ref.current.classList.contains('translate-x-0')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    const ref = useRef()
    return (

        <div className='flex flex-col md:flex-row md:justify-start justify-between items-center py-2 shadow-md sticky top-0 bg-white z-10'>
            <div className="logo mx-3">
                <Link href={'/'}><a>
                    <Image src='/wearrit.jpg' alt='logo' width={90} height={50} /></a>
                </Link>
            </div>
            <div className="nav">
                <ul className="flex items-center space-x-4 font-bold md:text-md">
                    <Link href={'/trousers'}><a><li className='hover:text-red-500'>Trousers</li></a></Link>
                    <Link href={'/tshirts'}><a><li className='hover:text-red-500'>Tshirts</li></a></Link>
                    <Link href={'/jeans'}><a><li className='hover:text-red-500'>Jeans</li></a></Link>
                    <Link href={'/watches'}><a><li className='hover:text-red-500'>Watches</li></a></Link>
                    <Link href={'/caps'}><a><li className='hover:text-red-500'>Caps</li></a></Link>
                </ul>
            </div>
            <div className=" cursor-pointer cart absolute right-0 top-4 mx-5 flex ">
               <Link href={'/login'}><a><MdAccountCircle className='text-xl md:text-2xl mx-2' /></a></Link>
                <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-2xl' />
            </div>
            <div ref={ref} className={` w-72 h-[100vh] sidecart overflow-y-scroll absolute top-0 right-0 bg-red-300 py-10 px-8 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className="absolute top-2 right-2 cursor-pointer text-2xl text-red-500"><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length == 0 &&
                        <div className='my-4 text-base font-semibold'>your cart is empty</div>
                    }
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].variant}/{cart[k].size})</div>
                                <div className='flex font-semibold items-center justify-center w-1/3 text-lg'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-red-500' /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-red-500' /></div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className='total my-2 font-semibold'>Subtotal: ₹{subTotal}</div>
                <div className='flex'>

                    <Link href={'/checkout'}><button className="flex mr-2 text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-m"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>

                    <button onClick={clearCart} className="flex mr-2 text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-s">Clear Cart</button></div>
            </div>
        </div>
    )
}

export default Navbar