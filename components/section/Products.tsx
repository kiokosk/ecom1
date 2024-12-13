

'use client';
import React, { useEffect, useState } from 'react';
import { getAllCategories, getAllProducts, getProductsByCategory } from '@/Request/requests';
import { Product } from '@/typing';
import { Loader } from 'lucide-react';
import { Toaster } from 'sonner';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);

        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.log('!!error=', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchProductsByCategory = async (category: string | null) => {
    setLoading(true);
    try {
      const productsData = category 
        ? await getProductsByCategory(category)
        : await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.log('!!error=', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  return (
    <div className='pt-16 pb-12'>
      <Toaster richColors />
      <h1 className='text-center font-bold text-2xl'>
        Category
      </h1>

      {/* Category Filter */}
      <div className="category-list mt-12 w-4/5 mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* All Categories Option */}
        <div
          key="all"
          className={`p-6 rounded-lg cursor-pointer text-center transition-all duration-300 ${
            !selectedCategory
              ? 'bg-gray-200 text-blue-600 shadow-md'
              : 'bg-white text-logo border border-gray-300 hover:bg-gray-100 hover:text-blue-600'
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          <h1 className="text-sm sm:text-base md:text-lg font-bold">All</h1>
        </div>

        {/* Specific Categories */}
        {categories.map((category) => (
  <div
    key={category}
    className={`p-6 rounded-lg cursor-pointer text-center transition-all duration-300 ${
      selectedCategory === category
        ? 'bg-gray-200 text-blue-600 shadow-md' // Blue text after selection
        : 'bg-white text-black border border-gray-300 hover:bg-gray-100 hover:text-blue-600' // Black text before selection
    }`}
    onClick={() => handleCategoryClick(category)}
  >
    <h1 className="text-sm sm:text-base md:text-lg font-bold capitalize">
      {category}
    </h1>
  </div>
))}

      </div>

      {loading ? (
        <div className='flex justify-center items-center mt-16'>
          <Loader size={32} className='animate-spin'/>
        </div>
      ) : (
        <>
  
          <div className="w-4/5 mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
  {products.map((product) => (
    <div
      key={product.id}
      className="relative p-4 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
    >
      <ProductCard product={product} showActions={false} />
    </div>
  ))}
</div>


        </>
      )}
    </div>
  );
};

export default Products;
