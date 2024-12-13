import Link from "next/link";
import Image from "next/image";
import React from 'react'
import { HeartIcon, UserIcon } from "lucide-react";
import ShoppingCartButton from "./ShoppingCartButton";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SearchIcon } from 'lucide-react';

const Nav = () => {
  return (
    <div className="h-[12vh] sticky top-0 z-[1] bg-logo-background shadow-md">
        <div className="flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full">
            {/* logo */}
            <Link href="/">
                <Image src="/images/logo.png" alt="logo" width={180} height={140} className="object-none w-56 h-20" priority/>
            </Link>
            <div className="flex items-center space-x-6">
                <SearchIcon size={26} cursor={"pointer"}/>
                <HeartIcon size={26} cursor={"pointer"}/>
                <ShoppingCartButton />
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                <SignedOut>
                    <SignInButton>
                        <UserIcon size={26} cursor={"pointer"} />
                    </SignInButton>
                </SignedOut>
            </div>

        </div>
    </div>
  )
}

export default Nav