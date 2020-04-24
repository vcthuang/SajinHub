// Current user's posts
// This is to be displayed under user profile

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/postActions';

import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';

class UserPosts extends Component {

  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    
    const { posts, loading } = this.props.post;
    const { profile } = this.props.profile;

    let userPosts = posts.filter (post => post.user === profile.user._id);
    
    let postContent;

    if (loading || userPosts === []) {
      postContent = <Spinner />
    } else {
      postContent = (
        <PostFeed posts={userPosts} />
      )
    }

    return (
      
      <div className="card">
        <h5 className="card-header">
          <i className="fas fa-edit pr-2" style={{color:"red"}}></i>
            Recent Posts
        </h5>
        <div className="row card-body justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-7 col-xl-6 align-self-center">
              <br/>
              { postContent }
          </div>
        </div>
      </div>
      
    )
  }
}

UserPosts.propTypes = {
  post: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
});

export default connect(mapStateToProps, { getAllPosts })(UserPosts);
