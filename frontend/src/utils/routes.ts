import {
  faBoxesPacking,
  faHome,
  faUser,
  faUsers,
  faUsersRectangle,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    title: "Dashboard",
    slug: "dashboard",
    path: "/dashboard",
    icon: faHome,
  },
  {
    title: "Profile",
    slug: "roles-permissions",
    path: "/profile",
    icon: faUser,
  },
  {
    title: "Roles and Permissions",
    slug: "roles-permissions",
    path: "/user-role",
    icon: faUserTie,
  },
  {
    title: "Employees",
    slug: "employees",
    path: "/employees",
    icon: faUsers,
    children: [
      {
        title: "Attendance Records",
        slug: "attendance",
        path: "/employees/attendance",
      },
      {
        title: "Performance",
        slug: "performance",
        path: "/employees/performance",
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
    icon: faUsersRectangle,
    children: [
      {
        title: "Invoices & Payments",
        slug: "invoices",
        path: "/clients/invoices",
      },
      {
        title: "Client Support",
        slug: "support",
        path: "/clients/support",
      },
      {
        title: "Feedback & Reviews",
        slug: "feedback",
        path: "/clients/feedback",
      },
    ],
  },
  {
    title: "Inventory",
    slug: "inventory",
    path: "/inventory",
    icon: faBoxesPacking,
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
