import React, {useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import ToDo from './components/pages/ToDo/ToDo.jsx';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import NotFound from './components/pages/NotFound/NotFound';
import SingleTask from './components/pages/SingleTask/SingleTask';
import {connect} from 'react-redux';
import Spinner from './components/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './helpers/history';

const toastStyle = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  }

function App(props) {

  useEffect(()=>{
    if(props.successMessage){
      toast.success(props.successMessage, toastStyle);
    }
    if(props.errorMessage){
      toast.error(props.errorMessage, toastStyle);
    }

  },[props.successMessage, props.errorMessage])

  return (
    <div className="App">
      <Router history={history}>
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
      </Router>
      { props.spinnerShow && <Spinner/> } 
      <ToastContainer/>
    </div>
  ); 
}

const mapStateToProps = (state)=>{
    return {
      spinnerShow: state.spinnerShow,
      successMessage: state.successMessage,
      errorMessage: state.errorMessage
    };
};

export default connect(mapStateToProps)(App) 