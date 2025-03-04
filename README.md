# AgriCore ERP - Agriculture Equipment Supplier

AgriCore ERP is a robust and scalable Enterprise Resource Planning (ERP) system tailored for Agriculture Equipment Suppliers. This solution streamlines operations, improves inventory management, and enhances customer relationships, enabling businesses to operate efficiently and effectively.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Features - MVP Feature List
### 1. User and Role Management (RBAC)
✅ **Why?** Ensures security and structured access control.  
- Admin & Regular User roles (e.g., Inventory Manager, Sales Manager).
- Permissions for CRUD operations based on roles.
- User authentication (Sign-up, Login, Logout, Password Reset).

### 2. Inventory Management
✅ **Why?** Essential for tracking stock levels and managing products.  
- **Product Management:** Add, update, delete, categorize products (equipment, tools, etc.).
- **Stock Tracking:** View stock levels, with alerts for low stock.
- **Supplier Management:** Record supplier details and track purchases.
- **Basic Purchase Orders:** Create and manage purchase orders from suppliers.

### 3. Sales and Order Management  
✅ **Why?** Key for tracking sales and customer transactions.  
- **Order Processing:** Create & manage customer orders.
- **Invoice Generation:** Generate basic invoices for purchases.
- **Sales Tracking:** View sales history per product or client.

### 4. Client Management  
✅ **Why?** Keeps track of customer interactions and orders.  
- **Customer Profiles:** Store client details (name, contact, order history).
- **Basic Payment Tracking:** Record when a payment has been made.
- **Simple Support Tickets:** Log client complaints/issues (optional).

### 5. Finance & Basic Reporting  
✅ **Why?** Helps with financial oversight and decision-making.  
- **Basic Financial Reports:** View total revenue, expenses, and top-selling products.
- **Expense Tracking:** Log expenses like supplier payments.
- **Exportable Reports:** Download simple reports (CSV/PDF).

### 6. Notifications & Alerts (Basic Version)  
✅ **Why?** Keeps users updated on key events.  
- **Stock Alerts:** Notify admins when stock is low.
- **Order Status Updates:** Notify customers of order progress.
- **Basic Email Notifications:** For important events (e.g., invoice due).

### 7. Users Management:
- Employee Profiles (name, contact, position, department)

---

## Tech Stack

### Frontend
- [React.js](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

### Backend
- [Express.js](https://expressjs.com/) with [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/) with [Prisma](https://www.prisma.io/)
- [Node.js](https://nodejs.org/)

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/amarachigoodness74/agricore-erp.git
   ```

2. Navigate to the project directory:
   ```bash
   cd agricore-erp
   ```

3. Install dependencies in both the frontend and backend folders:
   ```bash
   npm install
   ```

4. Set up environment variables following the .env.example files for both frontend and backend

5. Start the application:
   ```bash
   npm run dev
   ```

6. Access the app at `http://localhost:1337`.

---

## Usage

- **Admin Login**: Use default admin credentials to log in.
- Navigate through modules like Dashboard, Inventory, and Users.
- Manage products, suppliers, purchase orders, and client details.

---

## Roadmap

- [x] Define database schema, set up backend APIs
- [ ] Implement authentication and dashboard
- [ ] Implement user and client management modules
- [ ] Build Inventory and Supplier Management Module
- [ ] Add Sales and Purchase Orders including invoicing features
- [ ] Advanced reporting and analytics
- [ ] Multi-language support

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For inquiries or support, please contact:
- **Name**: Amarachi Goodness
- **Email**: [amarachigoodness74@gmail.com](mailto:amarachigoodness74@gmail.com)
- **Portfolio**: [amarachigoodness74.vercel.app](https://amarachigoodness74.vercel.app)