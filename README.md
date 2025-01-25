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

## Features
1. User and Role Management:
- Role-based Access Control (RBAC) to ensure data security
- Admin and regular user roles with specific permission (e.g., admin, inventory manager, sales staff)
- Permissions for CRUD operations

2. Employee Management:
- Employee Profiles (name, contact, position, department)
- Attendance and Time Tracking
- Payroll Integration
- Performance Management

3. Inventory Management (Already in Progress):
- Product Stock Levels: 
  - Add, update, categorize, and search for products (equipment, parts, and tools).
  - Track stock levels in real-time with alerts for low or overstocked items.
  - Batch updates for bulk product additions or modifications.
  - Integration with barcodes or QR codes for easy tracking.
- Suppliers and Vendor Management
  - Maintain detailed supplier profiles, including contact information, purchase history, and ratings.
  - Manage purchase orders and track delivery statuses.
  - Send automated emails or reminders for pending or recurring orders.
- Purchase Orders and Inventory Restocking
  - Create and manage purchase orders for suppliers.
  - Track the status of orders (pending, approved, shipped, received).
  - Automatically update inventory upon order receipt.
- Stock Movement History

4. Client Management:
- Record and manage client profiles (name, contact, company details, including purchase history and preferences)
- Communication History (emails, calls): Track interactions, communications, and outstanding payments
- Sales and Invoices: Generate invoices and payment receipts
- Client Support Tickets: Generate invoices and payment receipts

5. Sales and Order Management:
- Quote and Invoice Creation: Generate detailed sales reports by product, client, or region.
- Sales Tracking and Analytics: Process sales orders and maintain a record of transactions.
- Order Fulfillment Process: Manage returns and refunds seamlessly
- Payment Tracking (integrate Stripe/PayPal)

6. Finance and Accounting:
- Budget Management
- Expense Tracking
- Financial Reports
- Tax Calculations and Compliance

7. Reports and Analytics:
- Customizable Dashboards: Visual dashboards for decision-making (charts, graphs, and summary reports)
- Key Performance Indicators (KPIs)
- Exportable Reports (CSV, PDF)
- Generate custom reports for inventory trends, supplier efficiency, sales performance, and profitability

8. Notifications and Communication (Alerts):
- Email/SMS Notifications for Key Events 
- Internal Messaging System (in-app notifications - optional) for critical events (low stock, overdue payments, order updates)
- Automated reminders for Tasks/Deadlines and supplier payments or recurring orders

9. System Settings:
- Company Information: Configure company-specific details like language preferences, currency, taxes, and business hours
- Custom Branding (logo, colors)
- Set custom thresholds for alerts and notifications

---

## Tech Stack

### Frontend
- [React.js](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

### Backend
- [Express.js](https://expressjs.com/) with [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/) (or your preferred database)
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