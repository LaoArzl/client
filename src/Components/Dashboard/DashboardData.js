
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import DnsIcon from "@material-ui/icons/Dns";


export const DashboardData = [
  {
    name: "Create User",
    icon: <PersonAddOutlinedIcon fontSize="small" />,
    icons: <PersonAddIcon fontSize="small" />,
    link: "/admin/admission",
  },

  {
    name: "Class",
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

];
