// Each Comment

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTyeps from 'prop-types';

import ReplyFeed from './ReplyFeed';

import { addReply, deleteComment } from '../../actions/postActions';

class CommentItem extends Component {

  constructor() {
    super();
    this.state = {
      text: '',
      disabled: true
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(postId, commentId) {

    const newReply = {
      text: this.state.text
    }

    // send data to Redux Action
    this.props.addReply(postId, commentId, newReply);
  }

  // authorized commentors can delete their comments
  onClickDelete(postId, commentId) {
    this.props.deleteComment(postId, commentId)
  }

  render() {

    const { comment, postId, auth, errors } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content" style={{ marginTop: '-5px', marginBottom: '-25px' }}>
           
            {/* commentor's avatar */}
            <Link to={{ pathname: `/profile/user/${comment.user}` }}>
              <img
                className="rounded-circle d-none d-md-block"
                style={{ marginTop: '13px', marginLeft: '10px' }}
                height="30"
                width="30"
                src={comment.avatar}
                alt="" 
                />
            </Link>

            {/* commentor's name */}
            <p style={{ fontWeight: 'bold', marginLeft: '10px', marginTop: '12px' }}>{comment.name}</p>

            {/* commentor's text */}
            <p style={{ marginLeft: '10px', marginTop: '12px' }}>{comment.text}</p>
          
            {/* reply to the comment (using bootstrap modal) */}
            <button type="button" className="btn" data-toggle="modal" data-target="#reply" style={{ fontSize: '15px', color: 'grey', fontWeight: '700', border: 'none', marginTop: '-8px', marginLeft: '10px' }}>
              Reply
            </button>

            <div className="modal fade" id="reply" tabIndex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                    style={{ marginLeft: '440px', marginTop: '5px' }}>
                    <span aria-hidden="true">&times;</span>
                  </button>

                  <div className="modal-body">
                    <form onSubmit={this.onSubmit.bind(this, postId, comment._id)}>
                      <div class="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Reply to comment..."
                          value={this.state.text}
                          onChange={this.onChange}
                          name="text"
                          error={errors.text}
                        />
                        <div class="input-group-append">
                          <button
                            className="btn btn-secondary"
                            type="submit"
                            disabled={this.state.text.length > 3 ? false : true}>
                            Reply
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* authorized users can delete their comments */}
            { comment.user === auth.user.id ? (
              <button
                onClick={this.onClickDelete.bind(this, postId, comment._id)}
                type="button"
                className="btn"
                style={{color: 'red', marginBottom: '5px'}}
              >
                <i className="far fa-times-circle" />
              </button>
            ): null }
            </div>

            {/* showing replies to the comments */}
            { comment.replies.length > 0 ? (
            <div className="d-flex" style={{ marginTop: '30px', marginBottom: '-15px' }}>
               <i className="fas fa-lg fa-arrow-right" style={{ marginLeft: '60px'}}></i>
              <div >
                <ReplyFeed postId={postId} commentId={comment._id} replies={comment.replies} />
              </div>
            </div>
              ) : null }
        </div>
        <hr/>
      </div>
    )
  }
}

CommentItem.propTypes = {
  auth: PropTyeps.object.isRequired,
  comment: PropTyeps.object.isRequired,
  postId: PropTyeps.string.isRequired,
  errors: PropTyeps.object.isRequired,
  addReply: PropTyeps.func.isRequired,
  deleteComment: PropTyeps.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addReply, deleteComment })(CommentItem)
