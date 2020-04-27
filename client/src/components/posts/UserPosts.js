// Current user's posts
// This is to be displayed under user profile

import React, { Component } from 'react';
import PostFeed from './PostFeed';
import PropTypes from 'prop-types';

class UserPosts extends Component {

  render() {     
    return (     
      
        <div className="card ">
          <h5 className="card-header">      
            <i className="fas fa-edit pr-2" style={{ color: "red" }}></i>
              Recent Posts
            </h5>
            <div className="card-body justify-content-center">
              <PostFeed posts={this.props.posts} />
            </div>
        </div>
  
    )
  }
} 

UserPosts.propTypes = {
  post: PropTypes.object.isRequired,
}

export default UserPosts;
