import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
// import emptyProfile from '../../assets/emptyProfile.jpg'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const CreateProfile = (props) => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      marginTop: '5vh'
    },
    header: {
      textAlign: 'center',
    },
    paper: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(5, 5),
      height: '40vh',
      position: 'relative'
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
    }
  }));

  const getSteps = () => {
    return ['Create your Profile', 'Upload Pictures', 'Review'];
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const steps = getSteps();
  const classes = useStyles();
  
  const getStepContent = (step) => {
    switch (step) {
        case 0:
        return firstStep();
        case 1:
        return 'Upload pictures here';
        case 2:
        return thirdStep();
        default:
        return 'Unknown step';
    }
  }

  const firstStep = () => {
    return (
      <div>
        <Grid container spacing={4} className={classes.grid}>
          {/* <Avatar alt="User Avatar" src={props.userData && props.userData.avatar ? props.userData.avatar : emptyProfile} className={classes.avatar} /> */}
          <Grid item xs={6}>
            <TextField
              autoFocus
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
          <Grid item xs={6}>
            <TextField
              autoFocus
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
        </Grid>
      </div>
    )
  }

  const thirdStep = () => {
    return (
      <div>
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
        </Grid>
      </div>
    )
  }

  function isStepOptional(step) {
    return step === 1;
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function handleNext() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }

  // function handleReset() {
  //   setActiveStep(0);
  // }

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>

            {getStepContent(activeStep)}

            <div className={classes.stepButtons}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

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
                  onClick={() => activeStep === 2 ? props.updateProfile(props.userData.id, firstName, lastName) : null}
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