import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SidebarContext from "../../context/sidebarContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import "./navbar.css";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [sidebar, setSidebar] = useContext(SidebarContext);
  const [auth, setAuth] = React.useState(true);
  const [openAvatar, setOpenAvatar] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //   const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navRoot">
      <AppBar
        position="static"
        style={{ backgroundColor: "#202024", height: 70 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebar({ open: !sidebar.open })}
          >
            <MenuIcon className="menuIcon" />
          </IconButton>
          <img
            src="./logoNav.png"
            style={{ width: "50%", maxWidth: 300 }}
          ></img>
          <Typography variant="h6" className={classes.title}></Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setOpenAvatar(!openAvatar)}
                color="inherit"
              >
                <Avatar
                  className="avatar"
                  style={{
                    backgroundColor: "#5b4699",
                    width: 45,
                    height: 45,
                    border: "solid 2px white"
                  }}
                >
                  <label className="labelAvatar">
                    {"user" && "user.Nome"
                      ? "Wilson".substring(0, 1).toUpperCase()
                      : "A"}
                  </label>
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={openAvatar}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Minha conta</MenuItem>
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
