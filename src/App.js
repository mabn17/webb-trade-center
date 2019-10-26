import React, { lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
const UpdatePage = lazy(() => import('./Components/Update/Update-Page'));
const Shop = lazy(() => import('./Components/Shop/Shop'));


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  },
  wrapper: {
    flex: '1 0 auto'
  },
  centerLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '100px',
    fontSize: '20px',
    margin: 'auto auto'
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  }
}));

const App = () => {
  const [update, setUpdate] = React.useState(false);
  const classes = useStyles();
  const refresh = () => (setUpdate(!update));


  return (
    <div className={classes.app}>
      <CssBaseline />
        <Router>
          <div className={classes.wrapper}>
            <Container maxWidth="lg">
              <Header updateAll={update} />
              <main className={classes.root}>
                <React.Suspense fallback={<h1>Loading ...</h1>} className={classes.centerLoading}>
                  <Grid container spacing={4}>
                    <Switch>
                      <Route exact path="/" render={() => <HomePage />} />
                      <Route exact path="/about" render={() => <AboutPage />} />
                      <Route exact path="/stocks" render={() => <AllItemsPage />} />
                      <Route exact path="/shop" render={(props) => <Shop {...props} />}/>
                      <Route exact path="/stocks/:name" render={(props) => <SpesificItemPage {...props} />} />
                      <Route exact path="/account" render={(props) => <MyAccountPage {...props} updateAll={refresh} />} />
                      <Route path="/login" render={(props) => <LoginPage {...props} updateAll={refresh} />} />
                      <Route path="/register" render={(props) => <RegisterPage {...props} updateAll={refresh} />} />
                      <Route exact path="/update" render={() => <UpdatePage />} />
                      <Route exact path="**" render={() => <FoFPage />} />
                    </Switch>
                  </Grid>
                </React.Suspense>
              </main>
            </Container>
          </div>
          </Router>
        <Footer />
    </div>
  );
}

export default App;