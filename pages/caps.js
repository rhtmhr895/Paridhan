/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from './models/Product';


const Caps = ({products}) => {
  console.log(products)

  return (
    <div><section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
         {Object.keys(products).legth===0&&<p>SORRY caps Are Out of Stock</p>}

         {Object.keys(products).map((item)=>{
         
         return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-2 ">
            <a className="block relative  rounded overflow-hidden">
              <img alt="wearrit" className=" h-[30vh] md:h-[36vh] block m-auto" src={products[item].img} />
            </a>
            <div className="mt-4 text-center md:text-left">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">caps</h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
              <p className="mt-1">₹{products[item].price}</p>
              <div className="mt-1">
                {products[item].size.includes('U')&& <span className='border border-black-400 px-1 mx1'>U</span>}
               
              </div>
              <div className="mt-1">
              {products[item].color.includes('Grey')&&<button className="border-2 border-gray-300 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes('Blue')&&<button className="border-2 border-gray-300 bg-blue-400 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes('Black')&&<button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes('White')&&<button className="border-2 border-gray-300 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
              </div>
            </div>
          </div>
          </Link> })}
        </div>
      </div>
    </section></div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let products = await Product.find({category:'caps'})
  let caps = {}
  for (let item of products) {
    if (item.title in caps) {
      if(!caps[item.title].color.includes(item.color) && item.availableQty > 0) {
        caps[item.title].color.push(item.color)
      }
      if(!caps[item.title].size.includes(item.size) && item.availableQty > 0) {
        caps[item.title].size.push(item.size)
      }
    }
     else {
      caps[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        caps[item.title].color = [item.color]
        caps[item.title].size = [item.size]

      }
    }
  }

  return {
    props: {products: JSON.parse(JSON.stringify(caps))}, // will be passed to the page component as props
  }
}
export default Caps