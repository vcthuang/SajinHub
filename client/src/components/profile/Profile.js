import React, { Component } from 'react';
import Moment from 'react-moment';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux action
import { 
  getCurrentProfile, 
  getProfileByHandle, 
  addFollowing, 
  removeFollowing } from '../../actions/profileActions';
import { getAllPosts } from '../../actions/postActions';

// UI displaycomponent
import ProfileFollowings from './ProfileFollowings';
import ProfileFollowers from './ProfileFollowers';
import UserPosts from '../posts/UserPosts';

import Spinner from '../common/Spinner';
import isEmpty from '../../validations/isEmpty';

// Profile is loaded when the user click on avatar on profileList
// This means, there is not going to be a chance for user to
// to click on other user who doesn't have profile.
//
// All profile information is displayed.  The user can toggle
// following and follower buttons to view more information.
// However, browsing is limited until user is logged in.
// 
// The display is similar to that of ProfileHome and ProfileByID.

class Profile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      displayFollowings: false,
      displayFollowers: false
    }
  }

  // Get profile from Redux store when the component is loading
  componentDidMount() {

    // Get current user's profile
    if (isEmpty(this.props.profile.userProfile))
      this.props.getCurrentProfile();

    // Get profile of the avatar user clicked
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
     }

    // This could happen as posts is loaded when user logs in
    if (isEmpty(this.props.post.posts))
      this.props.getAllPosts();
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
    const { posts } = this.props.post;
    const { profile, loading, profiles } = this.props.profile;
    const { user, isAuthenticated } = this.props.auth;

    let profileContent;
    
    // If user has posts, it will be displayed
    let displayPosts = false;
    let userPosts= null;

    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      // posts
      userPosts = posts.filter (post => post.user === profile.user._id);
      if (!isEmpty(userPosts))
        displayPosts = true;

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
          // Display subscribe, unsubscribe or me button
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
            {/* Rightside contains joined date, name, handle, bio, interests, following & followers buttons*/}
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
          {this.state.displayFollowings && 
            <ProfileFollowings followings = {profile.followings}/>}
          {this.state.displayFollowers && 
            <ProfileFollowers followers = {profile.followers}/>}
          <div className="row">
          {displayPosts &&   
            <UserPosts posts = {userPosts}/>}
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  addFollowing: PropTypes.func.isRequired,
  removeFollowing: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});

export default connect (mapStateToProps, { getCurrentProfile, getProfileByHandle, addFollowing, removeFollowing, getAllPosts })(Profile);
