import React from 'react'
import { Button } from '../ui/button'
import Image from "next/image";

const ProdList = () => {
  return (
    <div className='w-full h-[calc(100vh-12vh)] flex justify-center flex-col'>
        <div className='w-4/5 mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12'>
            <div>
                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl sl:text-5xl text-black font-bold uppercase'>
                <span className='text-logo'>Shop now</span> and enjoy <span className='text-logo'>30%</span> off on all orders over £50
                </h1>
                <p className='text-sm md:text-base lg:text-lg text-black text-opacity-70 mt-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <div className='flex mt-6 items-center space-x-4'>
                    <Button size={"lg"} className='bg-logo opacity-50 hover:bg-logo hover:opacity-95'>Shop Now</Button>
                    <Button size={"lg"} className='bg-gray-500'>Explore More</Button>
                </div>
            </div>
            <div className='hidden lg:block'>
                <Image
                    src="/images/ProdList.png"
                    alt="ProdList"
                    width={800}
                    height={800}
                    className="lg:h-[100%] lg:w-[100%] xl:w-[80%] xl:h-[80%]"
                    priority
                />
            </div>
        </div>
    </div>
  )
}

export default ProdList