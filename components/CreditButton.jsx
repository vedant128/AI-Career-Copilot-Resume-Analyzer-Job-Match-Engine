import Link from "next/link";
import { Button } from "./ui/button";
import { Coins } from "lucide-react";

const CreditButton = ({ role, credits }) => {
    // If the user hasn't set their role yet (e.g. during onboarding), don't show the credit button
    if (!role) return null;

    const isInterviewer = role === "INTERVIEWER";
    
    // Interviewers don't strictly "buy" credits in the same way, 
    // but they earn them or have a balance. 
    // Interviewees buy them to book sessions.
    const href = isInterviewer ? "/dashboard" : "/pricing";

    return (
        <Button 
            variant="secondary" 
            size="sm" 
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
            asChild
        >
            <Link href={href}>
                <Coins size={14} className="text-amber-400" />
                <span className="font-medium text-stone-200">
                    {credits} {credits === 1 ? "Credit" : "Credits"}
                </span>
            </Link>
        </Button>
    );
};

export default CreditButton;
