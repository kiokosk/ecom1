
import { getProduct, getProductsByCategory } from '@/Request/requests';
import { Product } from '@/typing';
import React from 'react';
import Image from 'next/image';
import { StarIcon } from 'lucide-react';
import AddCart from './add-cart';
import ProductCard from '@/components/section/ProductCard';

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const product: Product = await getProduct(id);
  const relatedProducts: Product[] = await getProductsByCategory(product.category);
  const num = Math.round(product?.rating?.rate);
  const starArray = new Array(num).fill(0);

  return (
    <div className='mt-20'>
      <div className='w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-7 items-center gap-4'>
        <div className='col-span-3 mb-6 lg:mb-0'>
          <Image src={product.image} alt={product.title} width={400} height={400} />
        </div>
        <div className='col-span-4'>
          <h1 className='lg:text-3xl text-2xl font-bold text-black'>{product.title}</h1>
          <div className='mt-2 flex items-center space-x-2'>
            <div className='flex items-center'>
              {starArray.map(() => {
                return (
                  <StarIcon
                    key={Math.random() * 5000}
                    size={20}
                    fill='orange'
                    className='text-yellow-400'
                  />
                );
              })}
            </div>
            <p className='text-base text-gray-700 font-semibold'>({product?.rating.count})</p>
          </div>
          <span className='w-1/4 h-[1.6px] bg-gray-400 rounded-lg block mt-4 opacity-20 mb-4'></span>
          <h1 className='lg:text-6xl text-3xl md:text-4xl text-blue-950 font-bold'>£{product?.price.toFixed(2)}</h1>
          <p className='mt-4 text-base text-black opacity-70'>{product.description}</p>
          <p className='mt-4 text-sm text-black text-opacity-70 font-semibold'>Category: {product?.category}</p>
          <p className='mt-2 text-sm text-black text-opacity-70 font-semibold'>Tag: Shop</p>
          <p className='mt-2 text-sm text-black text-opacity-70 font-semibold'>SKU: {Math.random() * 500}</p>

          <AddCart product={product} />
        </div>
      </div>
      <div className='w-4/5 mt-16 mx-auto'>
        <h1 className='text-2xl text-black font-semibold'>Related Products</h1>
        <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12'>
          {relatedProducts.map((p) => {
            return <ProductCard key={p.id} product={p} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;