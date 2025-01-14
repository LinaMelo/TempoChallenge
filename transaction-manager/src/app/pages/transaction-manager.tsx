"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "../model/Transaction";
import { EditTransactionDialog } from "../components/edit-dialog";
import { AddTransactionDialog } from "../components/add-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTransactions } from "../hooks/useTransactions";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction";
import { CalendarIcon } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useDeleteTransaction } from "../hooks/useDeleteTransaction";

export default function TransactionManager() {
  const { data: transactions = [], isLoading, isError } = useTransactions();
  const { mutate: addTransaction, isLoading: isAdding } = useAddTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();
  const { mutate: deleteTransaction, isLoading: isDeleting } = useDeleteTransaction();

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransactionId, setDeletingTransactionId] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const { toast } = useToast();

  // Paginación
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handleAddTransaction = async (transaction: Omit<Transaction, "id">): Promise<boolean> => {
    try {
      await addTransaction(transaction);
      toast({
        title: "Transacción agregada",
        description: "La transacción se agregó correctamente",
      });
      return true;
    } catch (error) {
      console.error("Error al agregar la transacción", error);
      toast({
        title: "Error",
        description: "Hubo un problema al agregar la transacción",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDeleteTransaction = async () => {
    if (!deletingTransactionId) return;
    deleteTransaction(deletingTransactionId, {
      onSuccess: () => {
        setDeletingTransactionId(null);
        toast({
          title: "Éxito",
          description: "Transacción eliminada correctamente",
        });
      },
      onError: (error: Error) => {
        setDeletingTransactionId(null);
        toast({
          title: "Error",
          description: "No se pudo eliminar la transacción",
          variant: "destructive",
        });
        console.error("Error al eliminar la transacción:", error);
      },
    });
  };


  const handleUpdateTransaction = async (updatedTransaction: Transaction): Promise<boolean> => {
    try {
      await updateTransaction(updatedTransaction);
      setIsEditing(false);
      return true;
    } catch (error) {
      console.error("Error al actualizar la transacción", error);
      setIsEditing(false);
      return false;
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-32 text-red-500">
        Error al cargar las transacciones
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:max-w-md md:max-w-lg lg:w-full lg:max-w-none lg:px-20 bg-[#f5fbef]">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestor Transacciones</h1>

      <div className="mb-4 flex justify-end">
        <AddTransactionDialog onAddTransaction={handleAddTransaction} isAdding={isAdding}>
          <Button className="w-full md:w-auto " disabled={isAdding} style={{ backgroundColor: '#06A77D' }}>
            {isAdding ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlusIcon className="mr-2 h-4 w-4" />
            )}
            Nueva Transacción
          </Button>
        </AddTransactionDialog>
      </div>

      <div className="space-y-2">
        {currentTransactions.map((transaction: Transaction) => (
          <Card key={transaction.id} className="overflow-hidden">
            <CardContent className="p-3 flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
              <div className="flex-grow flex justify-between items-center">

                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm sm:text-base">{transaction.nameClient}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Giro/Comercio: {transaction.commerce}</p>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(transaction.transactionDate).toLocaleString()}
                  </p>
                </div>

                <div className="text-right flex items-center">
                  <span className="text-sm sm:text-sm font-bold">
                    {"$ " + new Intl.NumberFormat("es-ES", {
                      style: "decimal",
                    }).format(transaction.amount)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingTransaction(transaction)}
                  disabled={isAdding}
                >
                  {isAdding && editingTransaction?.id === transaction.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <PencilIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => transaction.id && setDeletingTransactionId(transaction.id)}
                  disabled={isDeleting}
                >
                  {isDeleting && deletingTransactionId === transaction.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  )}
                </Button>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onUpdateTransaction={handleUpdateTransaction}
          isEditing={isEditing}
        />
      )}

      <AlertDialog open={!!deletingTransactionId} onOpenChange={() => setDeletingTransactionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la transacción.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => await handleDeleteTransaction()}
              disabled={isDeleting}
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      {/* La Paginación */}
      <div className="flex justify-center items-center mt-4">
        <Button style={{ backgroundColor: '#0081a7' }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="h-4 w-4" />

        </Button>
        <span className="mx-2">Página {currentPage} de {totalPages}</span>
        <Button style={{ backgroundColor: '#0081a7' }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="h-4 w-4" />

        </Button>
      </div>
    </div>
  );
}
