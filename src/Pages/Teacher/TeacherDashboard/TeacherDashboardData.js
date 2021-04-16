import React from "react";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import ForumIcon from "@material-ui/icons/Forum";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeIcon from "@material-ui/icons/Home";

export const TeacherDashboardData = [
  {
    name: "Home",
    icon: <HomeOutlinedIcon fontSize="small" />,
    icons: <HomeIcon fontSize="small" />,
    link: "/user/teacher/",
  },
  {
    name: "Class",
    icon: <LocalLibraryOutlinedIcon fontSize="small" />,
    icons: <LocalLibraryIcon fontSize="small" />,
    link: "/user/teacher/class/",
  },

  {
    name: "Grades",
    icon: <RateReviewOutlinedIcon fontSize="small" />,
    link: "/user/teacher/grades/",
  },
  {
    name: "Message",
    icon: <ForumOutlinedIcon fontSize="small" />,
    icons: <ForumIcon fontSize="small" />,
    link: "/user/teacher/message/",
  },
];
