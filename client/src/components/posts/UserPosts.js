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
    if ((this.props.post.posts).length === 0)
      this.props.getAllPosts();
  }

  componentDidUpdate = (prevProps) => {
    
  };

  render() {
    
    const { posts, loading } = this.props.post;
    //const { profile } = this.props;

    let userPosts;
    if (this.props.userid) {
      userPosts = posts.filter (post => post.user === this.props.userid);
    } 
    
    let postContent;

    if (loading || userPosts === []) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div className="card-body justify-content-center">
          <h5 className="card-header">
          <i className="fas fa-edit pr-2" style={{color:"red"}}></i>
            Recent Posts
          </h5>
          <PostFeed posts={userPosts} />
        </div>
      );
    }

    return (     
      
        <div className="card col-sm-12">
          { postContent }
        </div>
      
    )
  }
}

UserPosts.propTypes = {
  post: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired,
  //profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
  //profile: state.profile
});

export default connect(mapStateToProps, { getAllPosts })(UserPosts);
