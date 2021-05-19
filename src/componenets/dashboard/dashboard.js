import React,{useEffect} from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../action/profile";
import Spinner from '../layout/spinner'
import {Link} from 'react-router-dom'
import DashboardAction from './dashboardAction'
import Experience from './Experience'
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="lasrge text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction></DashboardAction>
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteAccount();
              }}
            >
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not set up the Profile yet, please add it</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  
  return { auth: state.auth, profile: state.profile };
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
