import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment'
import AddressAutocomplete from './AddressAutocomplete';
import InterestChips from './InterestChips'
import { isMobile } from '../../constants/enviroment';
import Chip from '@material-ui/core/Chip';
import emptyImage from '../../assets/emptyImage.png'

const CreateProfile = (props) => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      padding: theme.spacing(2, 2),
      maxWidth: '1000px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
    },
    paper: {
      margin: isMobile ? '0' : theme.spacing(1, 1),
      minHeight: '40vh',
      position: 'relative',
      marginBottom: '70px',
      padding: '10px',
      paddingBottom: '70px'
    },
    formControl: {
      minWidth: '100%',
    },
    stepButtons: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      margin: '15px'
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    grid: {
      padding: '20px'
    },
    stepper: {
      padding: isMobile ? '10px' : '20px'
    },
    stepLabel: {
      fontSize: isMobile ? '12px' : '0.875rem'
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    imageCard: {
      width: "220px",
      height: '220px',
      margin: '0 auto'
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.5
      }
    }
  }));

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [location, setLocation] = useState('');
  const [chipData, setChipData] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setFirstName(props.userData.firstName || '');
    setLastName(props.userData.lastName || '');
    setGender(props.userData.gender || '');
    setBirthday(props.userData.birthday || new Date());
    setLocation(props.userData.location || '');
    setChipData(props.userData.interests || [
      { key: 0, label: 'Dating' },
      { key: 1, label: 'Friends' },
      { key: 2, label: 'Hangout' },
      { key: 3, label: 'Eating' },
      { key: 4, label: 'Laughs' }
    ]);

  }, [props.userData.firstName, props.userData.lastName, props.userData.gender, props.userData.birthday, props.userData.location, props.userData.interests]);


  const getSteps = () => {
    return ['Create Profile', 'Upload Pictures', 'Review'];
  }

  const steps = getSteps();
  
  const getStepContent = step => {
    switch (step) {
        case 0:
        return firstStep();
        case 1:
        return secondStep();
        case 2:
        return thirdStep();
        default:
        return 'Unknown step';
    }
  }

  const firstStep = () => {
    return (
      <Grid container spacing={4} className={classes.grid}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            value={firstName}
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            value={lastName}
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <FormControl required className={classes.formControl}>
            <InputLabel shrink htmlFor="gender-input">Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              inputProps={{
                name: 'Gender',
                id: 'gender-input',
              }}
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
              <MenuItem value={'Non-Binary'}>Non-Binary</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Birthday"
              format="MM/dd/yyyy"
              value={birthday}
              onChange={(birthday) => setBirthday(birthday)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              required
              className={classes.formControl}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AddressAutocomplete location={location} setLocation={setLocation} onChange={setLocation}/>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <InterestChips chipData={chipData} setChipData={setChipData}/>
        </Grid>
      </Grid>
    )
  }

  const uploadImage = (index) => {
    const input = document.getElementById(`imageInput-${index}`);
    input.click();
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let newArray = images;
      newArray[index] = reader.result;
      setImages(newArray)
      document.getElementById('img-' + index).src = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error reading image: ', error);
    };
  }

  const secondStep = () => {
    return (
      <>
        <Grid container spacing={4} className={classes.grid} style={{'paddingRight': '32px'}}>
          {
            Array(8).fill(null).map((value, index) => {
              return(
                <Grid item lg={3} md={3} sm={6} xs={12} key={index}>
                  <Paper className={`${classes.imageCard} imageCard`}>
                    <img src={images[index] ? images[index] : emptyImage} alt={`img-${index}`} id={`img-${index}`} className={classes.image} onClick={() => uploadImage(index)}/>
                    <input type="file" id={`imageInput-${index}`} style={{'visibility': 'hidden'}} onChange={(e) => handleImageChange(e, index)}/>
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </>
    )
  }

  const thirdStep = () => {
    return (
      <Grid container spacing={4} className={classes.grid}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">First Name: 
            <Typography variant="body2">{firstName}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Last Name: 
            <Typography variant="body2">{lastName}</Typography>
          </Typography>          
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Gender:
            <Typography variant="body2">{gender}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Birthday: 
            <Typography variant="body2">{moment(birthday).format('MMMM Do YYYY')}</Typography>
          </Typography>          
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Location: 
            <Typography variant="body2">{location}</Typography>
          </Typography>          
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" style={{'marginBottom': '10px'}}>Interests: </Typography>    
          {chipData.map(data => {
            return (
            <Chip
                key={data.key}
                label={data.label}
                className={classes.chip}
            />
            );
          })}      
        </Grid>
      </Grid>
    )
  }

  const isStepSkipped = step => {
    return skipped.has(step);
  }

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
                stepProps.completed = false;
            }
            return (
                <Step key={label} {...stepProps}>
                <StepLabel {...labelProps} className={classes.stepLabel}>{label}</StepLabel>
                </Step>
            );
            })}
        </Stepper>

        {getStepContent(activeStep)}

        <div className={classes.stepButtons}>
          <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
            Back
          </Button>

          {
            activeStep !== 2 ? 
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
            : null
          }
          {
            activeStep === 2 ? 
            <Button
              variant="contained"
              color="primary"
              onClick={() => activeStep === 2 ? 
                props.updateProfile(props.userData.id, firstName, lastName, gender, birthday, location, chipData.map(chip => chip.label))
               : null
              }
              className={classes.button}
            >
              Finish
            </Button>
            : null
          }
        </div>
      </Paper>
    </div>
  );
}

export default CreateProfile;