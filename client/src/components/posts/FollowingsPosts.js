import React, { Component } from 'react';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import isEmpty from '../../validations/isEmpty';


class FollowingsPosts extends Component {

  componentDidMount() {
    if (this.props.profile.userProfile === null)
      this.props.getCurrentProfile();
  }

  render() {
    const profile = this.props.profile.userProfile;
    const { loading } = this.props.profile;
    const { posts } = this.props.post;
    
    let followingsPosts;
    let followingsPostsURL;


    if (profile === null || loading) {
      followingsPostsURL = <Spinner />
    } else {
      if (!isEmpty(profile)) {
        if (profile.followings.length > 0 ) {

          followingsPosts = posts.filter(post => 
            profile.followings.map(following => following.user).indexOf(post.user) >= 0);
          followingsPostsURL =  (
            <PostFeed posts={followingsPosts} />
          );
        } else {
          followingsPostsURL = <h4>You are not following any of our awesome photographers!</h4>
        }
      } else {
        followingsPostsURL = <h4>Please set up your profile first!</h4>
      }
    }

    return (
      <div className="friendsPost">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-7 col-xl-6 align-self-center">
              <br/>
              {followingsPostsURL}
            </div>
          </div>
        </div>
      </div>
    )
  }
}





FollowingsPosts.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post
});

export default connect (mapStateToProps, {getCurrentProfile})(FollowingsPosts);