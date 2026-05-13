"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import PricingSection from "./PricingSection";
import { AlertCircle } from "lucide-react";

export default function UpgradeModal({ open, onOpenChange, reason }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-green-200/10 min-w-[70vw] max-h-[90vh] overflow-y-scroll no-scrollbar bg-grey">
                <DialogHeader>
                    <div className="flex items-start gap-2 mb-2">
                        <AlertCircle className="text-green-400 ml-2 mt-1" />
                        <div>
                            <DialogTitle className="font-serif text-2xl text-white">
                                Upgrade your plan
                            </DialogTitle>

                        </div>
                    </div>
                </DialogHeader>

                {/* PricingSection or any children slot in here */}
                <div className="px-2 pb-6">
                    <PricingSection />
                </div>
            </DialogContent>
        </Dialog>
    );
}