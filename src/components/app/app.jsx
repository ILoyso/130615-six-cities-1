import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from '../header/header.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Favorites from '../favorites/favorites.jsx';

import withAuthorization from '../../hocs/with-authorization/with-authorization';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route';


const SignInWrapped = withPrivateRoute(withAuthorization(SignIn), `/`);
const FavoritesWrapped = withPrivateRoute(Favorites);


/**
 * Application component, here the whole process begins
 * @return {*}
 */
const App = () => {
  return <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" render={() => <MainScreen />}></Route>
      <Route path="/login" render={() => <SignInWrapped />}></Route>
      <Route path="/favorites" render={() => <FavoritesWrapped />} />
    </Switch>
  </BrowserRouter>;
};


export default App;
