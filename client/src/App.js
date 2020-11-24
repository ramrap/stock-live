import React from 'react';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import DashBoard from './components/dashboard';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={DashBoard} />
    </Router>
  );
}

export default App;
