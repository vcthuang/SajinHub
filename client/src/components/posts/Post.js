// Each Post

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

import { getPost } from '../../actions/postActions';

import Spinner from '../common/Spinner';
import PostCommentSection from './PostCommentSection';

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
        <div className="container">
          <div className="row justify-content-between" style={{ marginTop: '25px' }}>
            <div className="col-12">
              <PostCommentSection post={post} />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="container">
        { postContent }
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
