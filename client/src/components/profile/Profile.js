import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux action
import { getProfileByHandle, getAllProfiles, addFollowing, removeFollowing } from '../../actions/profileActions';

// UI displaycomponent
import ProfileFollowings from './ProfileFollowings';
import ProfileFollowers from './ProfileFollowers';

import Spinner from '../common/Spinner';
import isEmpty from '../../validations/isEmpty';
import UserPosts from '../posts/UserPosts';


// Profile is loaded when the user click on avatar on profileList
// This means, there is not going to be a chance for user to
// to click on other user who doesn't have profile.
//
// All profile information is displayed.  The user can toggle
// following and follower buttons to view more information.
// 
// This is also the place where the user could subscribe or 
// unsubscribe to a following.
//
// Besides the buttons, the display is similar to that of 
// ProfileHome and ProfileByID.

class Profile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      displayFollowings: false,
      displayFollowers: false,
    }
  }

  // Get profile from Redux store when the component is loading
  componentDidMount() {
    // we need to get current user profile if the user is logged in
    // and the easiet way to to find via Redux store Profiles
    this.props.getAllProfiles();

    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  // Fire Redux action when user wants to add a following
  onAddFollowing(userid) {
    this.props.addFollowing (userid);
  }

  // Fire Redux action when user wants to remove a following
  onRemoveFollowing(userid) {
    this.props.removeFollowing (userid);
  }

  render() {
    const { profile, loading, profiles } = this.props.profile;
    const { user, isAuthenticated } = this.props.auth;

    let profileContent;
    
    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      // Location
      const location = isEmpty(profile.location) ? 
        null : 
        (<span>{profile.location.city} {profile.location.country}</span>);

      // Interests
      const interests = profile.interests.map((interest, index) => (
        <div key={index} className="p-3">
          <i className="fas fa-camera" /> {interest}
        </div>
      ));

      let subsButton;
      if (isAuthenticated) {
        // User is looking at it's own profile
        if (profile.user._id === user.id) {
          subsButton = (
            <div className="btn btn-dark float-right">
              <i className="fas fa-user pr-2" style={{color:"red"}}></i>
              Me
            </div>);
        } else {
          // Display subscribe or unsubscribe button
          // Find the profile for current user
          const currentUserProfile = profiles.find(p => p.user._id === user.id);
          // Check if current user is following the profile user
          const found = currentUserProfile.followings.find(following => following.user === profile.user._id);
                  
          if (!found) {
            subsButton = (
              <button
                onClick={this.onAddFollowing.bind(this, profile.user._id)}
                className="btn btn-dark float-right"
              ><i className="fas fa-paw pr-2" style={{color:"red"}}></i>
                Subscribe
              </button>);
          } else {
            subsButton = (
              <button
                onClick={this.onRemoveFollowing.bind(this, profile.user._id)}
                className="btn btn-dark float-right"
              ><i className="fas fa-heart-broken pr-2" style={{color:"red"}}></i>
                Unsubscribe
              </button>);
          }
        }
      }

      profileContent = (
        <div>
          <div className="row">
            {/* Leftside contains avatar, location, website */}
            <div className="col-sm-4 card">
              <div className="card-body text-center">
                <img 
                  className="rounded-circle img-fluid mb-4"
                  alt="" 
                  src={profile.user.avatar} />
                <p className="card-text text-muted">
                  {location}
                </p>
                {profile.website && (<a className="card-text" href={profile.website} target="_blank">{profile.website}</a>)}
              </div>
            </div>
            {/* Rightside contains joined date, name, handle, bio, interests*/}
            <div className="col-sm-8 card bg-dark">  
              <div className="card-body text-white">
                <div className="card-text mb-3">
                  <small className="card-text">Royal member since&nbsp;
                    <Moment format="YYYY/MM/DD">{profile.joinDate}</Moment>
                  </small>
                  {subsButton}
                </div>
                            
                <div className="card-title d-flex flex-wrap justify-content-center align-items-center pt-3">
                  <h4>
                    {profile.user.name}
                  </h4>
                  <small className="pl-3">aka {profile.handle}</small>
                </div>
                  
                <hr style={{color:"white", backgroundColor:"white", width:"60%" }} />

                <div className="card-body">
                  {profile.bio && (<blockquote className="blockquote text-center mb-0">{profile.bio}</blockquote>)}
                </div>
                
                <hr style={{color:"white", backgroundColor:"white", width:"60%" }} />

                <div className="card-body d-flex flex-wrap justify-content-center align-items-center">
                  {interests}
                </div>

                <div className="btn-toolbar justify-content-center">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayFollowings: !prevState.displayFollowings
                      }));
                    }}
                    className="btn btn-dark mx-3"
                  ><i className="fa fa-heart pr-2" style={{color:"red"}}></i>
                    Following{'\u00A0'}{'\u00A0'}
                    <span className="badge badge-light mx-1">{profile.followings.length}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayFollowers: !prevState.displayFollowers
                      }));
                    }}
                    className="btn btn-dark mx-3"
                  ><i className="fa fa-heart pr-2" style={{color:"red"}}></i>
                    Followers{'\u00A0'}{'\u00A0'}
                    <span className="badge badge-light mx-1">{profile.followers.length}</span>
                  </button>
                </div>
              </div>               
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          {profileContent}
        </div>
        {this.state.displayFollowings && 
          <ProfileFollowings followings = {profile.followings}/>}
        {this.state.displayFollowers && 
          <ProfileFollowers followers = {profile.followers}/>}
        <UserPosts />
      </div>
    )
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  addFollowing: PropTypes.func.isRequired,
  removeFollowing: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect (mapStateToProps, { getProfileByHandle, getAllProfiles, addFollowing, removeFollowing })(withRouter(Profile));
