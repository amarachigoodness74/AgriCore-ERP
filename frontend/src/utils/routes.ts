import {
  faBoxesPacking,
  faHome,
  faUser,
  faUsers,
  // faUsersRectangle,
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
    slug: "profile",
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
    icon: faUsers,
    children: [
      {
        title: "Employees",
        slug: "employees",
        path: "/employees",
      },
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
  // {
  //   title: "Clients",
  //   icon: faUsersRectangle,
  //   children: [
  //     {
  //       title: "Clients",
  //       slug: "clients",
  //       path: "/clients",
  //     },
  //     {
  //       title: "Invoices & Payments",
  //       slug: "invoices",
  //       path: "/clients/invoices",
  //     },
  //     {
  //       title: "Client Support",
  //       slug: "support",
  //       path: "/clients/support",
  //     },
  //     {
  //       title: "Feedback & Reviews",
  //       slug: "feedback",
  //       path: "/clients/feedback",
  //     },
  //   ],
  // },
  {
    title: "Inventory",
    icon: faBoxesPacking,
    children: [
      {
        title: "Inventory",
        slug: "inventory",
        path: "/inventory",
      },
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
