import { useQuery } from 'react-query';
import { transactionService } from '../services/transactions-service';

const fetchTransactions = async () => {
  const response = await transactionService.getTransactions(); 
  return response;
};

export const useTransactions = () => {
  return useQuery('transactions', fetchTransactions, {
    staleTime: 60000,  
    cacheTime: 300000, 
  });
};
