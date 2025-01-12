import { useQuery } from "react-query";
import { getTransactions } from "../services/TransactionService";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Transaction } from "../model/Transaction";


export default function TransactionList() {
  const { data, isLoading, error } = useQuery("transactions", getTransactions);
  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>Error al cargar transacciones</Typography>;

  return (
    <List>
      {data.map((transaction: Transaction) => (
        <ListItem key={transaction.id}>
          <ListItemText
            primary={`Cliente: ${transaction.nameClient}`}
            secondary={`Monto: $${transaction.amount}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
