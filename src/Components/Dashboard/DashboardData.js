import React from "react";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import CallToActionRoundedIcon from "@material-ui/icons/CallToActionRounded";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};

export const DashboardData = [
  {
    name: "Dashboard",
    icon: <DashboardRoundedIcon fontSize="small" />,
    link: "/admin/dashboard",
  },

  {
    name: "Announcement",
    icon: <CallToActionRoundedIcon fontSize="small" />,
    link: "/admin/announcement",
  },
  {
    name: "Class",
    icon: <ClassRoundedIcon fontSize="small" />,
    link: "/admin/class",
  },
  {
    name: "Message",
    icon: <SendRoundedIcon fontSize="small" />,
    link: "/admin/message",
  },
  {
    name: "School Year",
    icon: <SchoolRoundedIcon fontSize="small" />,
    link: "/admin/school-year",
  },
  {
    name: "Students",
    icon: <SchoolRoundedIcon fontSize="small" />,
    link: "/admin/students",
  },
  {
    name: "Subjects",
    icon: <SchoolRoundedIcon fontSize="small" />,
    link: "/admin/subjects",
  },
  {
    name: "Teachers",
    icon: <SchoolRoundedIcon fontSize="small" />,
    link: "/admin/teachers",
  },
];
