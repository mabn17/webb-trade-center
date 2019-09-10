import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Layout/header/Header';
import Footer from './Layout/footer/Footer';
import HomePage from './Components/Home/Index-Page';
import AboutPage from './Components/About/About-Page';
import MyAccountPage from './Components/Account/My-Account-Page';
import LoginPage from './Components/Login/Login-Page';
import RegisterPage from './Components/Register/Register-Page';
import FoFPage from './Components/FoF/FoF-Page';
import AllItemsPage from './Components/Items/All-Items-Page';
import SpesificItemPage from './Components/Items/Spesific/Spesific-Item-Page';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  }
}));

const App = () => {
  const [update, setUpdate] = React.useState(false);
  const classes = useStyles();

  const refresh = () => (setUpdate(!update));

  return (
    <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
        <Container maxWidth="lg">
          <Header updateAll={update} />
          <main className={classes.root}>
            <Grid container spacing={4}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/clocks" component={AllItemsPage} />
                <Route exact path="/clocks/:name" component={SpesificItemPage} />
                <Route exact path="/account" render={(props) => <MyAccountPage {...props} updateAll={refresh} />} />
                <Route path="/login" render={(props) => <LoginPage {...props} updateAll={refresh} />} />
                <Route path="/register" render={(props) => <RegisterPage {...props} updateAll={refresh} />} />
                <Route exact path="**" component={FoFPage} />
              </Switch>
            </Grid>
          </main>
        </Container>
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
}

export default App;