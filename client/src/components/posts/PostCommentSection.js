import React, { Component } from 'react';
import Moment from 'react-moment';

import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';


export default class PostCommentSection extends Component {
  render() {

    const { post } = this.props;

    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="card border-0 shadow">

          <div className="row no-gutters">
            <div className="col-5">

              {/* image section */}
              <img src={post.image} alt="" style={{ maxWidth: 'auto', maxHeight: 'auto' }}
              className="img-fluid w-100 h-100" />
            </div>

            <div className="col-7">
              <div className="card-body">

                {/* text section */}
                <div className="">
                  <p className="card-text font-italic">{post.text}</p>
                </div>

                {/* timestamp */}
                <Moment
                  fromNow
                  date={post.date}
                  style={{ fontSize: '13px', marginTop: '6px'}}>
                </Moment>
                <br/>
                <br/>

                {/* comment form */}
                <CommentForm postId={post._id} />
              </div>

              {post.comments ?
                <CommentFeed comments={post.comments} postId={post._id} post={post} /> 
               : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
