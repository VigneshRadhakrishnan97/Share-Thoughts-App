import React,{Fragment,useEffect} from 'react'
import Navbar from './componenets/layout/Navbar'
import Landing from "./componenets/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from "./componenets/auth/Register";
import Login from "./componenets/auth/Login";
import Alert from './componenets/layout/alert';
import {loaduser} from './action/auth'
import Dashboard from './componenets/dashboard/dashboard';
import PrivateRoute from './componenets/privateroute/privateroute'
import './App.css';
import setAuthToken from './utils/setAuthToken'
import Createprofile from './componenets/profile-form/createprofile'
import EditProfile from './componenets/profile-form/Editprofile'
import AddExperience from './componenets/profile-form/AddExperience'
import AddEducation from "./componenets/profile-form/AddEducation";
import Profiles from './componenets/Profiles/Profiles'
import Profile from "./componenets/profile/Profile";
import Posts from './componenets/posts/Posts'
import Post from "./componenets/Post/Post";
//redux
import { Provider } from 'react-redux'
import store from './store'


if(localStorage.token)
{
  setAuthToken(localStorage.token);
}

const App=() =>{

useEffect(()=>{
store.dispatch(loaduser());
},[]);
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Route path="/" exact component={Landing} />

          <section className="container">
            <Alert />
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/profile/:id" exact component={Profile} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute
                path="/create-profile"
                exact
                component={Createprofile}
              />
              <PrivateRoute
                path="/edit-profile"
                exact
                component={EditProfile}
              />
              <PrivateRoute
                path="/add-experience"
                exact
                component={AddExperience}
              />
              <PrivateRoute
                path="/add-education"
                exact
                component={AddEducation}
              />
              <PrivateRoute path="/posts" exact component={Posts} />
              <PrivateRoute path="/post/:id" exact component={Post} />
            </Switch>
          </section>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
