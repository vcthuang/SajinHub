// Every Post (showing on the feed page)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';

import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';

class Posts extends Component {

  componentDidMount() {
    this.props.getAllPosts();
    this.props.getCurrentProfile();
  }

  render() {
    
    const { posts, loading } = this.props.post;

    let postContent;

    if (loading || posts === []) {
      postContent = <Spinner />
    } else {
      postContent = (
        <PostFeed posts={posts} />
      )
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-7 col-xl-6 align-self-center">
              <br/>
              { postContent }
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getAllPosts, getCurrentProfile })(Posts);
