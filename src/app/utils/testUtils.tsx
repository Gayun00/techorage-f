import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from "@tanstack/react-query";
import { render, renderHook, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";

const TestProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestProviders, ...options });

const createQueryClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const createMockedQuery = (hook: () => UseQueryResult<any, unknown>) => {
  return renderHook(() => hook(), { wrapper: createQueryClientWrapper });
};

export * from "@testing-library/react";
export { customRender };
