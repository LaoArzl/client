import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PersonIcon from "@material-ui/icons/Person";

export const UsersData = [
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
