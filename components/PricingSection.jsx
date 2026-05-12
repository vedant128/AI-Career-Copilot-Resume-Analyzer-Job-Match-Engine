"use client";

import { useAuth } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/data";

export default function PricingSection() {
    const { has, userId } = useAuth();

    const isSignedIn = !!userId;
    const isOnStarter = isSignedIn && has({ plan: "starter" });
    const isOnPro = isSignedIn && has({ plan: "pro" });
    const isOnFree = isSignedIn && !isOnStarter && !isOnPro;

    const activePlanSlug = isOnPro
        ? "pro"
        : isOnStarter
            ? "starter"
            : isOnFree
                ? "free"
                : null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
                const isActive = activePlanSlug === plan.slug;

                return (
                    <div
                        key={plan.name}
                        className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1
                            ${plan.featured
                                ? "bg-[#0c110d] border-2 border-green-400/40 shadow-[0_0_40px_rgba(34,197,94,0.08)]"
                                : "bg-[#0c110d] border border-[#1a2b1b] hover:border-green-400/20"
                            }
                            ${isActive ? "ring-1 ring-green-400/40" : ""}
                        `}
                    >
                        {/* Most Popular badge */}
                        {plan.featured && !isActive && (
                            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-400 text-[#080c09] text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full whitespace-nowrap">
                                Most Popular
                            </span>
                        )}

                        {/* Plan name */}
                        <p className="text-xs font-semibold text-[#5E7A62] tracking-widest uppercase mb-6">
                            {plan.name}
                        </p>

                        {/* Price */}
                        <div className="flex items-end gap-1 mb-2">
                            <span
                                className={`font-serif text-6xl leading-none tracking-tight ${plan.featured
                                    ? "bg-gradient-to-br from-green-300 to-green-500 bg-clip-text text-transparent"
                                    : "bg-gradient-to-br from-stone-100 to-stone-400 bg-clip-text text-transparent"
                                    }`}
                            >
                                {plan.price}
                            </span>
                            <span className="text-sm text-[#5E7A62] font-light mb-2">
                                /month
                            </span>
                        </div>

                        {/* Credits */}
                        <p className={`text-sm font-medium mb-7 ${plan.featured ? "text-green-400" : "text-green-500/70"
                            }`}>
                            {plan.credits}
                        </p>

                        {/* Divider */}
                        <div className="h-px bg-[#1a2b1b] mb-7" />

                        {/* Features */}
                        <ul className="space-y-3.5 mb-10 flex-1">
                            {plan.features.map((f) => (
                                <li
                                    key={f}
                                    className="flex items-start gap-2.5 text-sm text-[#a3b8a5]"
                                >
                                    <span className="text-green-400 text-xs mt-0.5 shrink-0">✓</span>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        {isActive ? (
                            <Button
                                variant="outline"
                                disabled
                                className="w-full opacity-60 cursor-not-allowed border-[#1a2b1b] text-[#5E7A62]"
                            >
                                ✓ Current plan
                            </Button>
                        ) : plan.planId === null ? (
                            isSignedIn ? (
                                <Button
                                    variant="outline"
                                    disabled
                                    className="w-full opacity-50 cursor-not-allowed border-[#1a2b1b] text-[#5E7A62]"
                                >
                                    Default plan
                                </Button>
                            ) : (
                                <SignInButton mode="modal">
                                    <Button variant="outline" className="w-full border-[#1a2b1b] text-[#F0F7F1] hover:border-green-400/30 hover:text-green-400">
                                        Get started free
                                    </Button>
                                </SignInButton>
                            )
                        ) : isSignedIn ? (
                            <CheckoutButton
                                planId={plan.planId}
                                planPeriod="month"
                                checkoutProps={{
                                    appearance: {
                                        elements: {
                                            drawerRoot: { zIndex: 2000 },
                                        },
                                    },
                                }}
                            >
                                <Button
                                    variant={plan.featured ? "green" : "outline"}
                                    className={`w-full ${!plan.featured ? "border-[#1a2b1b] text-[#F0F7F1] hover:border-green-400/30 hover:text-green-400" : ""}`}
                                >
                                    {activePlanSlug === "pro" && plan.slug === "starter"
                                        ? "Downgrade"
                                        : activePlanSlug === "starter" && plan.slug === "pro"
                                            ? "Upgrade →"
                                            : "Get started →"}
                                </Button>
                            </CheckoutButton>
                        ) : (
                            <SignInButton mode="modal">
                                <Button
                                    variant={plan.featured ? "green" : "outline"}
                                    className={`w-full ${!plan.featured ? "border-[#1a2b1b] text-[#F0F7F1] hover:border-green-400/30 hover:text-green-400" : ""}`}
                                >
                                    Get started →
                                </Button>
                            </SignInButton>
                        )}
                    </div>
                );
            })}
        </div>
    );
}