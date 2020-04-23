// Map Each Reply

import React, { Component } from 'react';
import PropType from 'prop-types';
import ReplyItem from './ReplyItem'

export default class ReplyFeed extends Component {

  render() {
    const { postId, commentId, replies } = this.props;

    return (
      replies.map(reply => (
        <ReplyItem key={reply._id} reply={reply} postId={postId} commentId={commentId}/>
      ))
    )
  }
}

ReplyFeed.propTypes = {
  replies: PropType.array.isRequired,
  postId: PropType.string.isRequired,
  commentId: PropType.string.isRequired
}
