# myCryptoFolio - Frontend

myCryptoFolio is a web application built with React that allows users to track their cryptocurrency investments in real-time.

## Features
- **Real-Time Data:** Fetches data for over 14,000 cryptocurrencies from the CoinGecko API.
- **Portfolio Management:** Add, edit, and delete transactions for each cryptocurrency.
- **Dynamic Calculations:** Automatically calculates the total cost, current value, profits, and losses for each coin and the entire portfolio.
- **User Authentication:** Secure user registration and login with JWT tokens.
- **Responsive Design:** Styled using Tailwind CSS and Shadcn for component design.

## Technologies Used
- **React**
- **Tailwind CSS**
- **Shadcn**
- **Axios**
- **Zustand**
- **React Hook Form**
- **Zod**

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/boris-picard/mycryptofolio.git
    cd mycryptofolio
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with the following content:
    ```plaintext
    VITE_API_SERVER=http://localhost:3001/api
    ```

4. Run the development server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:5173`.

## Scripts

- `npm start`: Starts the development server.
- `npm build`: Builds the app for production.
- `npm test`: Runs the test suite using Jest.

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
