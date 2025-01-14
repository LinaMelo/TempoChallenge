import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"
import { useState } from "react"
import { Transaction } from "../model/Transaction"

interface AddTransactionDialogProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => Promise<boolean>
  children: React.ReactNode
  isAdding: boolean
}

export function AddTransactionDialog({ onAddTransaction, children, isAdding }: AddTransactionDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddTransaction = async (transaction: Omit<Transaction, "id">) => {
    const success = await onAddTransaction(transaction)
    if (success) {
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva Transacción</DialogTitle>
        </DialogHeader>
        <TransactionForm
          onSubmit={handleAddTransaction}
          onCancel={() => setIsOpen(false)}
          isSubmitting={isAdding}
        />
      </DialogContent>
    </Dialog>
  )
}

