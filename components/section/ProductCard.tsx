


'use client';

import { Product } from '@/typing';
import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { HeartIcon, ShoppingBag, StarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { useToast } from '@/hooks/use-toast';

type Props = {
  product: Product;
  showActions?: boolean; // Optional prop to control action visibility
};

const ProductCard = ({ product, showActions = true }: Props) => {
  const [quantity, setQuantity] = useState(1); // State for quantity
  const num = Math.round(product.rating.rate);
  const ratingArray = new Array(num).fill(0);
  const { toast } = useToast();

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    toast({
      description: "Item added!",
      variant: "success",
    });
    dispatch(addItem({ ...product, quantity })); // Pass product with quantity
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent quantity < 1
  };

  return (
    <div className='mt-2 mb-28 w-[200px] h-[300px]'>
      <Image
        src={product.image}
        alt={`${product.title}`}
        width={100}
        height={100}
        className='w-[80%] h-[60%]'
      />
      <p className='mt-5 text-xs capitalize text-gray-600'>
        {product.category}
      </p>
      <Link href={`/product/product-details/${product.id}`}>
        <h1 className='text-lg cursor-pointer hover:text-blue-900 transition-all hover:underline sm:w-full sm:truncate mt-2 text-black font-semibold'>
          {product.title}
        </h1>
      </Link>
      <div className='flex items-center'>
        {ratingArray.map((_, index) => (
          <StarIcon
            key={index}
            size={16}
            fill='orange'
            className='text-yellow-400'
          />
        ))}
      </div>
      <div className='flex mt-2 items-center space-x-2'>
        <p className='text-black text-base line-through font-semibold opacity-50'>{`£${(product.price + 10).toFixed(2)}`}</p>
        <p className='text-black text-lg font-bold opacity-80'>{`£${product.price.toFixed(2)}`}</p>
      </div>
      {/* Conditionally render actions */}
      {showActions && (
        <div className='flex flex-col mt-2 items-center space-y-3'>
          {/* Quantity Selector */}
          <div className='flex items-center space-x-2'>
            <Button
              className='bg-gray-200 hover:bg-gray-300 text-black px-2'
              onClick={decreaseQuantity}
              size='icon'
            >
              -
            </Button>
            <span className='text-black font-semibold'>{quantity}</span>
            <Button
              className='bg-gray-200 hover:bg-gray-300 text-black px-2'
              onClick={increaseQuantity}
              size='icon'
            >
              +
            </Button>
          </div>
          {/* Add to Cart Button */}
          <Button
            className='bg-logo opacity-50 hover:bg-logo hover:opacity-95'
            onClick={addToCartHandler}
          >
            <ShoppingBag size={18} className='mr-2' />
            Add to Cart
          </Button>
          {/* Wishlist Icon */}
          <HeartIcon
            size={18}
            className='w-8 text-rose-500 hover:fill-rose-500 cursor-pointer'
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
