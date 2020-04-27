// Current user's posts
// This is to be displayed under user profile

import React, { Component } from 'react';

import PostFeed from './PostFeed';

class UserPosts extends Component {

  render() {
          
    return (     
      <div className="row">
        <div className="card col-sm-12">
          <h5 className="card-header">
            <i className="fas fa-edit pr-2" style={{color:"red"}}></i>
            Recent Posts
          </h5>
          <div>
            <PostFeed posts={this.props.posts} />
          </div>
        </div>
      </div>
    )
  }
}

export default UserPosts;
