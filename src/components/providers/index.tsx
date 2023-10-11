"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, getSession } from "next-auth/react";
interface Props {
  children: React.ReactNode;
}

const client = new QueryClient();

export function Providers({ children }: Props) {
  return getSession().then((session) => (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>{children}</SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  ));
}

export default Providers;
