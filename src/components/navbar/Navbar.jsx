import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SidebarContext from "../../context/sidebarContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import "./navbar.css";

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navRoot">
      <AppBar position="static" className="app-bar">
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
          <img src="./logoNav.png" className="logo-nav"></img>
          <Typography variant="h6" className={classes.title}></Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <Avatar
                aria-controls="simple-menu"
                aria-haspopup="true"
                className="avatar"
              >
                <label className="labelAvatar">
                  {"user" && "user.Nome"
                    ? "Wilson".substring(0, 1).toUpperCase()
                    : "A"}
                </label>
              </Avatar>
            </IconButton>

            <Menu
              id="simple-menu"
              className="nav-menu-avartar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Minha conta</MenuItem>
              <MenuItem onClick={handleClose}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
