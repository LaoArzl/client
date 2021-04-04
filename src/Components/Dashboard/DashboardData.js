import React, { useContext } from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";

export const DashboardData = [
  {
    name: "Dashboard",
    icon: <DashboardOutlinedIcon fontSize="small" />,
    link: "/admin/dashboard",
  },
  {
    name: "Admission",
    icon: <PersonAddOutlinedIcon fontSize="small" />,
    link: "/admin/admission",
  },

  {
    name: "Events",
    icon: <EventOutlinedIcon fontSize="small" />,
    link: "/admin/announcement",
  },
  {
    name: "Classes",
    icon: <RateReviewOutlinedIcon fontSize="small" />,
    link: "/admin/class",
  },
  {
    name: "Fees",
    icon: <PaymentOutlinedIcon fontSize="small" />,
    link: "/admin/fees",
  },

  {
    name: "Messages",
    icon: <ForumOutlinedIcon fontSize="small" />,
    link: "/admin/message",
  },
  {
    name: "Students",
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    link: "/admin/students",
    links: "/admin/edit-user/....-.....",
  },
  {
    name: "Teachers",
    icon: <SupervisorAccountOutlinedIcon fontSize="small" />,
    link: "/admin/teachers",
    links: "/admin/edit-user/,,,,-,,,,",
  },
];
