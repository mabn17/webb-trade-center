import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Layout/header/Header';
import Footer from './Layout/footer/Footer';
import HomePage from './Components/Home/Index-Page';
import FoFPage from './Components/FoF/FoF-Page';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <Container maxWidth="lg">
        <Header />
        <main>
          <Grid container spacing={4}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="**" component={FoFPage} />
            </Switch>
          </Grid>
        </main>
      </Container>
    </BrowserRouter>
    <Footer />
  </React.Fragment>
)

export default App;