import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux action
import { getCurrentProfile, getProfileByID, deleteAccount } from '../../actions/profileActions';
import { getUserPosts } from '../../actions/postActions';

// UI displaycomponent
import ProfileFollowings from './ProfileFollowings';
import ProfileFollowers from './ProfileFollowers';
import UserPosts from '../posts/UserPosts';

import Spinner from '../common/Spinner';
import isEmpty from '../../validations/isEmpty';


// ProfileHome is loaded when the user click on avatar on the navbar
// If the user has a profile, then
//   the information in profile plus posts are displayed
// else 
//   the user is asked to create a profile
//
// The user can also delete the account from this component

class ProfileHome extends Component {
  constructor (props) {
    super (props);
    this.state = {
      displayFollowings: false,
      displayFollowers: false,
    }
  }

  componentDidMount() {
    // Get current user's profile
    if (isEmpty(this.props.profile.userProfile))
      this.props.getCurrentProfile();
    
    // Set Redux store - profile->profile to user's profile
    this.props.getProfileByID(this.props.auth.user.id);
    
    // Get current user's latest posts
    this.props.getUserPosts(this.props.auth.user.id);
  }

  // When Delete button is click on Profile
  // Call redux action - deleteAccount
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
    
  // When create button is click on Profile
  // direct user to profileUpdate
  onUpdateClick (e) {
    this.props.history.push('/profile-update');
  }

  render() {
    const { user } = this.props.auth;
    const profile = this.props.profile.userProfile;
    const { loading } = this.props.profile;
    const { posts } = this.props.post;
    //const { userposts } = this.props.post;

    let profileContent;

    // If user has posts, it will be displayed
    let displayPosts = false;
    let userPosts = null;
    
    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0 ) {
        
        userPosts = posts.filter (post => post.user === profile.user._id);
        if (!isEmpty(userPosts))
          displayPosts = true;

        // location
        const location = isEmpty(profile.location) ? 
          null : 
          (<span>{profile.location.city} {profile.location.country}</span>);

        // Interests
        const interests = profile.interests.map((interest, index) => (
          <div key={index} className="p-3">
            <i className="fas fa-camera" /> {interest}
          </div>
        ));
 
        profileContent = (
          <div>
            <div className="row">
              {/* Leftside contains: avatar, location, website */}
              {/* Delete account and update profile buttons    */}
              <div className="col-sm-4 card">
                <div className="card-body text-center">
                  <img 
                    className="rounded-circle img-fluid mb-4" 
                    alt=""
                    src={user.avatar} />
                  <p className="card-text text-muted">
                    {location}
                  </p>
                  {profile.website && (<a className="card-text" href={profile.website} target="_blank">{profile.website}</a>)}
                  <div className="row card-body justify-content-center pt-5">
                    <button
                      onClick= {this.onDeleteClick.bind(this)}
                      className= "btn btn-dark mr-5">
                      <i className="fas fa-user-minus " title="Delete" />
                    </button>
                    <button
                      onClick= {this.onUpdateClick.bind(this)}
                      className= "btn btn-dark">
                      <i className="fas fa-user-edit" title="Update" />           
                    </button>
                  </div>
                </div>
              </div>
              {/* Rightside contains: joined date, name, handle, bio, interests, following & followers buttons*/}
              <div className="col-sm-8 card bg-dark">  
                <div className="card-body text-white">
                  <div className="card-text mb-3">
                    <small className="card-text">Royal member since&nbsp;
                      <Moment format="YYYY/MM/DD">{profile.joinDate}</Moment>
                    </small>
                  </div>
                  
                  <div className="card-title d-flex flex-wrap justify-content-center align-items-center">
                    <h4>{user.name}</h4>
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
                      <span className="badge badge-light mx-1 ">{profile.followings.length}</span>
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
      } else {
         // User is logged in but has no profile
         profileContent = (
          <div>
            <div className="row">
              <div className="col-sm-4 card">
                <div className="card-body text-center">
                  <img 
                    className="rounded-circle img-fluid mb-4"
                    alt=""
                    src={user.avatar} />
                </div>
              </div>
                        
              <div className="col-sm-8 card bg-dark text-white">
                <div className="card-header">
                  Dear {user.name}, 
                </div>
                <div className="card-body mb-5">
                  Please take a moment to setup a profile...
                </div>
                <div className="card-body text-right">
                  <Link to= '/profile-create' className= "btn btn-dark">
                    <i className= "fas fa-user-edit pr-2" />
                    Create
                  </Link>
                </div>  
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="profileHome">
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

ProfileHome.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileByID: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect (mapStateToProps, { getCurrentProfile, getProfileByID, deleteAccount, getUserPosts })(ProfileHome);
