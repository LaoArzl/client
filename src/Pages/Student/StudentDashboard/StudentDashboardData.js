import React from "react";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";

export const StudentDashboardData = [
  {
    name: "Profile",
    icon: <AccountBoxOutlinedIcon fontSize="small" />,
    link: "/user/student",
  },
  {
    name: "Class",
    icon: <LocalLibraryOutlinedIcon fontSize="small" />,
    link: "/user/student/class",
  },
  {
    name: "Grades",
    icon: <RateReviewOutlinedIcon fontSize="small" />,
    link: "/user/student/grades",
  },
  {
    name: "Message",
    icon: <SendOutlinedIcon fontSize="small" />,
    link: "/user/student/message",
  },
];
