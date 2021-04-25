import React, { useContext } from "react";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import EventIcon from "@material-ui/icons/Event";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import ForumIcon from "@material-ui/icons/Forum";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import DnsIcon from "@material-ui/icons/Dns";

export const DashboardData = [
  {
    name: "Admission",
    icon: <PersonAddOutlinedIcon fontSize="small" />,
    icons: <PersonAddIcon fontSize="small" />,
    link: "/admin/admission",
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
    name: "Subjects",
    icon: <LibraryBooksOutlinedIcon fontSize="small" />,
    icons: <LibraryBooksIcon fontSize="small" />,
    link: "/admin/subject",
  },
  {
    name: "Year",
    icon: <DnsOutlinedIcon fontSize="small" />,
    icons: <DnsIcon fontSize="small" />,
    link: "/admin/year",
  },
];
