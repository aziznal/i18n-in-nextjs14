"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { queryClient } from "./tanstack-query-client";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
