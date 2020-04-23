// Each Reply

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTyeps from 'prop-types';

import { deleteReply } from '../../actions/postActions';

class ReplyItem extends Component {

  onClickDelete(postId, commentId, replyId) {
    // send data to Redux Action 
    this.props.deleteReply(postId, commentId, replyId)
  }

  render() {

    const { postId, commentId, reply, auth } = this.props;

    return (

      <div className="d-flex justify-content" style={{ marginTop: '-20px' }}>
        
        {/* replier's avatar */}
        <Link to="/profile">
          <img
            className="rounded-circle d-none d-md-block"
            style={{ marginTop: '13px', marginLeft: '10px' }}
            height="30"
            width="30"
            src={reply.avatar}
            alt="Avatar not found" 
          />
        </Link>

        {/* replier's name */}
        <p style={{ fontWeight: 'bold', marginLeft: '10px', marginTop: '12px' }}>{reply.name}</p>

        {/* replier's text */}
        <p style={{ marginLeft: '10px', marginTop: '12px' }}>{reply.text}</p>

        {/* authorized replier can delete their replies */}
        {reply.user === auth.user.id ? (
          <button
            onClick={this.onClickDelete.bind(this, postId, commentId, reply._id)}
            type="button"
            className="btn"
            style={{ color: 'red', marginBottom: '5px' }}
          >
            <i className="far fa-times-circle" />
          </button>
        ) : null}
      </div>
    )
  }
}

ReplyItem.propTypes = {
  auth: PropTyeps.object.isRequired,
  postId: PropTyeps.string.isRequired,
  commentId: PropTyeps.string.isRequired,
  reply: PropTyeps.object.isRequired,
  deleteReply: PropTyeps.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteReply })(ReplyItem)
