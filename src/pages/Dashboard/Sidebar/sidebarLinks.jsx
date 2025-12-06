// prettier-ignore
import { User, PlusCircle, LayoutDashboard, Users, BarChart, ClipboardList, Star, FileCheck } from "lucide-react";

export const adminSidebarLinks = [
  {
    name: "My Profile",
    icon: <User size={20} />,
    route: "/dashboard/my-profile",
  },
  {
    name: "Add Scholarship",
    icon: <PlusCircle size={20} />,
    route: "/dashboard/add-scholarship",
  },
  {
    name: "Manage Scholarships",
    icon: <LayoutDashboard size={20} />,
    route: "/dashboard/manage-scholarships",
  },
  {
    name: "Manage Users",
    icon: <Users size={20} />,
    route: "/dashboard/manage-users",
  },
  {
    name: "Analytics",
    icon: <BarChart size={20} />,
    route: "/dashboard/analytics",
  },
];

export const moderatorSidebarLinks = [
  {
    name: "My Profile",
    icon: <User size={20} />,
    route: "/dashboard/my-profile",
  },
  {
    name: "Manage Applications",
    icon: <ClipboardList size={20} />,
    route: "/dashboard/manage-applications",
  },
  {
    name: "All Reviews",
    icon: <Star size={20} />,
    route: "/dashboard/all-reviews",
  },
];

export const studentSidebarLinks = [
  {
    name: "My Profile",
    icon: <User size={20} />,
    route: "/dashboard/my-profile",
  },
  {
    name: "My Applications",
    icon: <FileCheck size={20} />,
    route: "/dashboard/my-applications",
  },
  {
    name: "My Reviews",
    icon: <Star size={20} />,
    route: "/dashboard/my-reviews",
  },
];
