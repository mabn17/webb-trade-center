import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { execBuyStocks } from '../../Helpers/Requests/stocks/stocks';
import { getToken } from '../../Helpers/Methods/TokenHandeler';
import { round } from '../../Helpers/Methods/FilterValues.js';

const useStyles = makeStyles(theme => ({
  warning: {
    color: 'red',
    marginTop: '5px',
  },
  succsess: {
    color: 'green',
    marginTop: '5px',
  }
}));

const FormDialog = ({ open, handleClose, item = 0, items = [{}], updatePersonal, token }) => {
  const classes = useStyles();
  const [val, setVal] = React.useState(0);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const handleDeposit = () => {
    setErrMsg('');

    if (val <= 0) {
      setErrMsg('Wops, You cant buy a negative number');
      return;
    }

    if (!isUpdating) {
      setIsUpdating(true);
      execBuyStocks(getToken(), {stockToBuy: items[item].name, amountToBuy: val})
        .then((res) => {
          if (typeof res === typeof '  ') {
            setErrMsg(`Wops, ${res}`);
            setIsUpdating(false);
            return;
          }

          setIsUpdating(false);
          updatePersonal();
          // handleClose();
          setErrMsg(`${items[item].name} succsessfully bought!`);
        }).catch((e) => { console.log(e); setIsUpdating(false); });
    }
  };

  React.useEffect(() => {
    setVal(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setVal(0);
    setErrMsg('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleChange = (e) => { setVal(e.target.value); }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{ items[item].name }</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="assets"
            label={`${items[item].price}/each`}
            type="number"
            onChange={handleChange}
            defaultValue={0}
            fullWidth
          />
          <span>Balance: {round(token.assets)}</span><br />
          <span
            className={
              items[item].price * val > token.assets
              || val <= 0
                ? classes.warning
                : classes.succsess
            }
          >
            Cost: { isNaN(items[item].price * val) ? 0 : round(items[item].price * val) }
          </span>
          <br />
          { errMsg && errMsg.startsWith('Wops')
            ? (<span className={classes.warning} >{ errMsg }</span>)
            : (<span className={classes.succsess} >{ errMsg }</span>)
          }
          <br />
          { token.id === 0 ? <Link className={classes.warning} to="/login">
            Login to continue
          </Link> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleDeposit} disabled={token.id === 0} color="primary">
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
