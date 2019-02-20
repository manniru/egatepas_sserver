/* eslint-disable no-unused-expressions */
import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { countTransactionSum } from "./utils";

import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import ClearAll from "@material-ui/icons/ClearAll";

import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";

import MannirCam from "./MannirCam";
import Galleries from "./Galleries";
import fb from "../fb";
import data from './data'
import Dashboard from "./Dashboard";
import Images from "./Images";
import faker from 'faker';

let updateLocalStorage = _this => {
  let data = JSON.stringify(_this.state.data);
  localStorage.setItem("data", data);

  fb.database().ref("access").set(_this.state.data).then(() => { console.log("Record Saved! in Firebase"); });

};

const randHex = (len) => {
  var n, r, min, max;
  var maxlen = 8,
      min = Math.pow(16,Math.min(len,maxlen)-1) 
      max = Math.pow(16,Math.min(len,maxlen)) - 1,
      n   = Math.floor( Math.random() * (max-min+1) ) + min,
      r   = n.toString(16);
  while ( r.length < len ) {
     r = r + randHex( len - maxlen );
  }
  return r;
};

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class Drawer1 extends React.Component {
  state = {
    open: false,
    images: "",
    anchorEl: null,
    mobileMoreAnchorEl: null,
    data: []
  };

  componentDidMount = () => {
    fb.database()
      .ref("images")
      .on("value", snap => {
        if (snap.val()) {
          this.setState({ images: Object.values(snap.val()) });
        }
      });

    let localTransactions = JSON.parse(localStorage.getItem("data"));
    if (localTransactions) {
      this.setState({
        data: localTransactions
      });
    }

    // fb.database().ref('/demos/products').on('value', snap => { if (snap.val()) { this.setState({ products: Object.values(snap.val()) }); } });

  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleClickTest = (e, id) => {
    switch (id) {
      case "add":
        const tm = +new Date()
        // const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        // var deviceId = (function lol(m,s,c){return s[m.floor(m.random() * s.length)] + (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4)
        // var tagId = (function(m,s,c){return (c ? arguments.callee(m,s,c-1) : '#') + s[m.floor(m.random() * s.length)]})(Math,'0123456789ABCDEF',5)
        // var userId = Math.floor(Math.random()*16777215).toString(16);
        var access = {
          userId: randHex(28), // faker.random.objectElement(data.users).userId,
          deviceId: randHex(16),
          tagId: randHex(8),
          location: faker.random.arrayElement(['newsite', 'oldsite']),
          latitude: faker.address.latitude(),
          longitude: faker.address.longitude(),
          time: tm,
          fileId: '1550659773372.jpg',
          image: faker.image.transport(),
          type: faker.random.arrayElement(['in', 'out']),

        }
        let array = this.state.data;
        array.push(access);

        this.setState({
          data: array,
          openDialog: false,
          total: countTransactionSum([])
        });

        updateLocalStorage(this);

        break;

      case "remove":
        // let array = this.state.data.filter(item => item !== deletedItem);
        var arr = this.state.data;
        arr.splice(-1, 1);

        this.setState({
          data: arr,
          total: countTransactionSum(arr)
        });
        updateLocalStorage(this);
        break;

      case "clear":
        // let array = this.state.transactions.filter(item => item !== deletedItem);
        this.setState({
          data: [],
          total: countTransactionSum([])
        });
        updateLocalStorage(this);
        break;

      default:
        break;
    }

    // let dt = JSON.parse(localStorage.getItem("images"));

    console.log("Saved");
  };

  render() {
    const { classes, theme } = this.props;
    const { open, images } = this.state;

    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                eGatePass System
              </Typography>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>

              <IconButton
                aria-haspopup="true"
                onClick={e => this.handleClickTest(e, "add")}
                color="inherit"
              >
                <AddCircle />
              </IconButton>

              <IconButton
                aria-haspopup="true"
                onClick={e => this.handleClickTest(e, "remove")}
                color="inherit"
              >
                <RemoveCircle />
              </IconButton>

              <IconButton
                aria-haspopup="true"
                onClick={e => this.handleClickTest(e, "clear")}
                color="inherit"
              >
                <ClearAll />
              </IconButton>

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-owns={isMenuOpen ? "material-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Link to="/" style={{ textDecoration: "none" }}>
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItem>
              </Link>

              <Link to="dashboard" style={{ textDecoration: "none" }}>
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItem>
              </Link>

              <Link to="camera" style={{ textDecoration: "none" }}>
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Camera"} />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link to="images" style={{ textDecoration: "none" }}>
                <ListItem button>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Images"} />
                </ListItem>
              </Link>

              <Link to="galleries" style={{ textDecoration: "none" }}>
                <ListItem button>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Galleries"} />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >
            <div className={classes.drawerHeader} />
            {/* <Typography paragraph>Camera</Typography> */}

            <Route exact path="/" component={MannirCam} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/camera" component={MannirCam} />

            <Route
              exact
              path="/images"
              render={props => <Images {...props} images={images} />}
            />

            <Route
              exact
              path="/galleries"
              render={props => <Galleries {...props} images={images} />}
            />

            {/* <Images images={images} /> */}
            {/* <Galleries images={images} /> */}
          </main>
        </div>
      </Router>
    );
  }
}

Drawer1.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Drawer1);
