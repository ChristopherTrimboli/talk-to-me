import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import VideocamIcon from '@material-ui/icons/Videocam';
import moment from 'moment';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const UserCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.user.firstName.substring(0, 1) + props.user.lastName.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <VideocamIcon />
          </IconButton>
        }
        title={`${props.user.firstName} ${props.user.lastName}`}
        subheader={moment(props.user.birthday).format('MMMM Do YYYY')}
      />
       <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <span style={{'color': 'black'}}>Location: <br/></span>{props.user.location}
        </Typography>
        <br/>
        <Typography variant="body2" color="textSecondary" component="p">
          <span style={{'color': 'black'}}>Interests: <br/></span>
          {props.user.interests.map(data => {
            return (
            <Chip
                key={data.key}
                label={data.label}
                className={classes.chip}
            />
            );
          })}      
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default UserCard;