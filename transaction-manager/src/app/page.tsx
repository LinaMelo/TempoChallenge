"use client"
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TransactionManager from './pages/transaction-manager';

const queryClient = new QueryClient();

const Pages: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionManager />
    </QueryClientProvider>
  );
};

export default Pages;
