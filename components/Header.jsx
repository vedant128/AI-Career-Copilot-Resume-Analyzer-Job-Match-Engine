"use client";

import {
    SignInButton,
    SignUpButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";


const Header = () => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return null;
    }

    return (
        <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-10 py-3 border-b border-white/7 backdrop-blur-xl">
            <Link href={"/"} className="font-bold text-xl tracking-tight">
                <Image src={'/logo2.png'}
                    alt="InterviewXpert"
                    width={350}
                    height={350}
                    className="h-16 w-auto" />
            </Link>

            {/* redirection logic */}

            <div className="flex items-center gap-3">


                {!isSignedIn ? (
                    <>
                        {/* Links */}
                        {/* credits */}
                        <SignInButton mode='modal'>
                            <Button variant="ghost">
                                Sign In
                            </Button>
                        </SignInButton>

                        <SignUpButton >
                            <Button variant="gold">
                                Get Started
                            </Button>
                        </SignUpButton>
                    </>
                ) : (
                    <UserButton />
                )}

            </div>
        </nav>
    );
};

export default Header;