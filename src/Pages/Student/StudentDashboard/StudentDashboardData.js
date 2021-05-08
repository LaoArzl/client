import React from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeIcon from "@material-ui/icons/Home";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";

export const StudentDashboardData = [
  {
    name: "Home",
    icon: <HomeOutlinedIcon fontSize="small" />,
    icons: <HomeIcon fontSize="small" />,
    link: "/user/student/",
  },
  {
    name: "Grades",
    icon: <RateReviewOutlinedIcon fontSize="small" />,
    link: "/user/student/grades/",
  },
  
];
