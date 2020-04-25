// Each Comment

import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTyeps from 'prop-types';
import TextField from '@material-ui/core/TextField';

import ReplyFeed from './ReplyFeed';

import { addReply, deleteComment } from '../../actions/postActions';

class CommentItem extends Component {

  constructor() {
    super();
    this.state = {
      text: '',
      disabled: true,
      reply: false
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

  // toggle reply button
  onClickReply = () => {
    this.setState(prevState => ({
      reply: !prevState.reply
    }))
  }

  render() {

    const { comment, postId, auth, errors } = this.props;

    return (
      <div className="mb-3">
        <div className="">
          <hr/>
          <div className="d-flex justify-content" style={{ marginBottom: '-20px', marginLeft: '18px' }}>
           
            {/* commentor's avatar */}
            <Link to={{ pathname: `/profile/user/${comment.user}` }}>
              <img
                className="rounded-circle d-none d-md-block"
                style={{ marginTop: '15px', marginLeft: '5px' }}
                height="25"
                width="25"
                src={comment.avatar}
                alt="" 
                />
            </Link>

            {/* commentor's name */}
            <p style={{ fontSize: '20px',fontWeight: 'bold', marginLeft: '10px', marginTop: '12px' }}>{comment.name}</p>

            {/* commentor's text */}
            <p style={{ fontSize: '20px', marginLeft: '10px', marginTop: '12px' }}>{comment.text}</p>

            {/* timestamp */}
            <Moment
              fromNow
              date={comment.date}
              style={{ fontSize: '12px', marginLeft: '10px', marginTop: '20px' }}>
            </Moment>
          
            {/* reply button */}
            <button 
            onClick={this.onClickReply}
            type="button"
            className="btn"
            style={{ fontSize: '17px', color: 'grey', marginBottom: '4px' }}
            >
              <i className="far fa-comment-dots" />
            </button>

            {/* authorized users can delete their comments */}
            { comment.user === auth.user.id ? (
              <button
                onClick={this.onClickDelete.bind(this, postId, comment._id)}
                type="button"
                className="btn"
                style={{ fontSize: '17px', color: 'red', marginBottom: '4px', padding: 0}}
              >
                <i className="far fa-times-circle" />
              </button>
            ): null }
          </div>
        </div>

        {/* reply to the comment */}
        { this.state.reply ? (
          <div style={{ marginLeft: '22px' }}>
            <br/>
            <form onSubmit={this.onSubmit.bind(this, postId, comment._id)}>
              <div className="input-group mb-3">
                <TextField
                  type="text"
                  className="textfield form-control"
                  placeholder="Reply to comment..."
                  value={this.state.text}
                  onChange={this.onChange}
                  name="text"
                  error={errors.text}
                />
                <div className="input-group-append">
                  <button
                    className="btn"
                    type="submit"
                    disabled={this.state.text.length > 3 ? false : true}>
                    Reply
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}

        {/* showing replies to the comments */}
        { comment.replies.length > 0 ? (
          <div className="d-flex" style={{ marginTop: '30px', marginBottom: '-15px' }}>
            <div >
              <ReplyFeed postId={postId} commentId={comment._id} replies={comment.replies} />
            </div>
          </div>
        ) : null }
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
