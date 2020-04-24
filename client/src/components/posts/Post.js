// Each Post

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';

import { getPost } from '../../actions/postActions';

import PostItem from './PostItem';
import CommentFeed from './CommentFeed';

import Spinner from '../common/Spinner';

class Post extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }
  
  render() {

    const { post, loading } = this.props.post;

    let postContent;

    if (post === {} || loading) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          <PostItem post={post} showDetails={false} />
          {post.comments ? <CommentFeed comments={post.comments} postId={post._id} /> : null}
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-7 col-xl-6 align-self-center">
            { postContent }
          </div>
        </div>
        <br/>
        <Link
          to='/feed'
          style={{ fontSize: '19px', textDecoration: 'none' }}>
          <p style={{ textAlign: 'center' }}> >> Back to Feed</p>
        </Link>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropType.object.isRequired,
  getPost: PropType.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
