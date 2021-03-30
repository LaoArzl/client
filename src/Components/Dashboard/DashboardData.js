import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";

export const DashboardData = [
  {
    name: "Dashboard",
    icon: <DashboardOutlinedIcon fontSize="small" />,
    link: "/admin/dashboard",
  },

  {
    name: "Events",
    icon: <EventOutlinedIcon fontSize="small" />,
    link: "/admin/announcement",
  },
  {
    name: "Classes",
    icon: <AccountTreeOutlinedIcon fontSize="small" />,
    link: "/admin/class",
  },
  {
    name: "Fees",
    icon: <PaymentOutlinedIcon fontSize="small" />,
    link: "/admin/fees",
  },
  {
    name: "Grades",
    icon: <RateReviewOutlinedIcon fontSize="small" />,
    link: "/admin/grades",
  },

  {
    name: "Messages",
    icon: <SendOutlinedIcon fontSize="small" />,
    link: "/admin/message",
  },
  {
    name: "Students",
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    link: "/admin/students",
  },
  {
    name: "Teachers",
    icon: <SupervisorAccountOutlinedIcon fontSize="small" />,
    link: "/admin/teachers",
  },
];
