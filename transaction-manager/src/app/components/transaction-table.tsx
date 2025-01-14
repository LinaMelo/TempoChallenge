import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material"
import { Transaction } from "../model/Transaction"

// Estilos personalizados para las celdas de la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#b2d3a8',
  color: theme.palette.common.black,
  fontWeight: "bold",
}))

interface TransactionTableProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  // Estado para el manejo de la paginación
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Manejo del cambio de página
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  // Manejo del cambio de filas por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Datos a mostrar en la página actual
  const paginatedTransactions = transactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Monto</StyledTableCell>
            <StyledTableCell>Comercio</StyledTableCell>
            <StyledTableCell>Fecha de Transacción</StyledTableCell>
            <StyledTableCell>Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.nameClient}</TableCell>
              <TableCell>{transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.commerce}</TableCell>
              <TableCell>
                {transaction.transactionDate
                  ? new Date(transaction.transactionDate).toLocaleString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => onEdit(transaction)}
                  style={{ marginRight: "8px" }}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onDelete(transaction.id!)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Componente de paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
    </TableContainer>
  )
}
