/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useState } from 'react'
import { GoSmiley } from 'react-icons/go'
import mongoose from 'mongoose'
import Product from '../models/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ buyNow, addToCart, product, variants }) => {
  console.log(product, variants)
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const CheckServiceability = async () => {
    let pins = await fetch('http://localhost:3000/api/pincode')
    let pinJson = await pins.json()
    console.log(pinJson, pin)
    if (pinJson.includes(parseInt(pin))) {
      setService(true)
      toast.success('🦄 Your Pincode is Servicable!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    else {
      setService(false)
      toast.error('🦄 Sorry Your Pincode is not Servicable yet!!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  const onChangePin = (e) => {
    setPin(e.target.value)
  }
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)

  const refreshVariant = (newsize, newcolor) => {
    console.log(variants, newsize, newcolor)
    let url = `http://localhost:3000/product/${variants[newcolor][newsize]['slug']}`
    window.location = url;




  }



  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24  object-cover object-top rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font font-extrabolds text-gray-500 tracking-widest">{product.title}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}/({product.color}/{product.size})</h1>
            <div className="flex mb-4">
              {/* <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
               
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span> */}
            </div>
            <p className="leading-relaxed">{[product].desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('White') && Object.keys(variants['White']).includes(size) && <button onClick={() => { refreshVariant(size, 'White') }} className={`border-2  rounded-full w-6 h-6 focus:outline-none ${color === 'White' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Grey') && Object.keys(variants['Grey']).includes(size) && <button onClick={() => { refreshVariant(size, 'Grey') }} className={`border-2  ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Grey' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Red') && Object.keys(variants['Red']).includes(size) && <button onClick={() => { refreshVariant(size, 'Red') }} className={`border-2  ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Blue') && Object.keys(variants['Blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'Blue') }} className={`border-2  ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Black') && Object.keys(variants['Black']).includes(size) && <button onClick={() => { refreshVariant(size, 'Black') }} className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'Black' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Sea Green') && Object.keys(variants['Sea Green']).includes(size) && <button onClick={() => { refreshVariant(size, 'Sea Green') }} className={`border-2  ml-1 bg-teal-400 rounded-full w-6 h-6 focus:outline-none ${color === 'Sea Green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Pink') && Object.keys(variants['Pink']).includes(size) && <button onClick={() => { refreshVariant(size, 'Pink') }} className={`border-2  ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none ${color === 'Pink' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Purple') && Object.keys(variants['Purple']).includes(size) && <button onClick={() => { refreshVariant(size, 'Purple') }} className={`border-2  ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none  ${color === 'Purple' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Yellow') && Object.keys(variants['Yellow']).includes(size) && <button onClick={() => { refreshVariant(size, 'Yellow') }} className={`border-2  ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none ${color === 'Yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10">
                    {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                    {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                    {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                    {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                    {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}

                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex ">
              <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
              <button onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} className="flex ml-14 text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
              <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }} className="flex ml-10 text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded">Add To Cart</button>

              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
            </div>
            <div className='pin mt-6 flex space-x-2 text-sm'>
              <input onChange={onChangePin} className='px-2 border-2 border-red-500 rounded-md' type="text" />
              <button onClick={CheckServiceability} className='flex ml-14 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'>Check Delivery</button>
            </div>
            {!service && service != null && <div className='text-red-800 sm mt-3'>Sorry We do not deliver to this pincode!!!
            </div>}
            {service && service != null && <div className='text-green-800 sm mt-3'>Delivery available<GoSmiley />
            </div>}
          </div>
        </div>
      </div>
    </section></>
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let product = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: product.title, category: product.category  })
  let colorSizeSlug = {}
  for (let item of variants) {

    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }


  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
  }
}

export default Post