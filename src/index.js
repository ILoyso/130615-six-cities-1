import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import history from './utils/history';
import reducer from './reducer/reducer';
import {createAPI} from './api';
import {Operation as DataOperation} from './reducer/data/data';
import {Operation as UserOperation} from './reducer/user/user';

import App from './components/app/app.jsx';


// Entry point for project
const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          global.__REDUX_DEVTOOLS_EXTENSION__ ? global.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a
      )
  );
  /* eslint-enable */

  store.dispatch(DataOperation.loadPlaces());
  store.dispatch(UserOperation.checkAuth());

  // React render for App component
  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
