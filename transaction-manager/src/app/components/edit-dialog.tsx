import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"
import { Transaction } from "../model/Transaction";

interface EditTransactionDialogProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTransaction: (transaction: Transaction) => Promise<boolean>;
  isEditing: boolean;
}

export function EditTransactionDialog({
  transaction,
  isOpen,
  onClose,
  onUpdateTransaction,
  isEditing,
}: EditTransactionDialogProps) {
  const handleUpdateTransaction = async (updatedTransaction: Omit<Transaction, "id">) => {
    const success = await onUpdateTransaction({ ...updatedTransaction, id: transaction.id })
    if (success) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Transacción</DialogTitle>
        </DialogHeader>
        <TransactionForm
          transaction={transaction}
          onSubmit={handleUpdateTransaction}
          onCancel={onClose}
          isSubmitting={isEditing}
        />
      </DialogContent>
    </Dialog>
  )
}

