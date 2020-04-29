// Map Each User's Post

import React, { Component } from 'react';
import PropType from 'prop-types';
import PostItem from './PostItem';

export default class ProfilePostsFeed extends Component {
  render() {

    const { posts } = this.props;

    return (
      posts.map(post => (
        <div key={post._id} className="col-sm-12 col-md-6"><PostItem key={post._id} post={post} /></div>
      ))
    )
  }
}

ProfilePostsFeed.propTypes = {
  posts: PropType.array.isRequired
}


