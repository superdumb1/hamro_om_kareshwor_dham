"use client";
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    // Setup a stable instance state to prevent re-instantiation across re-renders
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // Cache records for 5 minutes before background checking
                refetchOnWindowFocus: false, // Turn off noisy focus queries
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}