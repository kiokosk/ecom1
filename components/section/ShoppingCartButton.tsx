'use client';

import { RootState } from '@/store/store';
import { ShoppingBagIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import CartSidebar from './CartSidebar';

const ShoppingCartButton = () => {
  const items = useSelector((state:RootState) => state.cart.items);
  const totalQty = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger>
        <div className='relative'>
            {totalQty > 0 && (
              <span className="absolute -top-3 -right-2 w-6 h-6 bg-logo text-center flex 
                items-center justify-center flex-col text-xs text-white rounded-full">
                  {totalQty}
              </span>
            )}
            <ShoppingBagIcon cursor={"pointer"} size={26}/>
        </div>
      </SheetTrigger>
      <SheetContent className='bg-white overflow-auto h-full'>
        <CartSidebar items={items}/>
      </SheetContent>
    </Sheet>
  )
}

export default ShoppingCartButton