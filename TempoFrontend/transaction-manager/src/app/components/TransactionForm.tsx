import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button } from "@mui/material";
import { saveTransaction } from "../services/TransactionService";
import { Transaction } from "../model/Transaction";

const schema = yup.object().shape({
  nameClient: yup.string().required("El nombre del cliente es obligatorio"),
  amount: yup
    .number()
    .required("El monto es obligatorio")
    .min(0, "El monto no puede ser negativo"),
  commerce: yup.string().required("El comercio es obligatorio"),
});

export default function TransactionForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Transaction) => {
    try {
      await saveTransaction(data);
      alert("Transacción guardada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al guardar la transacción");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="nameClient"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre del Cliente"
            fullWidth
            margin="normal"
            error={!!errors.nameClient}
            helperText={errors.nameClient?.message}
          />
        )}
      />
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Monto"
            fullWidth
            margin="normal"
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        )}
      />
      <Controller
        name="commerce"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Comercio"
            fullWidth
            margin="normal"
          />
        )}
        />
      <Button type="submit" variant="contained" color="primary">
        Guardar
      </Button>
    </form>
  );
}
