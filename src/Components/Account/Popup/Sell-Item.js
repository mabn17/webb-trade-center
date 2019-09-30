import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { execSellStocks } from '../../../Helpers/Requests/stocks/stocks';
import { getToken } from '../../../Helpers/Methods/TokenHandeler';

const useStyles = makeStyles(theme => ({
  warning: {
    color: 'red',
  },
  succsess: {
    color: 'green'
  },
}));

const FormDialog = ({ open, handleClose, item, getNewInfo, updatePersonal }) => {
  const classes = useStyles();
  const [val, setVal] = React.useState(item.amount);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState('');
  const handleDeposit = () => {
    setErrMsg('');
    if (val > item.amount) {
      setErrMsg('Wops, Can not sell more stocks then you own.');
      return;
    }
    if (val <= 0) {
      setErrMsg('Wops, You cant sell a negative number');
      return;
    }

    if (!isUpdating) {
      setIsUpdating(true);
      execSellStocks(getToken(), {stockToSell: item.item_name, amountToSell: val})
        .then((res) => {
          if (typeof res === typeof '  ') {
            setErrMsg(res);
            setIsUpdating(false);
            return;
          }

          setIsUpdating(false);
          getNewInfo();
          updatePersonal();
          handleClose();
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
        <DialogTitle id="form-dialog-title">{ item.item_name }</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="assets"
            label="Stocks to sell"
            type="number"
            onChange={handleChange}
            defaultValue={item.amount}
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
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
