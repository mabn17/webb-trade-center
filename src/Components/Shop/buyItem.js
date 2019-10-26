import React from 'react';
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

const FormDialog = ({ open, handleClose, item, updatePersonal, token }) => {
  const classes = useStyles();
  const [val, setVal] = React.useState(item.amount);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const handleDeposit = () => {
    setErrMsg('');
    // if ((item.price * val) > token.assets) {
    //   setErrMsg('Wops, Can not buy more stocks then have balance.');
    //   return;
    // }
    if (val <= 0) {
      setErrMsg('Wops, You cant buy a negative number');
      return;
    }

    if (!isUpdating) {
      setIsUpdating(true);
      execBuyStocks(getToken(), {stockToBuy: item.name, amountToBuy: val})
        .then((res) => {
          if (typeof res === typeof '  ') {
            setErrMsg(`Wops, ${res}`);
            setIsUpdating(false);
            return;
          }

          setIsUpdating(false);
          updatePersonal();
          // handleClose();
          setErrMsg(`${item.name} succsessfully bought!`);
        }).catch((e) => { console.log(e); setIsUpdating(false); });
    }
  };

  React.useEffect(() => {
    setVal(item.amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setVal(item.amount);
    setErrMsg('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleChange = (e) => { setVal(e.target.value); }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{ item.name }</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="assets"
            label={`${item.price}/each`}
            type="number"
            onChange={handleChange}
            defaultValue={0}
            fullWidth
          />
          <span>Balance: {round(token.assets)}</span><br />
          <span
            className={
              item.price * val > token.assets
              || val <= 0
                ? classes.warning
                : classes.succsess
            }
          >
            Cost: { isNaN(item.price * val) ? 0 : round(item.price * val) }
          </span>
          <br />
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
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
