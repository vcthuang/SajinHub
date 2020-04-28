// Current user's posts
// This is to be displayed under user profile

import React, { Component } from 'react';
import PostFeed from './PostFeed';
import PropTypes from 'prop-types';

class ProfilePosts extends Component {

  render() {     
    return (     
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-7 col-xl-6 align-self-center">
            <br />
            <PostFeed posts={this.props.posts} />
          </div>
        </div>
      </div>
    )
  }
} 

ProfilePosts.propTypes = {
  post: PropTypes.object.isRequired,
}

export default ProfilePosts;
