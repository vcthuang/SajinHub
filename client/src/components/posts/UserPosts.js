// Current user's posts
// This is to be displayed under user profile

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';

class UserPosts extends Component {

  componentDidMount() {
    
  }

  componentDidUpdate = (prevProps) => {
    
  };

  render() {
      
    let postContent;

    postContent = (
      <div className="card-body justify-content-center">
        <h5 className="card-header">
        <i className="fas fa-edit pr-2" style={{color:"red"}}></i>
          Recent Posts
        </h5>
        <PostFeed posts={this.props.posts} />
      </div>
    );
  
    return (     
      
        <div className="card col-sm-12">
          { postContent }
        </div>
      
    )
  }
}

export default UserPosts;
