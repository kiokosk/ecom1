'use client';

import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/use-localstorage";
import { clearCart } from "@/store/cartSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Paid({
    searchParams: { amount },
  }: {
    searchParams: { amount: string };
  }) {
    const dispatch = useDispatch();
    const [, setCarts] = useLocalStorage('items', []);

    useEffect(() => {
        dispatch(clearCart());
        setCarts('[]');
    }, [dispatch]);
    
    return (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr to-logo-background from-slate-300">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">Your order was successfully sent</h2>
  
          <div className="bg-white p-2 rounded-md text-logo mt-5 text-4xl font-bold">
            ${amount}
          </div>

          <Link href="/">
            <Button className="bg-logo mt-8 w-2/5 opacity-30 hover:bg-logo hover:opacity-90">Home</Button>
          </Link>
        </div>
      </main>
    );
  }
  