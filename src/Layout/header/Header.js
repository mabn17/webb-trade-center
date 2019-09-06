import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem'

// import Link from '@material-ui/core/Link';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

import { NavLink as LinkTwo } from 'react-router-dom';
import NavConfig from '../navbar/NavConfig';

import HeaderImage from '../../assets/HeaderImage.jpeg';

import Navbar from '../navbar/Navbar';
import './Style.css';

const useStyles = makeStyles(theme => ({
  topBtns: {
    marginRight: theme.spacing(2),
    fontSize: '16px',
    padding: theme.spacing(1)
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'center',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: 'rgba(41, 44, 42, 0.7)', //theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${HeaderImage})`, // https://source.unsplash.com/user/erondu
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    }
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '16px',
  }
}));

// style-lint: disabe

const Header = () => {
  const classes = useStyles();

  const CreateLink = (item) => (
    <LinkTwo key={item.name}  exact activeClassName="active" className={classes.link} to={item.url} style={ { margin: '10px' } }>
      <MenuItem color="inherit">
          { item.name }
      </MenuItem>
    </LinkTwo>
  );

  return (
    <>
      <Toolbar className={classes.toolbar}>
      <Navbar />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={`${classes.toolbarTitle} fix-icon-center`}
        >
        <span className="page-title">
          Webb Trade Center
        </span>
        </Typography>
          <div className="remove-me-sm">
            <LinkTwo exact activeClassName="activeS" className={classes.link} to={NavConfig.buttons.Login.url}>
              <Button variant="outlined" size="small" className={`${classes.topBtns} no-pointer`}>
                <span>{NavConfig.buttons.Login.name}</span>
              </Button>
            </LinkTwo>
            <LinkTwo exact activeClassName="activeS" className={classes.link} to={NavConfig.buttons.Sign.url}>
              <Button variant="outlined" size="small" className={`${classes.topBtns} no-pointer`}>
                <span>{NavConfig.buttons.Sign.name}</span>
              </Button>
            </LinkTwo>
          </div>
        </Toolbar>

      <div className="remove-me-sm">
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {NavConfig.defaults.map(url => (
            CreateLink(url)
          ))}
        </Toolbar>
      </div>
    </>
  );
};

export default Header;

/* <Paper className={classes.mainFeaturedPost}>
  {
    <img
      style={{ display: 'none' }}
      src="https://source.unsplash.com/user/erondu"
      alt="background"
    />
  }
  <div className={classes.overlay} />
  <Grid container>
    <Grid item md={6}>
      <div className={classes.mainFeaturedPostContent}>
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
          Skall man göra en title till? ..
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
          kan man lägga till lite mer text som en paragraf kanske?..
        </Typography>
      </div>
    </Grid>
  </Grid>
</Paper> */