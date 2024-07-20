import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-to-do-list.thibault-peronno.fr/api",
  withCredentials: true,
});

class TransactionService {
  //create a new coin with transaction
  async createCoinAndTransaction(step, data) {
    try {
      const axiosResponse = await axiosInstance.post(
        `${import.meta.env.VITE_API_SERVER}/api/coin/createTransaction`,
        {
          name: step,
          quantity: data.quantity,
          price: data.price,
          spent: data.spent,
          date: data.date,
        }
      );
      return axiosResponse;
    } catch (error) {
      return error;
    }
  }
  //add a transaction to a coin
  async createTransactionName(name, id, data) {
    try {
      const axiosResponse = await axiosInstance.post(
        `${import.meta.env.VITE_API_SERVER}/api/transaction/name/${name}`,
        {
          quantity: data.quantity,
          price: data.price,
          spent: data.spent,
          date: data.date,
          coinId: id,
        }
      );
      return axiosResponse;
    } catch (error) {
      return error;
    }
  }
  //update a transaction
  async updateTransaction(id, data) {
    try {
      const axiosResponse = await axiosInstance.put(
        `${import.meta.env.VITE_API_SERVER}/api/transaction/id/${id}`,
        {
          quantity: data.quantity,
          price: data.price,
          spent: data.spent,
          date: data.date,
        }
      );
      return axiosResponse;
    } catch (error) {
      return error;
    }
  }
}

export default TransactionService;
