import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { logoutAction } from "../../actions/userAction";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const [bars, setBars] = useState([
    { id: 1, name: "Home", target: "", icon: "", value: "HOME" },
    { id: 2, name: "Todo", target: "todo", icon: "", value: "TODO" },
    { id: 3, name: "Logout", target: "logout", icon: "", value: "LOGOUT" },
  ]);
  const navigate = useNavigate();

  const handleBar = async (bar) => {
    switch (bar) {
      case "HOME":
        console.log("from home");
        navigate("/");
        break;
      case "TODO":
        console.log("from profile");
        navigate("/todo");
        break;
      case "LOGOUT":
        console.log("from logout");
        await logout();
      default:
        console.log("default");
    }
  };

  const logout = async () => {
    try {
      const res = await dispatch(logoutAction());

      if (!res || res.status !== 200) throw "Something went wrong";

      // redirect to login
      navigate("/login");
    } catch (error) {
      console.log(error, "from logout");
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {bars.map((bar, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleBar(bar.value)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={bar.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarComponent;
