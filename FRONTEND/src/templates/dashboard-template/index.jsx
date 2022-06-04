import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory, useLocation } from "react-router-dom";
import DashboardRoutes from "routes/dashboard-routes";
import { sidebar_navigation as navigation } from "routes/sidebar-navigation";
import { useStyles as useStylesLight } from "./styles-light.js";
import { useStyles as useStylesDark } from "./styles.js";
import Logo from "assets/logo.png";
import { color } from "theme";
import "moment/locale/id";
import Moment from "react-moment";
import DialogChangePassword from "components/dialog-change-password";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { isPemilik } from "utils";

export default function DashboardTemplate() {
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(window.innerWidth > 400);
  const user = JSON.parse(localStorage.getItem("user"));
  const classesLight = useStylesLight();
  const classesDark = useStylesDark();
  const classes = user?.role === "PENGHUNI" ? classesLight : classesDark;
  const [ChangePasswordDialog, setChangePasswordDialog] = React.useState(false);

  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isLogin = localStorage.getItem("isLogin") === "true";
  if (!isLogin) {
    history.push("/login");
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            {open ? (
              <Typography variant="subtitle1" noWrap>
                <Moment
                  locale="id"
                  interval={60000}
                  format="DD MMMM YYYY, HH:mm a"
                />
              </Typography>
            ) : (
              <Typography variant="h6" noWrap>
                Sistem Informasi Kost
              </Typography>
            )}
          </div>

          {window.innerWidth > 400 && (
            <>
              <div style={{ marginRight: 15, textAlign: "right" }}>
                <Typography
                  variant="h6"
                  noWrap
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    lineHeight: "1.1em",
                  }}
                >
                  {user?.name}
                </Typography>
                <Typography variant="caption" noWrap className={classes.chip}>
                  {user?.role}
                </Typography>
              </div>
              <Avatar
                src={user?.photo_url}
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />

              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    history.push(isPemilik() ? "/profile" : "/");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    handleClose();
                    setChangePasswordDialog(true);
                  }}
                >
                  Ganti Passowrd
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img src={Logo} style={{ width: 50, marginLeft: 10 }} />
          <Typography
            variant="h6"
            noWrap
            color="primary"
            style={{
              paddingLeft: 10,
              fontWeight: "bold",
            }}
          >
            INSIKOST
          </Typography>
          <IconButton
            style={{
              color:
                user?.role === "PEMILIK"
                  ? "rgba(255,255,255,0.75)"
                  : "rgba(0,0,0,0.75)",
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <List>
          {navigation
            .filter((nav) => nav?.role?.includes(user?.role))
            .map((nav, key) => {
              const Icon = nav.icon;
              const isActive =
                nav.path === "/"
                  ? location.pathname === nav.path
                  : location.pathname.includes(nav.path);
              const textColor =
                user?.role === "PEMILIK"
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(0,0,0,0.5)";
              const backgroundColor = "rgba(27, 170, 86, 0.1)";

              return (
                <ListItem
                  key={key}
                  button
                  onClick={() => {
                    if (typeof nav.beforeRedirect === "function") {
                      nav.beforeRedirect();
                    }
                    history.push(nav.path);
                  }}
                  style={{
                    background: isActive ? backgroundColor : null,
                  }}
                >
                  <ListItemIcon
                    style={{
                      color: isActive ? color.primary : textColor,
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={nav.label}
                    style={{
                      color: isActive ? color.primary : textColor,
                    }}
                  />
                </ListItem>
              );
            })}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <DashboardRoutes />
      </main>
      <DialogChangePassword
        ChangePasswordDialog={ChangePasswordDialog}
        setChangePasswordDialog={setChangePasswordDialog}
      />
    </div>
  );
}
