// Map Each Comment

import React, { Component } from 'react';
import PropType from 'prop-types';
import CommentItem from './CommentItem';

export default class CommentFeed extends Component {

  render() {
    const { post, postId, comments } = this.props;

    return (
      comments.map(comment => (
        <p className="card-text">{post.text}</p> &&
        <CommentItem key={comment._id} post={post} postId={postId} comment={comment} />
      ))
    )
  }
}

CommentFeed.propTypes = {
  post: PropType.object.isRequired,
  postId: PropType.string.isRequired,
  comments: PropType.array.isRequired,
}
