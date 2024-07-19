import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-to-do-list.thibault-peronno.fr/api",
  withCredentials: true,
});

class TransactionService {
  async createCoin(step, data) {
    const axiosResponse = await axiosInstance
      .post(`${import.meta.env.VITE_API_SERVER}/api/coin/createTransaction`, {
        name: step,
        quantity: data.quantity,
        price: data.price,
        spent: data.spent,
        date: data.date,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
    return axiosResponse;
  }
}

export default TransactionService;
