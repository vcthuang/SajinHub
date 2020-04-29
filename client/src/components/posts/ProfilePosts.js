// Current user's posts
// This is to be displayed under user profile

import React, { Component } from 'react';
import ProfilePostsFeed from './ProfilePostsFeed';
import PropTypes from 'prop-types';

class ProfilePosts extends Component {

  render() {     
    return (     
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <div className="row">
              <ProfilePostsFeed posts={this.props.posts} />
            </div>
          </div>
        </div>
      </div>
    )
  }
} 

UserPosts.propTypes = {
  posts: PropTypes.array.isRequired,
}

export default ProfilePosts;
