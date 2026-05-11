'use client';
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import { cn } from '@/lib/utils';

export const StarsBackgroundDemo = () => {
    return (
        <StarsBackground
            starColor="#ffffff"
            className={cn(
                'absolute inset-0 flex items-center justify-center rounded-xl bg-black'
            )}
        />
    );
};