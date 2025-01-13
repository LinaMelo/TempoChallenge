import { useMutation, useQueryClient } from 'react-query';
import { transactionService } from '../services/transactions-service';
import { Transaction } from '../model/Transaction';

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transactionService.updateTransaction,
    onSuccess: (updatedTransaction: Transaction) => {
      queryClient.setQueryData<Transaction[]>(["transactions"], (oldTransactions) => {
        return oldTransactions ? 
          oldTransactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t) 
          : [];
      });
    },
    onError: (error: Error) => {
      console.error("Error al actualizar la transacción:", error.message);
    },
  });
}
