// Current user's posts
// This is to be displayed under user profile

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';

import { getUserPosts } from '../../actions/postActions'

class UserPosts extends Component {

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getUserPosts(this.props.match.params.id);
    }
  }

  render() {

    const { userposts, loading } = this.props.post;
 
    let postContent;

    if (loading || userposts === []) {
      postContent = <Spinner />

    } else {
      postContent = (
        <div className="card-body justify-content-center">
          <h5 className="card-header">
            <i className="fas fa-edit pr-2" style={{ color: "red" }}></i>
          Recent Posts
          </h5>
          <PostFeed posts={userposts} />
        </div>
      );
    }
  
    return (     
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-7 col-xl-6 align-self-center">
            <br />
            {postContent}
          </div>
        </div>
      </div>

    )
  }
} 

UserPosts.propTypes = {
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getUserPosts })(UserPosts);
