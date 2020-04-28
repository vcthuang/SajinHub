import React, { Component } from 'react';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentProfile } from '../../actions/profileActions';
import FollowingPosts from './FollowingPosts';
import Spinner from '../common/Spinner';

class FollowingsPosts extends Component {

  componentDidMount() {
    if (this.props.profile.userProfile === {})
      this.props.getCurrentProfile();
    
  }

  render() {
    const profile = this.props.profile.userProfile;
    const { loading } = this.props.profile;
    
    let followingsPosts;

    if (profile === null || loading) {
      followingsPosts = <Spinner />
    } else {
      if (profile.followings.length > 0 ) {
        followingsPosts = profile.followings.map (following => (
          <FollowingPosts key={following._id} userid={following.user} />
        ));
      } else {
        followingsPosts = <h4>You are not following any of our awesome photographers!</h4>
      }
    }

    return (
      <div className="friendsPost">
        <div className="container">
          <div className="row justify-content-between" style={{ marginTop: '25px' }}>
            <div className="col-12">
              {followingsPosts}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FollowingsPosts.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect (mapStateToProps, {getCurrentProfile})(FollowingsPosts);