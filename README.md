# Multi-Step Form Project

## Overview

This project aims to deepen understanding and practice using Zod and React Hook Form. It serves as a training exercise to effectively implement form validation and management in React applications. The project features a multi-step form to guide users through a sequential input process, enhancing user experience and form organization.

## Objectives

- **Learn Integration of Zod:** Integrate Zod for schema-based form validation, ensuring data integrity and consistent validation rules across the application.
- **Utilize React Hook Form:** Understand and utilize React Hook Form for efficient form handling in React, enabling cleaner and more maintainable form logic.
- **Create Robust Forms:** Practice creating robust, user-friendly forms with validation, focusing on enhancing user experience through clear error messages and smooth navigation between form steps.

## Features

- **Multi-Step Form:** Implement a multi-step form to collect data in a sequential manner, making the form-filling process more intuitive for users.
- **Zod Validation:** Use Zod to define and enforce validation schemas for each step of the form, ensuring data collected at each step meets the required criteria.
- **React Hook Form Integration:** Leverage React Hook Form to manage form state and handle form submissions efficiently, reducing boilerplate code and enhancing form performance.

## Steps in the Form

1. **Step 1:** Select a Coin

   - Users are prompted to select a coin from a predefined list.
   - Validation ensures a coin is selected before proceeding to the next step.

2. **Step 2:** Enter Transaction Details
   - Users input quantity, price per coin, total spent, and transaction date.
   - Validation checks for numerical input and ensures the date is not in the future.

## How to Run the Project

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/form-template.git
   ```

2. **Install Dependencies:**

   ```bash
   Copier le code
   cd form-template
   npm install
   ```

3. **Run the Development Server:**

   ````bash
   Copier le code
   npm start```
   ````

Open in Browser:
Open your browser and navigate to http://localhost:3000 to view the multi-step form in action.

Conclusion
This project is a comprehensive exercise to practice and improve skills in form validation and management in React. By implementing a multi-step form with Zod and React Hook Form, the project demonstrates the creation of structured, user-friendly, and well-validated forms.
