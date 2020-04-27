import React, { Component } from 'react';
// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { getProfileByID } from '../../actions/profileActions';
import isEmpty from '../../validations/isEmpty';


//  ProfileItem gets profile from Redux Store and display:
//  1. user name
//  2. avatar
//  3. location

class ProfileItem extends Component {
  onClick() {
    this.props.getProfileByID(this.props.profile.user._id);
  }

  render() {
    const { profile } = this.props;

    return (
      // Each card contains user handle, avatar and location
      <div className="col-sm-4">
        <div className="card text-center mb-3">
          <h5 className="card-header">{profile.user.name}</h5>
          <div className="card-body bg-light"> 
            <Link to={`/profile/${profile.handle}`} 
              onClick={this.onClick.bind(this)} > 
              
              <img src={profile.user.avatar}
                alt=""
                className="rounded-circle img-fluid" />
            </Link>
          </div>
          <div className="card-footer text-muted">
            {isEmpty(profile.location) ? null : (
              <span>{profile.location.city} {profile.location.country}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(null, {getProfileByID})(ProfileItem);
