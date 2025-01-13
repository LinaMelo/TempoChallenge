import { useMutation, useQueryClient } from 'react-query';
import { transactionService } from '../services/transactions-service';
import { Transaction } from '../model/Transaction';

export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transactionService.addTransaction,
    onSuccess: (newTransaction) => {
      queryClient.setQueryData<Transaction[]>(["transactions"], (oldTransactions) => 
        oldTransactions ? [...oldTransactions, newTransaction] : [newTransaction]
      );
    },
    onError: (error: Error) => {
      console.error("Error al agregar la transacción:", error.message);
    },
  });
}
