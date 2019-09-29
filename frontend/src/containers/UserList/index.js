import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserCard from './UserCard.js';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  header: {
      margin: '30px',
      textAlign: 'left'
  }
}));

const UserList = props => {
  const classes = useStyles();

  const getAllUsers = () => {
      props.getAllUsers();
  }

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, [])

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        Users
      </Typography>
      <Grid container spacing={4} className={classes.grid} style={{'padding': '30px'}}>
      {
          props.users.map((user, index) => {
              return (
                <Grid item lg={3} md={3} sm={6} xs={12} key={index}>
                    <UserCard user={user}/>
                </Grid>
              )
          })
      }
      </Grid>
     
    </div>
  );
}

export default UserList;