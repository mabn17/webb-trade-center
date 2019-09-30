
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  addItem
} from '../../Helpers/Methods/ShoppingItems';

const useStyles = makeStyles(_theme => ({
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
  link: {
    textDecoration: 'none',
    color: 'black'
  }
}));

const Item = (props) => {
  // const encoded = getToken();
  const [hasBeenClicked, setHasBeenClicked] = React.useState(false);
  // const [updatedInfo, setUpdatedInfo] = React.useState({});
  const classes = useStyles();

  const handleAddItem = () => {
    setHasBeenClicked(true);
    addItem(props.item);
    props.newItem();
  }

  // const handleGetUpdatedPersonalInfo = () => {
  //   setUpdatedInfo({});
  //   getUpdatedInfo(encoded)
  //     .then((res) => {
  //       if(typeof res === typeof ' ') {
  //         setUpdatedInfo({ id: 0, assets: 0,  });
  //         return;
  //       }

  //       setUpdatedInfo(res);
  //     })
  //     .catch((e) => console.log(e));
  // };


  return (
    <Grid item key={props.item.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={props.item.picture}
          title={props.item.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.item.name}
          </Typography>
          <hr />
          <Typography>
            {props.item.description}
            <br />
            <small>{props.item.price} kr.</small>
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/stocks/${props.item.name}`} className={classes.link}>
            <Button size="small" color="primary">
              View
            </Button>
          </Link>
          <Button size="small" color="primary" disabled={hasBeenClicked} onClick={handleAddItem} >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Item;
