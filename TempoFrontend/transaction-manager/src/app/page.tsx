"use client"
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ClientPanel from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import { Button, Icon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const queryClient = new QueryClient();

const Pages: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'clientPanel' | 'transactionForm'>('clientPanel');

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header>
          <h1>Gestor de Transacciones</h1>
          <nav style={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={() => setCurrentPage('transactionForm')}>Agregar Transacción
          <AddIcon />
          </Button>
          <Button variant="contained" onClick={() => setCurrentPage('clientPanel')}>Listado Transacciones</Button>
          </nav>
        </header>

        <main>
          {currentPage === 'clientPanel' && <ClientPanel />}
          {currentPage === 'transactionForm' && <TransactionForm />}
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Pages;