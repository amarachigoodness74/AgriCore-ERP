const routes = [
  {
    name: "Dashboard",
    slug: "dashboard",
    path: "/dashboard",
  },
  {
    name: "Employee Management",
    slug: "employees",
    path: "/employees",
    children: [
      {
        name: "Roles and Permissions",
        slug: "roles-permissions",
        path: "/employees/roles-permissions",
      },
      {
        name: "Attendance Records",
        slug: "attendance",
        path: "/employees/attendance",
      },
      {
        name: "Payroll",
        slug: "payroll",
        path: "/employees/payroll",
      },
    ],
  },
  {
    name: "Client Management",
    slug: "clients",
    path: "/clients",
    children: [
      {
        name: "Order Management",
        slug: "products",
        path: "/inventory/products",
      },
      {
        name: "Invoice Management",
        slug: "suppliers",
        path: "/inventory/suppliers",
      },
      {
        name: "Communication Tracking",
        slug: "purchase-orders",
        path: "/inventory/purchase-orders",
      },
      {
        name: "Analytics and Reporting",
        slug: "purchase-orders",
        path: "/inventory/purchase-orders",
      },
    ],
  },
  {
    name: "Inventory",
    slug: "inventory",
    path: "/inventory",
    children: [
      {
        name: "Products",
        slug: "products",
        path: "/inventory/products",
      },
      {
        name: "Suppliers",
        slug: "suppliers",
        path: "/inventory/suppliers",
      },
      {
        name: "Purchase Orders",
        slug: "purchase-orders",
        path: "/inventory/purchase-orders",
      },
    ],
  },
];

export default routes;
