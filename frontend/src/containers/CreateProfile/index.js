import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import emptyProfile from '../../assets/emptyProfile.jpg'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

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
    margin: theme.spacing(5, 5)
  }
}));

const getSteps = () => {
    return ['Create your Profile', 'Upload Pictures', 'Review'];
}
  
const getStepContent = (step) => {
    switch (step) {
        case 0:
        return 'Tell us about yourself';
        case 1:
        return 'What is an ad group anyways?';
        case 2:
        return 'This is the bit I really care about!';
        default:
        return 'Unknown step';
    }
}

const CreateProfile = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

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

  function handleReset() {
    setActiveStep(0);
  }

  console.log(props)

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
            <div>
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

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
            {/* <Grid container justify="left" alignItems="left">
                <Avatar alt="User Avatar" src={props.userData && props.userData.avatar ? props.userData.avatar : emptyProfile} className={classes.avatar} />
            </Grid> */}
        </Paper>
    </div>
  );
}

export default CreateProfile;