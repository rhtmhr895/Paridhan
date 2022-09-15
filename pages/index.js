/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'


export default function Home() {
  return (
    <div >
      <Head>
        <title>WearrIt.com</title>
        <meta name="description" content="WearIt.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<div>
  <img src='/homepage.jpg' alt='image'/>
</div>
<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">WearrIt.com</h1>
      <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Express Yourself.</p>
    </div>
  </div>
</section>     
    </div>
  )
}
