import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles } from '@material-ui/core/styles';

import Sidebar from '../../Layout/sidebar/Sidebar';

const featuredItems = [
  {
    title: 'Clock',
    date: 'Nov 12',
    description:
      'A verry cool thing to sell',
  },
  {
    title: 'Lamp',
    date: 'Nov 11',
    description:
      'A verry cool thing to sell',
  },
];

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  }
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
    {featuredItems.map(item => (
      <Grid item key={item.title} xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {item.date}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {item.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
            </Hidden>
          </Card>
        </CardActionArea>
      </Grid>
    ))}

    <Grid container spacing={5} className={classes.mainGrid}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          En test titel
        </Typography>
        <Divider />
      </Grid>
    </Grid>
    <Sidebar />
  </>
  );
}

export default HomePage;