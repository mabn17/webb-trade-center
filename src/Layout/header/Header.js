import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { NavLink as LinkTwo, Link } from 'react-router-dom';
import { getToken, removeToken } from '../../Helpers/Methods/TokenHandeler';

import NavConfig from '../navbar/NavConfig';
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
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '16px',
  },
  titleLink: {
    color: 'black',
    textDecoration: 'none',
  },
}));

// style-lint: disabe

const Header = (props) => {
  const [token, setToken] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setToken(getToken());
  }, [update, props.updateAll]);

  const handleToken = () => {
    setUpdate(!update);
  }

  const logout = () => {
    removeToken();
    handleToken();

    props.history.push('/login');
  };

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
      <Navbar token={token} update={handleToken} />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={`${classes.toolbarTitle} fix-icon-center`}
        >
        <span className="page-title">
          <Link to="/" id="home" className={classes.titleLink}>Webb Trade Center</Link>
        </span>
        </Typography>
          <div className="remove-me-sm">
            { !token ?
              (
                <>
                  <LinkTwo exact activeClassName="activeS" className={classes.link} to={NavConfig.buttons.Login.url}>
                    <Button id="login" variant="outlined" size="small" className={`${classes.topBtns} no-pointer`}>
                      <span>{NavConfig.buttons.Login.name}</span>
                    </Button>
                  </LinkTwo>
                  <LinkTwo exact activeClassName="activeS" className={classes.link} to={NavConfig.buttons.Sign.url}>
                    <Button id="register" variant="outlined" size="small" className={`${classes.topBtns} no-pointer`}>
                      <span>{NavConfig.buttons.Sign.name}</span>
                    </Button>
                  </LinkTwo>
                </>
              ) :
              (
                <Button id="logout" variant="outlined" size="small" className={`${classes.topBtns} no-pointer`} onClick={logout}>
                  <span>{NavConfig.buttons.Logout.name}</span>
                </Button>
              )
            }
          </div>
        </Toolbar>
      <div className="remove-me-sm">
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {NavConfig.defaults.map(url => (
            CreateLink(url)
          ))}
          { !token ? null : (
              NavConfig.loggedIn.map(memberUrl => (
                CreateLink(memberUrl)
              ))
            )
          }
        </Toolbar>
      </div>
    </>
  );
};

export default withRouter(Header);
