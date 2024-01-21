import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const NavbarComponent = () => {
  const meState = useSelector((state) => state.userReducer.me);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            1% Club
          </Typography>
          <Typography variant="h6" noWrap component="div">
            {meState?.email || "xxxx@gmail.com"}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavbarComponent;
