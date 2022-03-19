import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#552a9a",
    color: "black",
    boxShadow: "0px 0px 0px 0px"
  },
    navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    wrap:"nowrap",
    maxWidth: "100%",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
    },
  },
}));

function MainNavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static"  className={classes.header}>
      <CssBaseline />
      <Toolbar >
        <Typography variant="h4" className={classes.logo}>
          Infura
        </Typography>
          <div className={classes.navlinks}>


    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button  href = "/signin" {...bindTrigger(popupState)} style={{
        color: "white",
        backgroundColor: "#552a9a",
        marginLeft: "10px",
        fontSize: "15px"
    }}>
        User
          </Button>
        </React.Fragment>
      )}
    </PopupState>

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button href = "/carecenter/signin" {...bindTrigger(popupState)} style={{
        color: "white",
        backgroundColor: "#552a9a",
        marginLeft: "10px",
        fontSize: "15px"
    }}>
            CareCenter
          </Button>
        </React.Fragment>
      )}
    </PopupState>
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button  {...bindTrigger(popupState)} style={{
        color: "white",
        backgroundColor: "#552a9a",
        marginLeft: "10px",
        fontSize: "15px"
    }}>
            Stores
          </Button>
        </React.Fragment>
      )}
    </PopupState>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default MainNavBar;