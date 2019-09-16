import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  textField: {
    margin: '20px 0 20px 0'
  }
}));

const InterestChips = (props) => {
  const classes = useStyles();

  const [interest, setInterest] = useState('');

  const handleDelete = chipToDelete => () => {
    props.setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  const submitChip = (e) => {
    if(e.key === 'Enter'){
        const newChips = props.chipData;
        newChips.push(
            { key: newChips.length, label: interest }
        )
        props.setChipData(newChips)
        setInterest('')
    }
  }

  return (
    <div className={classes.root}>
        <Grid container spacing={4}>
            <Grid item lg={12} md={12} sm={12} xs={12} style={{'paddingBottom': '5px'}}>
            <TextField
                id="interests"
                label="Interests"
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                fullWidth
                className={classes.textField}
                onKeyDown={(e) => submitChip(e)}
            />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} style={{'paddingTop': '0px'}}>
                {props.chipData.map(data => {
                    return (
                    <Chip
                        key={data.key}
                        label={data.label}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                    />
                    );
                })}
            </Grid>
        </Grid>
    </div>
  );
}

export default InterestChips;