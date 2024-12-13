


'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addItem } from '@/store/cartSlice';
import { Product } from '@/typing';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddCart = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(product.price);

  const addToCartHandler = () => {
    toast({
      description: "Item added!",
      variant: "success",
    });
    dispatch(addItem({ ...product, quantity }));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
    setSubtotal((prev) => parseFloat((prev + product.price).toFixed(2)));
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setSubtotal((prev) => parseFloat((prev - product.price).toFixed(2)));
    }
  };

  return (
    <div className='mt-4'>
      <div className='flex items-center space-x-4'>
        <Button onClick={decrementQuantity} className='px-4 py-2 bg-gray-200 text-black'>-</Button>
        <span className='text-lg font-semibold'>{quantity}</span>
        <Button onClick={incrementQuantity} className='px-4 py-2 bg-gray-200 text-black'>+</Button>
      </div>
      <p className='mt-2 text-sm text-gray-600'>Subtotal: £{subtotal.toFixed(2)}</p>
      <Button onClick={addToCartHandler} className='bg-logo mt-4'>Add To Cart</Button>
    </div>
  );
};

export default AddCart;