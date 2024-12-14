'use client';

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { HeartIcon, UserIcon, SearchIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import CartSidebar from './CartSidebar';
import { Product } from '@/typing'; 
import axios from 'axios'; 

const Nav = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setAllProducts(response.data);
      } catch (err) {
        setError("Failed to fetch data from API");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered); 
    } else {
      setFilteredResults([]); 
    }
  }, [searchQuery, allProducts]);

  return (
    <div className="h-[12vh] sticky top-0 z-[1] bg-logo-background shadow-md">
      <div className="flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={120} height={100} className="object-none w-56 h-20" priority unoptimized />
        </Link>
        <div className="flex items-center space-x-6">
          {/* Search Functionality */}
          <div className="relative">
            {isSearchActive ? (
              <div className="flex items-center bg-white border rounded-md px-2 py-1">
                <input
                  type="text"
                  className="outline-none w-full"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="text-gray-500"
                  onClick={() => {
                    setIsSearchActive(false);
                    setSearchQuery("");
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <SearchIcon
                size={26}
                cursor="pointer"
                onClick={() => setIsSearchActive(true)}
              />
            )}
            {/* Show Loading or Error */}
            {isLoading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {/* Dropdown for search results */}
            {filteredResults.length > 0 && (
              <div className="absolute top-10 left-0 w-full bg-white shadow-md rounded-md z-10">
                <ul className="divide-y">
                  {filteredResults.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center space-x-4 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Link href={`/product/${product.id}`}>
                        <div className="flex items-center space-x-4">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={40}
                            height={40}
                            className="object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold">{product.title}</p>
                            <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <HeartIcon size={26} cursor="pointer" />
          {/* Shopping Cart */}
          <Sheet>
            <SheetTrigger>
              <div className="relative">
                {totalQty > 0 && (
                  <span className="absolute -top-3 -right-2 w-6 h-6 bg-logo text-center flex 
                      items-center justify-center text-xs text-white rounded-full">
                    {totalQty}
                  </span>
                )}
                <span
                  role="img"
                  aria-label="Shopping Cart"
                  style={{ fontSize: '26px', cursor: 'pointer' }}
                >
                  🛒
                </span>
              </div>
            </SheetTrigger>
            <SheetContent className="bg-white overflow-auto h-full">
              <CartSidebar items={items} />
            </SheetContent>
          </Sheet>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <UserIcon size={26} cursor="pointer" />
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Nav;





// import Link from "next/link";
// import Image from "next/image";
// import React from 'react'
// import { HeartIcon, UserIcon } from "lucide-react";
// import ShoppingCartButton from "./ShoppingCartButton";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { SearchIcon } from 'lucide-react';

// const Nav = () => {
//   return (
//     <div className="h-[12vh] sticky top-0 z-[1] bg-logo-background shadow-md">
//         <div className="flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full">
//             {/* logo */}
//             <Link href="/">
//                 <Image src="/images/logo.png" alt="logo" width={180} height={140} className="object-none w-56 h-20" priority/>
//             </Link>
//             <div className="flex items-center space-x-6">
//                 <SearchIcon size={26} cursor={"pointer"}/>
//                 <HeartIcon size={26} cursor={"pointer"}/>
//                 <ShoppingCartButton />
//                 <SignedIn>
//                     <UserButton/>
//                 </SignedIn>
//                 <SignedOut>
//                     <SignInButton>
//                         <UserIcon size={26} cursor={"pointer"} />
//                     </SignInButton>
//                 </SignedOut>
//             </div>

//         </div>
//     </div>
//   )
// }

// export default Nav

// 'use client';

// import Link from "next/link";
// import Image from "next/image";
// import React from 'react';
// import { HeartIcon, UserIcon, SearchIcon } from "lucide-react";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
// import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
// import CartSidebar from './CartSidebar';

// const Nav = () => {
//   const items = useSelector((state: RootState) => state.cart.items);
//   const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <div className="h-[12vh] sticky top-0 z-[1] bg-logo-background shadow-md">
//         <div className="flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full">
//             {/* logo */}
//             <Link href="/">
//                 <Image src="/images/logo.png" alt="logo" width={180} height={140} className="object-none w-56 h-20" priority />
//             </Link>
//             <div className="flex items-center space-x-6">
//                 <SearchIcon size={26} cursor={"pointer"} />
//                 <HeartIcon size={26} cursor={"pointer"} />
//                 {/* Shopping Cart with 🛒 Icon */}
//                 <Sheet>
//                   <SheetTrigger>
//                     <div className="relative">
//                       {totalQty > 0 && (
//                         <span className="absolute -top-3 -right-2 w-6 h-6 bg-logo text-center flex 
//                           items-center justify-center text-xs text-white rounded-full">
//                           {totalQty}
//                         </span>
//                       )}
//                       <span
//                         role="img"
//                         aria-label="Shopping Cart"
//                         style={{ fontSize: '26px', cursor: 'pointer' }}
//                       >
//                         🛒
//                       </span>
//                     </div>
//                   </SheetTrigger>
//                   <SheetContent className="bg-white overflow-auto h-full">
//                     <CartSidebar items={items} />
//                   </SheetContent>
//                 </Sheet>
//                 <SignedIn>
//                     <UserButton />
//                 </SignedIn>
//                 <SignedOut>
//                     <SignInButton>
//                         <UserIcon size={26} cursor={"pointer"} />
//                     </SignInButton>
//                 </SignedOut>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Nav;


