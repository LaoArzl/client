import React from "react";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import ForumIcon from "@material-ui/icons/Forum";
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
    name: "Message",
    icon: <ForumOutlinedIcon fontSize="small" />,
    icons: <ForumIcon fontSize="small" />,
    link: "/user/teacher/message/",
  },
];
