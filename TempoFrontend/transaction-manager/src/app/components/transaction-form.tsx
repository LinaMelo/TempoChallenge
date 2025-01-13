import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';
import { Transaction } from "../model/Transaction";


const schema = yup.object({
  nameClient: yup.string().required("El nombre del cliente es requerido"),
  amount: yup
    .number()
    .typeError("El monto debe ser un número")
    .positive("El monto debe ser positivo")
    .required("El monto es requerido"),
  commerce: yup.string().required("El comercio es requerido"),
  transactionDate: yup
    .date()
    .typeError("Debe ser una fecha válida")
    .required("La Fecha es requerida")
    .max(new Date(), "La fecha y hora no pueden ser futuras"),
}).required();

type TransactionFormData = yup.InferType<typeof schema>;

interface TransactionFormProps {
  transaction?: Transaction;
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function TransactionForm({ transaction, onSubmit, onCancel, isSubmitting }: TransactionFormProps) {
  const form = useForm<TransactionFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nameClient: transaction?.nameClient || "",
      amount: transaction?.amount || 0,
      commerce: transaction?.commerce || "",
      transactionDate: transaction?.transactionDate ? new Date(transaction.transactionDate) : undefined,
    },
  });

  const handleSubmit = (data: TransactionFormData) => {
    // Convertir la fecha de transacción a UTC
    const transactionDateLocal = data.transactionDate
    ? new Date(data.transactionDate).toLocaleString("sv-SE").replace(" ", "T")
    : undefined;
  
    const normalizedData = {
      ...data,
      transactionDate: transactionDateLocal,
    };
  
    console.log("Datos enviados al backend:", normalizedData);
    onSubmit(normalizedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nameClient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Cliente</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commerce"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comercio</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transactionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Transacción</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  value={field.value ? new Date(field.value).toLocaleString("sv-SE").slice(0, 16) : ""}
                  onChange={(e) => {
                    const newDate = e.target.value ? new Date(e.target.value) : undefined;
                    field.onChange(newDate);
                  }}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}
