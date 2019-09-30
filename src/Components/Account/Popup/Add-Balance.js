import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { addUserAssets } from '../../../Helpers/Requests/stocks/stocks';
import { getToken } from '../../../Helpers/Methods/TokenHandeler';

const useStyles = makeStyles(theme => ({
  warning: {
    color: 'red',
  },
  succsess: {
    color: 'green'
  },
}));

const FormDialog = ({ open, handleClose, update }) => {
  const classes = useStyles();
  const [val, setVal] = React.useState(0);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const handleDeposit = () => {
    setErrMsg('');
    if (val <= 0) {
      setErrMsg('Wops, Must be a positive number.');
      return;
    }

    if (!isUpdating) {
      setIsUpdating(true);

      addUserAssets(getToken(), { newAmount: val }).then((res) => {
        if (typeof res === typeof '  ') {
          setErrMsg(`Wops, ${res}`);
          setIsUpdating(false);
          return
        }
        setVal(0);
        setErrMsg(`${val} kr has been added to your account`);
        update();
        setIsUpdating(false);
      }).catch(() => {
        setErrMsg('Something went wrong try again.');
        setIsUpdating(false);
      })
    }
    // handleClose();
  };
  const handleChange = (e) => {
    setVal(e.target.value);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Desposit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="assets"
            label="Balance to add"
            type="number"
            onChange={handleChange}
            value={val}
            fullWidth
          />
          { errMsg && errMsg.startsWith('Wops')
            ? (<span className={classes.warning} >{ errMsg }</span>)
            : (<span className={classes.succsess} >{ errMsg }</span>)
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleDeposit} color="primary">
            Deposit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
