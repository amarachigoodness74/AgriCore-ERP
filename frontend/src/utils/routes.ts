import { faDashboard } from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    title: "Dashboard",
    slug: "dashboard",
    path: "/dashboard",
    icon: faDashboard,
  },
  {
    title: "Employees",
    slug: "employees",
    path: "/employees",
    icon: faDashboard,
    children: [
      {
        title: "Roles and Permissions",
        slug: "roles-permissions",
        path: "/employees/roles-permissions",
      },
      {
        title: "Attendance Records",
        slug: "attendance",
        path: "/employees/attendance",
      },
      {
        title: "Payroll",
        slug: "payroll",
        path: "/employees/payroll",
      },
    ],
  },
  {
    title: "Clients",
    slug: "clients",
    path: "/clients",
    icon: faDashboard,
    children: [
      {
        title: "Order Management",
        slug: "products",
        path: "/inventory/products",
      },
      {
        title: "Invoice Management",
        slug: "suppliers",
        path: "/inventory/suppliers",
      },
      {
        title: "Communication Tracking",
        slug: "purchase-orders",
        path: "/inventory/purchase-orders",
      },
      {
        title: "Analytics and Reporting",
        slug: "purchase-orders",
        path: "/inventory/purchase-orders",
      },
    ],
  },
  {
    title: "Inventory",
    slug: "inventory",
    path: "/inventory",
    icon: faDashboard,
    children: [
      {
        title: "Products",
        slug: "products",
        path: "/inventory/products",
      },
      {
        title: "Suppliers",
        slug: "suppliers",
        path: "/inventory/suppliers",
      },
      {
        title: "Purchase Orders",
        slug: "purchase-orders",
        path: "/inventory/purchase-orders",
      },
    ],
  },
];

export default menuItems;
