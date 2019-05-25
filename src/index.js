import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {reducer} from './reducer';
import App from './components/app/app.jsx';

import {PLACES_DATA} from "./mock/places";


// Entry point for project
const init = () => {
  const store = createStore(reducer);

  // React render for App component
  ReactDOM.render(<Provider store={store}>
    <App
      places={PLACES_DATA}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
