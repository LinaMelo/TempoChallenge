import axios from "axios";
import { Transaction } from "../model/Transaction";

const API_URL = "http://localhost:8080/transaction";

export const transactionService = {

  async getTransactions (){
    const { data } = await axios.get(`${API_URL}`);
    console.log(data);
    return data;
  },
  async addTransaction(transaction: Transaction) {
    const { data } = await axios.post(`${API_URL}`, transaction);
    return data;
  },
  async updateTransaction(transaction: Transaction) {
    const { data } = await axios.put(`${API_URL}`, transaction);
    return data;
  } ,
  async deleteTransaction(id: string) {
    const { data } = await axios.delete(`${API_URL}`+`/${id}`);
    return data;
  }  
}