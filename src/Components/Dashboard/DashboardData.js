import React, { useContext } from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import EventIcon from "@material-ui/icons/Event";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import ForumIcon from "@material-ui/icons/Forum";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

export const DashboardData = [
  {
    name: "Dashboard",
    icon: <DashboardOutlinedIcon fontSize="small" />,
    icons: <DashboardIcon fontSize="small" />,
    link: "/admin/dashboard",
  },
  {
    name: "Admission",
    icon: <PersonAddOutlinedIcon fontSize="small" />,
    icons: <PersonAddIcon fontSize="small" />,
    link: "/admin/admission",
  },

  {
    name: "Events",
    icon: <EventOutlinedIcon fontSize="small" />,
    icons: <EventIcon fontSize="small" />,
    link: "/admin/announcement",
  },
  {
    name: "Classes",
    icon: <LocalLibraryOutlinedIcon fontSize="small" />,
    icons: <LocalLibraryIcon fontSize="small" />,
    link: "/admin/class",
  },

  {
    name: "Messages",
    icon: <ForumOutlinedIcon fontSize="small" />,
    icons: <ForumIcon fontSize="small" />,
    link: "/admin/message",
  },
  {
    name: "Students",
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    icons: <PersonIcon fontSize="small" />,
    link: "/admin/students",
    links: "/admin/edit-user/....-.....",
  },
  {
    name: "Teachers",
    icon: <SupervisorAccountOutlinedIcon fontSize="small" />,
    icons: <SupervisorAccountIcon fontSize="small" />,
    link: "/admin/teachers",
    links: "/admin/edit-user/,,,,-,,,,",
  },
];
