// Map Each Post

import React, { Component } from 'react';
import PropType from 'prop-types';
import PostItem from './PostItem';

export default class PostFeed extends Component {
  render() {

    const { posts } = this.props;

    return (
      posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))
    )
  }
}

PostFeed.propTypes = {
  posts: PropType.array.isRequired
}


