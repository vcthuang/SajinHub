import React, { Component } from 'react';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostFeed from './PostFeed';

import { getUserPosts } from '../../actions/postActions'
import Spinner from '../common/Spinner';

class FollowingPost extends Component {

  componentDidMount() {
    if (this.props.userid)
    this.props.getUserPosts(this.props.userid);
  };

  render() {

    const { userposts, loading } = this.props.post;
 
    let postContent;

    if (loading || userposts === []) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
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

FollowingPost.propTypes = {
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getUserPosts })(FollowingPost);
