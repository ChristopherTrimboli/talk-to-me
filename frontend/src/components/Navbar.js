import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavDrawer from './NavDrawer';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Navbar = (props) => {

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'inherit',
      textDecoration: 'none'
    },
    link:{
      color: 'inherit',
      textDecoration: 'none'
    },
    showButtons: {
      display: props.userData.loggedIn ? 'none' : 'inline-flex'
    },
    avatar: {
      display: props.userData.loggedIn ? 'flex' : 'none',
      cursor: 'pointer'
    }
  }));

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function logout() {
    props.logout()
    handleClose()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => props.toggleNavDrawer()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.title}>
            <Typography variant="h6">
              Talk to Me
            </Typography>
          </Link>
          <Button className={classes.showButtons} onClick={() => props.toggleRegisterDialog()} color="inherit">Register</Button>
          <Button className={classes.showButtons} onClick={() => props.toggleLoginDialog()} color="inherit">Login</Button>
          <Avatar className={classes.avatar} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            {props.userData.firstName || props.userData.lastName ? props.userData.firstName.substring(0, 1) + props.userData.lastName.substring(0, 1) : ''}
          </Avatar>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose()}><Link to="/createProfile" className={classes.link}>Create Profile</Link></MenuItem>
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <NavDrawer { ...props }/>
      <LoginDialog { ...props }/>
      <RegisterDialog {...props} />
    </div>
  );
}

export default Navbar