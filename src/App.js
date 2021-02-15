import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import ToDo from './components/pages/ToDo/ToDo.jsx';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavMenu/>
        <Switch>
          <Route
          path="/"
          component={ToDo}
          exact
          />
          <Route
          path="/home"
          component={ToDo}
          exact
          />
          <Route
          path="/about"
          component={About}
          exact
          />
          <Route
          path="/contact"
          component={Contact}
          exact
          />
          <Route
          path="/task/:taskId/"
          component={SingleTask}
          exact
          />
          <Route
          path="/not-found"
          component={NotFound}
          exact
          />
          <Redirect to="/not-found"/>
        </Switch>
      </BrowserRouter>
    </div>
  ); 
}

export default App; 