import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    paddingTop: '15px',
    paddingBottom: '15px'
  }
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography component="p">
          In Development
        </Typography>
      </Paper>
    </div>
  );
}

export default Footer;