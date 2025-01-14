import { useMutation, useQueryClient } from "react-query";
import { transactionService } from "../services/transactions-service";
import { Transaction } from "../model/Transaction";

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: transactionService.deleteTransaction,
    onSuccess: (deletedTransactionId: string) => {
      queryClient.invalidateQueries("transactions");
      queryClient.setQueryData<Transaction[]>("transactions", (oldTransactions) => {
        return oldTransactions?.filter((transaction) => transaction.id !== deletedTransactionId) || [];
      });
    },
    onError: (error: Error) => {
      console.error("Error al eliminar la transacción:", error.message);
    },
  });
};
