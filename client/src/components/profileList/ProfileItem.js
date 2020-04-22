import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validations/isEmpty';

//  ProfileItem gets profile from Redux Store and display:
//  1. user name
//  2. avatar
//  3. location

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="col-sm-4">
        <div className="card text-center mb-3">
          <h5 className="card-header">{profile.user.name}</h5>
          <div className="card-body bg-light"> 
            <Link to={`/profile/${profile.handle}`} >
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
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
