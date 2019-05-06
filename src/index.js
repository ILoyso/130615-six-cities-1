import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';


// Entry point for project
const init = () => {

  // React render for App component
  ReactDOM.render(
      <App/>,
      document.querySelector(`#root`)
  );
};

init();
