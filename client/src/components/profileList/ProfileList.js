import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getAllProfiles } from '../../actions/profileActions';

// ProfileList lists profiles for all the users
// For each user (details at ProfileItem.js):
//  1. user name
//  2. avatar
//  3. location
// these information is displayed.
// The user can click on avatar to view details

class ProfileList extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profileList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">At a glance...</h1>
              <p className="lead text-center">
                Here is the list of our awesome photographers
              </p>
              <div className="row">
                {profileItems}
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileList.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(ProfileList);
