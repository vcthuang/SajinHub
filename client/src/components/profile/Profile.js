import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux action
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

import Spinner from '../common/Spinner';


class Profile extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();   
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;


    let profileContent;
    
    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0 ) {
 
        profileContent = (
          <div>

            <div className="card" >
              <img className="card-img-top" 
                src={user.avatar} 
                alt="" />

              <Link to="/create-profile" className="btn btn-lg btn-info">
                Edit
              </Link>  
              <div className="card-body">          
                <h5 className="card-title">
                  <Link to = {`/profile/${profile.handle}`}>{user.name}'s Profile</Link>
                </h5>
                <p className="card-text">Joined since {profile.joinDate}...</p>
              </div>
              
              <div style={{ marginBottom: '60px'}} />
              <button
                onClick= {this.onDeleteClick.bind(this)}
                className= "btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
         // User is logged in but has no profile
         profileContent = (
          <div>
            <p className = "lead text-muted">
              Welcome {user.name}
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="profile">
        <div className="container">
          <div className = "row">
            <div className = "col_md-12">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect (mapStateToProps, { getCurrentProfile, deleteAccount })(withRouter(Profile));
