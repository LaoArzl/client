import React from "react";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";

export const TeacherDashboardData = [
  {
    name: "Profile",
    icon: <AccountBoxOutlinedIcon fontSize="small" />,
    link: "/user/teacher/",
  },
  {
    name: "Class",
    icon: <LocalLibraryOutlinedIcon fontSize="small" />,
    link: "/user/teacher/class/",
  },

  {
    name: "Grades",
    icon: <RateReviewOutlinedIcon fontSize="small" />,
    link: "/user/teacher/grades/",
  },
  {
    name: "Message",
    icon: <SendOutlinedIcon fontSize="small" />,
    link: "/user/teacher/message/",
  },
];
