// Each Post 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropType from 'prop-types';
import { likePost, deletePost } from '../../actions/postActions';

class PostItem extends Component {

  onClickLike(postId) {
    // send data to Redux Action
    this.props.likePost(postId)
  }

  // check if user has already liked the post or not
  checkUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onClickDelete(postId) {
    // send data to Redux Action
    this.props.deletePost(postId)
  }

  render() {

    const { post, showDetails, auth } = this.props;

    return (
      <div className="card border-secondary mb-4 rounded-0">

        {/* Header */}
        <div className="card-header bg-light rounded-0">           
          <div className="container">
            <div className="row" style={{ marginRight: '10px' }}>
              <div className="col-11 d-flex">

                {/* user's avatar */}
                <Link to={{ pathname: `/profile/user/${post.user}` }}>
                  <img
                    className="rounded-circle d-none d-md-block"
                    height="33"
                    width="33"
                    src={post.avatar}
                    alt="" />
                </Link>

                {/* user's name */}
                <p style={{ fontSize: '20px', fontWeight: '500', marginLeft: '17px'}}>{post.name}</p>
              </div>

              {/* authorized users can delete their posts */}
              <div className="col-1">
                { post.user === auth.user.id ? (
                    <div>
                      <button
                        onClick={this.onClickDelete.bind(this, post._id)}
                        type="button"
                        className="btn-small btn-danger"
                        style={{ marginTop: '-5px' }}
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                ) : null }
              </div>
            </div>
          </div>
        </div>
        
        {/* Body */}

        {/* image section */}
        <img 
        src={post.image} 
        className="d-block"
        height="500px" 
        style={{ marginTop: '-20px' }}
        alt="" />

        <div className="card-body">

          {/* showDetails include: Like button, Like Status, 2 Comments, Comment Status */}
          { showDetails ? (
            <div>
              {/* Like button */}
              <button
                type="button"
                className="btn"
                style={{ outline: 'none', display: 'block', marginLeft: '-10px', marginTop: '-20px' }}
                onClick={this.onClickLike.bind(this, post._id)}
              >
                <i className={this.checkUserLike(post.likes) ? "fas fa-heart && text-danger && fa-lg" : "far fa-heart && fa-lg"} />
              </button>

              {/* like status(counts) */}
              <small style={{ marginTop: '-20px' }}>
                { post.likes.length > 0 ? (
                  <small>
                    <small style={{ fontSize: '17px' }}>Liked by {' '}</small>
                    <small style={{ fontSize: '17px', fontWeight: 'bold' }}>{post.likes.slice(-1)[0].name}{' '}</small>
                  </small>
                ) : null }

                { post.likes.length > 1 ? ( 
                  <small>
                    <small style={{ fontSize: '17px' }}>and{' '}</small>
                    <small style={{ fontSize: '18px', fontWeight: 'bold' }}>{post.likes.length}</small>
                    <small style={{ fontSize: '17px' }}>{' '}others</small>
                  </small>
                ) : null}
              </small>
              
              {/* text section */}
              <p className="card-text" style={{ fontSize: '23px' }}>{post.text}</p> 

              { post.comments.length > 0 ? (

                <div style={{ fontSize: '17px', marginTop: '-20px'}}>
                  <div className="d-flex justify-content">

                    {/* display FIRST commentor's avatar & name & comment */} 

                    {/* commentor's avatar  */}
                    <Link to={{ pathname: `/profile/user/${post.comments.slice(-1)[0].user}` }}>
                      <img
                        className="rounded-circle d-none d-md-block"
                        style={{ marginTop: '15px', marginLeft: '10px' }}
                        height="20"
                        width="20"
                        src={post.comments.slice(-1)[0].avatar}
                        alt="" />
                    </Link>

                    {/* commentor's name  */}
                    <p style={{ fontWeight: 'bold', marginLeft: '10px', marginTop: '12px' }}>{post.comments.slice(-1)[0].name}</p>

                    {/* commentor's comment */}
                    <p style={{ marginLeft: '10px', marginTop: '12px' }}>{post.comments.slice(-1)[0].text}</p>

                    {/* timestamp */}
                    &nbsp;&nbsp;&nbsp;
                    <Moment
                      fromNow
                      date={post.comments.slice(-1)[0].date}
                      style={{ fontSize: '12px', marginLeft: '10px', marginTop:  '17px' }}>
                    </Moment>
                  </div>

                 
                  { post.comments.length > 1 ? (
                  <div className="d-flex justify-content" style={{ marginTop: '-25px' }}>
                    
                    {/* display SECOND commentor's avatar & name & comment */}

                    {/* commentor's avatar  */}
                    <Link to={{ pathname: `/profile/user/${post.comments.slice(-2)[0].user}` }}>
                    <img
                      className="rounded-circle d-none d-md-block"
                      style={{ marginTop: '15px', marginLeft: '10px' }}
                      height="20"
                      width="20"
                      src={post.comments.slice(-2)[0].avatar}
                      alt="" />
                    </Link>

                    {/* commentor's name  */}
                    <p style={{ fontWeight: 'bold', marginLeft: '10px', marginTop: '12px' }}>{post.comments.slice(-2)[0].name}</p>

                    {/* commentor's comment */}
                    <p style={{ marginLeft: '10px', marginTop: '12px' }}>{post.comments.slice(-2)[0].text}</p>

                    {/* timestamp */}
                    &nbsp;&nbsp;&nbsp;
                    <Moment
                      fromNow
                      date={post.comments.slice(-2)[0].date}
                        style={{ fontSize: '12px', marginLeft: '10px', marginTop: '17px' }}>
                    </Moment>
                  </div>
                  ) : null }


                {/* comment status(counts) */}
                <div>
                  {post.comments.length > 2 ? 
                  <Link
                    to={{ pathname: `/posts/${post._id}` }}
                    style={{ color: 'grey', textDecoration: 'none' }}>
                    View all&nbsp;
                    <small style={{ fontSize: '16px', fontWeight: 'bold' }}> {post.comments.length}
                    </small>
                    &nbsp;&nbsp;comments
                    <br />
                  </Link> : null }
                </div>
              </div>
              ) : null }

              {/* timestamp */}
              <Moment
                fromNow
                date={post.date}
                style={{ fontSize: '15.5px' }}>
              </Moment>
              <hr/>

              {/* link to comment section */}
              <div>
                <Link
                  to={{ pathname: `/posts/${post._id}` }}
                  style={{ color: '#1a1a1e', textDecoration: 'none' }}>
                  Leave comments
                </Link>
              </div>
            </div>   
          ) : null }
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showDetails: true
}

PostItem.propTypes = {
  auth: PropType.object.isRequired,
  likePost: PropType.func.isRequired,
  deletePost: PropType.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { likePost, deletePost })(PostItem);
