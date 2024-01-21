import { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NavbarComponent from "../components/helper/NavbarComponent";
import SidebarComponent from "../components/helper/SidebarComponent";
import { getMeAction } from "../actions/userAction";
import { useDispatch } from "react-redux";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();

  const getMe = async () => {
    try {
      await dispatch(getMeAction());
    } catch (error) {
      console.log(error, "from get me home layouat");
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarComponent />
      <SidebarComponent />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default HomeLayout;
