import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};

export const DashboardData = [
  {
    name: "Dashboard",
    icon: <DashboardOutlinedIcon fontSize="small" />,
    link: "/admin/dashboard",
  },

  {
    name: "Announcement",
    icon: <EventOutlinedIcon fontSize="small" />,
    link: "/admin/announcement",
  },
  {
    name: "Class",
    icon: <AccountTreeOutlinedIcon fontSize="small" />,
    link: "/admin/class",
  },
  {
    name: "Message",
    icon: <SendOutlinedIcon fontSize="small" />,
    link: "/admin/message",
  },
  {
    name: "School Year",
    icon: <SchoolOutlinedIcon fontSize="small" />,
    link: "/admin/school-year",
  },
  {
    name: "Students",
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    link: "/admin/students",
  },
  {
    name: "Subjects",
    icon: <ImportContactsOutlinedIcon fontSize="small" />,
    link: "/admin/subjects",
  },
  {
    name: "Teachers",
    icon: <SupervisorAccountOutlinedIcon fontSize="small" />,
    link: "/admin/teachers",
  },
];
