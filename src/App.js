import React, { lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Layout/header/Header';
import Footer from './Layout/footer/Footer';

const HomePage = lazy(() => import('./Components/Home/Index-Page'));
const AboutPage = lazy(() => import('./Components/About/About-Page'));
const AllItemsPage = lazy(() => import('./Components/Items/All-Items-Page'));
const SpesificItemPage = lazy(() => import('./Components/Items/Spesific/Spesific-Item-Page'));
const FoFPage = lazy(() => import('./Components/FoF/FoF-Page'));
const RegisterPage = lazy(() => import('./Components/Register/Register-Page'));
const MyAccountPage = lazy(() => import('./Components/Account/My-Account-Page'));
const LoginPage = lazy(() => import('./Components/Login/Login-Page'));


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  },
  centerLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '100px',
    fontSize: '20px',
    margin: 'auto auto'
  }
}));

const App = () => {
  const [update, setUpdate] = React.useState(false);
  const classes = useStyles();

  // Update <Header /> values from Route components
  const refresh = () => (setUpdate(!update));


  return (
    <React.Fragment>
    <CssBaseline />
    <React.Suspense fallback={<h1>Loading ...</h1>} className={classes.centerLoading}>
      <BrowserRouter>
          <Container maxWidth="lg">
            <Header updateAll={update} />
            <main className={classes.root}>
              <Grid container spacing={4}>
                <Switch>
                  <Route exact path="/" render={() => <HomePage />} />
                  <Route exact path="/about" render={() => <AboutPage />} />
                  <Route exact path="/stocks" render={() => <AllItemsPage />} />
                  <Route exact path="/stocks/:name" render={() => <SpesificItemPage />} />
                  <Route exact path="/account" render={(props) => <MyAccountPage {...props} updateAll={refresh} />} />
                  <Route path="/login" render={(props) => <LoginPage {...props} updateAll={refresh} />} />
                  <Route path="/register" render={(props) => <RegisterPage {...props} updateAll={refresh} />} />
                  <Route exact path="**" render={() => <FoFPage />} />
                </Switch>
              </Grid>
            </main>
          </Container>
        </BrowserRouter>
      </React.Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default App;