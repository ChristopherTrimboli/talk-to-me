import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const RegisterDialog = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div>
      <Dialog open={props.registerDialog} onClose={() => props.toggleRegisterDialog()} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.toggleRegisterDialog()} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => props.submitRegister(email, password, firstName, lastName)} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RegisterDialog;