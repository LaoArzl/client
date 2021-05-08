import React, { useContext } from "react";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import EventIcon from "@material-ui/icons/Event";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import DnsIcon from "@material-ui/icons/Dns";
import DateRangeIcon from '@material-ui/icons/DateRange';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';

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
    name: "Grade",
    icon: <DnsOutlinedIcon fontSize="small" />,
    icons: <DnsIcon fontSize="small" />,
    link: "/admin/year",
  },

  {
    name: "School Year",
    icon: <DateRangeOutlinedIcon fontSize="small" />,
    icons: <DateRangeIcon fontSize="small" />,
    link: "/admin/school-year",
  },
];
