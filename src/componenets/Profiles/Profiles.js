import React,{Fragment,useEffect} from 'react'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner'
import {getProfiles} from '../../action/profile'
import ProfileItem from './ProfileItems'

const Profiles = ({ profile:{profiles,loading}, getProfiles }) => {
    useEffect(() => {
      getProfiles();
    }, [getProfiles]);
  return <Fragment>
      {loading?<Spinner/>:<Fragment> 
          <h1 className="large text-primary">
              Developers
          </h1>
          <p className="lead" >
            <i className="fab fa-connectdevelop" ></i>
            Browse and connect with Developers
          </p>
          <div className="profiles">
              
            {profiles.length >0 ? (profiles.map((profile)=>{
                return (<ProfileItem key={profile._id} profile={profile} />);
            })) : (<h4>No Profiles found</h4>)}
          </div>
      </Fragment> }
  </Fragment>
};

const mapStatetoProps =(state)=>{
return{profile:state.profile}
}
export default connect(mapStatetoProps, { getProfiles })(Profiles);
