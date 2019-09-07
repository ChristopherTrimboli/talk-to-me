import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Typewriter from 'typewriter-effect';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    textAlign: 'center',
    marginTop: '30%'
  }
}));

const FrontPage = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h1">
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('Talk to Me')
            .start();
        }}
        options={{
          cursor: null
        }}
      />
      </Typography>
    </div>
  );
}

export default FrontPage;