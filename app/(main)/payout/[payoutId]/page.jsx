"use client";

import { useEffect, useState, use } from "react";
import { getPayout, approvePayout } from "@/actions/payout";
import PageHeader from "@/components/reusables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, CheckCircle, Clock, Wallet, User, Mail, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PayoutReviewPage({ params }) {
    const { payoutId } = use(params);
    const [payout, setPayout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [approving, setApproving] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchPayout = async () => {
            const data = await getPayout(payoutId);
            setPayout(data);
            setLoading(false);
        };
        fetchPayout();
    }, [payoutId]);

    const handleApprove = async (e) => {
        e.preventDefault();
        if (!password) {
            toast.error("Please enter the admin password");
            return;
        }

        setApproving(true);
        try {
            const res = await approvePayout({ payoutId, adminPassword: password });
            if (res.success) {
                toast.success("Payout approved successfully");
                setPayout((prev) => ({ ...prev, status: "PROCESSED" }));
            }
        } catch (err) {
            toast.error(err.message || "Approval failed");
        } finally {
            setApproving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin text-green-400" size={32} />
                <p className="text-stone-500 font-light">Loading payout details…</p>
            </div>
        );
    }

    if (!payout) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-3">
                <p className="text-stone-400">Payout request not found.</p>
            </div>
        );
    }

    const isProcessed = payout.status === "PROCESSED";

    return (
        <main className="min-h-screen bg-black">
            <PageHeader
                label="Payout Review"
                gray="Review and approve"
                green="Withdrawal Request"
                description="Verify details before processing the payment."
            />

            <div className="max-w-3xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Interviewer Info */}
                    <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-stone-400 mb-2">
                            <User size={18} className="text-green-400" />
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Interviewer</h3>
                        </div>
                        <div className="flex items-center gap-4">
                            {payout.interviewer.imageUrl && (
                                <img 
                                    src={payout.interviewer.imageUrl} 
                                    alt={payout.interviewer.name}
                                    className="w-12 h-12 rounded-full border border-white/10"
                                />
                            )}
                            <div>
                                <p className="text-stone-200 font-medium">{payout.interviewer.name}</p>
                                <div className="flex items-center gap-1.5 text-stone-500 text-xs mt-1">
                                    <Mail size={12} />
                                    {payout.interviewer.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Amount Info */}
                    <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-stone-400 mb-2">
                            <Wallet size={18} className="text-green-400" />
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Amount</h3>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-3xl font-serif text-green-400">${payout.netAmount.toFixed(2)}</p>
                            <p className="text-xs text-stone-500 mt-1">
                                {payout.credits} credits requested
                            </p>
                            <p className="text-[10px] text-stone-600 uppercase tracking-tighter">
                                Platform Fee: ${payout.platformFee.toFixed(2)} deducted
                            </p>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="md:col-span-2 bg-[#0f0f11] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-stone-400 mb-2">
                            <CreditCard size={18} className="text-green-400" />
                            <h3 className="text-sm font-semibold uppercase tracking-wider">Payment Method & Detail</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-stone-600 uppercase">Method</span>
                                <p className="text-stone-300">{payout.paymentMethod}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-stone-600 uppercase">Send To</span>
                                <p className="text-stone-300 break-all">{payout.paymentDetail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status & Approval */}
                    <div className="md:col-span-2 bg-[#0f0f11] border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-2">
                            {isProcessed ? (
                                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-1 gap-2">
                                    <CheckCircle size={14} />
                                    Processed
                                </Badge>
                            ) : (
                                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-1 gap-2">
                                    <Clock size={14} />
                                    Processing
                                </Badge>
                            )}
                        </div>

                        {!isProcessed && (
                            <form onSubmit={handleApprove} className="w-full max-w-sm flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs text-stone-500 text-center">Enter Admin Password to Approve</label>
                                    <Input 
                                        type="password"
                                        placeholder="Admin Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-black border-white/10 text-center"
                                    />
                                </div>
                                <Button 
                                    type="submit"
                                    variant="green"
                                    disabled={approving}
                                    className="w-full h-12 text-base"
                                >
                                    {approving ? (
                                        <Loader2 className="animate-spin mr-2" size={18} />
                                    ) : "Approve & Mark as Processed"}
                                </Button>
                            </form>
                        )}

                        {isProcessed && (
                            <div className="text-center">
                                <p className="text-stone-500 text-sm italic">
                                    This payout was processed on {new Date(payout.processedAt).toLocaleString()}.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
