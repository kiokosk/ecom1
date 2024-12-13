import { addItem, CartItem, removeItem } from '@/store/cartSlice';
import React from 'react'
import Image from "next/image";
import { Button } from '../ui/button';
import Link from 'next/link';
import { SheetClose } from '../ui/sheet';
import { useDispatch } from 'react-redux';

type Props = {
    items:CartItem[];
}
const CartSidebar = ({ items }:Props) => {
    const dispatch = useDispatch();
    const addToCartHandler = (item:CartItem) => dispatch(addItem(item));
    const removeCartHandler = (id:number) => dispatch(removeItem({id}));
    
    return (
        <>
            {items.length === 0 && (
                <div className='mt-6 h0full mb-6'>
                    <div className='flex items-center w-full h-[80vh] flex-col justify-center'>
                        <Image src="/images/ProdList.png" alt="empty_cart" width={200} height={200} className="object-cover mx-auto" />
                        <h1 className="mt-8 text-2xl font-semibold">Your cart is empty</h1>
                    </div>
                </div>
            )}
            {items.length > 0 && (
                <div className='mt-6 h0full mb-6'>
                    <h1 className='text-center font-bold text-lg mb-6'>Cart Items</h1>
                    {items?.map((item)=>{
                        return (
                            <div key={item.id} className='mt-4 pb-4 border-b-2 border-gray-300 border-opacity-60 p4'>
                                <div className='w-[200px] h-[150px]'>
                                    <Image src={item?.image} alt={item.title} width={60} height={80} className='w-[80%] h-[80%] object-contain'/>
                                </div>
                                <div>
                                    <h1 className='text-sm w-4/5 font-semibold truncate'>{item?.title}</h1>
                                    <h1 className='text-base w-4/5 text-blue-950 font-bold'>£{(item?.price * item?.quantity).toFixed(2)}</h1>
                                    <h1 className='text-base w-4/5 font-bold mb-2'>Quantity: {item?.quantity}</h1>
        
                                    <div className='flex items-center space-x-4'>
                                        <Button onClick={()=>removeCartHandler(item.id)} size={"sm"} className='bg-gray-500'>
                                            Remove
                                        </Button>
                                        <Button onClick={()=>addToCartHandler(item)} size={"sm"} className='bg-logo opacity-50 hover:bg-logo hover:opacity-95'>
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <Link href="/cart">
                        <SheetClose>
                            <Button className='w-full mb-6 mt-6 bg-logo opacity-50 hover:bg-logo hover:opacity-95'>Checkout</Button>
                        </SheetClose>
                    </Link>
                </div>
            )}
        </>
    )
}

export default CartSidebar