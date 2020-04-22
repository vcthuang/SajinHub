import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux action
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

// UI displaycomponent
import ProfileFollowings from './ProfileFollowings';
import ProfileFollowers from './ProfileFollowers';

import Spinner from '../common/Spinner';
import isEmpty from '../../validations/isEmpty';

// ProfileHome is loaded when the user click on avatar on the navbar
// If the user has a profile, then
//   the information in profile is displayed
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

  // When the page is loading
  // Get profile from Redux store
  componentDidMount() {
    this.props.getCurrentProfile();   
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
    const { profile, loading } = this.props.profile;

    let profileContent;
    
    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0 ) {
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
              {/* Rightside contains: joined date, name, handle, bio, interests*/}
              <div className="col-sm-8 card bg-dark">  
                <div className="card-body text-white">
                  <div className="card-text text-right mb-3">
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
                      Followings
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
                      Followers
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
        </div>
        {this.state.displayFollowings && 
          <ProfileFollowings followings = {profile.followings}/>}
        {this.state.displayFollowers && 
          <ProfileFollowers followers = {profile.followers}/>}
      </div>
    )
  }
}

ProfileHome.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect (mapStateToProps, { getCurrentProfile, deleteAccount })(withRouter(ProfileHome));
