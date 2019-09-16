import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const LoginDialog = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = (e) => {
    e.preventDefault()
    props.submitLogin(email, password)
    props.toggleLoginDialog()
  }

  return (
    <Dialog open={props.loginDialog} onClose={() => props.toggleLoginDialog()} aria-labelledby="form-dialog-title">
      <form>
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.toggleLoginDialog()} color="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={(e) => submitLogin(e)} color="primary">
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default LoginDialog;