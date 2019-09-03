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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => props.toggleNavDrawer()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Talk to Me
          </Typography>
          <Button onClick={() => props.toggleRegisterDialog()} color="inherit">Register</Button>
          <Button onClick={() => props.toggleLoginDialog()} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <NavDrawer { ...props }/>
      <LoginDialog { ...props }/>
      <RegisterDialog {...props} />
    </div>
  );
}

export default Navbar