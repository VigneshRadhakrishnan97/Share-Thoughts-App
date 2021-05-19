import React,{useEffect,Fragment} from 'react'
import {connect} from 'react-redux'
import Spinner from  '../layout/spinner'
import { getProfilebyID } from '../../action/profile'
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from './ProfileEducation'
import ProfileGithub from "./ProfileGithub";
import {Link} from 'react-router-dom'

const Profile = ({ getProfilebyID,auth,profile:{profile,loading},match }) => {
useEffect(() => {
    
  getProfilebyID(match.params.id);
}, [getProfilebyID]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles">GO back to Profiles</Link>
          {auth.isAuthendicated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp) => {
                    return <ProfileExperience key={exp._id} experience={exp} />;
                  })}
                </Fragment>
              ) : (
                <h4>No experiences</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu) => {
                    return <ProfileEducation key={edu._id} education={edu} />;
                  })}
                </Fragment>
              ) : (
                <h4>No educations</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStatetoProps = (state)=>{
return{ 
    profile:state.profile,
    auth:state.auth
}
}

export default connect(mapStatetoProps,  { getProfilebyID })(Profile);
