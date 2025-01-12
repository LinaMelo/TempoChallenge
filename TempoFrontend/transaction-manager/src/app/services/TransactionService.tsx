import axios from "axios";
import { Transaction } from "../model/Transaction";

const API_URL = "http://localhost:8080/transaction";

export const getTransactions = async () => {
  const { data } = await axios.get(`${API_URL}`);
  console.log(data);
  return data;
};

export const saveTransaction = async (transaction: Transaction) => {
  const { data } = await axios.post(`${API_URL}`, transaction);
  return data;
};
