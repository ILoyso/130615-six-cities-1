import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

import {PLACES_DATA} from "./mock/places";


// Entry point for project
const init = () => {

  // React render for App component
  ReactDOM.render(
      <App
        places={PLACES_DATA}
      />,
      document.querySelector(`#root`)
  );
};

init();
