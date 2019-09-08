
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  addItem,
  removeItem
} from '../../Helpers/Methods/ShoppingItems';

import DefaultImg from '../../assets/img/default.jpg';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Item = (props) => {
  const classes = useStyles();

  const handleAddItem = () => {
    addItem(props.item);
    props.newItem();
  }

  const handleRemoveItem = () => {
    removeItem(props.item);
    console.log('hs');
    props.newItem();
  }

  return (
    <Grid item key={props.item.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={ props.item.picture ? props.item.picture :  DefaultImg }
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.item.name}
          </Typography>
          <Typography>
            {props.item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => (handleRemoveItem())}>
            View
          </Button>
          <Button size="small" color="primary" onClick={handleAddItem} >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Item;