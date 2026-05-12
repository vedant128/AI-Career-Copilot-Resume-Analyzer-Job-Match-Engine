"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import UpgradeModal from "./UpgradeModal";
import { Button } from "./ui/button";

export default function CreditButton({ role, credits }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (role === "INTERVIEWER") {
            window.location.href = "/dashboard";
        } else {
            setOpen(true);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                className="border-green-400/20 text-green-400 cursor-pointer bg-black hover:bg-black hover:text-white"
                onClick={handleClick}
            >
                <Coins size={14} />
                <span className=" opacity-70">
                    {credits} {role === "INTERVIEWER" ? "Earned" : "Credits"}
                </span>
            </Button>

            <UpgradeModal open={open} onOpenChange={setOpen} />
        </>
    );
}