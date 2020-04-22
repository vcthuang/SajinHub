import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../validations/isEmpty';

// ProfileFollowers list all the followers by handle and avatar
class ProfileFollowings extends Component {
  render() {
    let followings;
    if ( isEmpty(this.props.followings)) {
      followings = (
        <div className="card-body">
            There are no followings dear.  Please add some from our awesome pool of photographers!
        </div>
      );
    } else {
      followings = this.props.followings.map(following => (
        <div className="card border-0 text-center col-md-2">
          <div className="card-body bg-light"> 
            <h5 className="card-title">{following.name}</h5>
            <Link to={`/profile/user/${following.user}`} >
              <img src={following.avatar}
                alt=""
                style = {{width:'50px'}}
                className="rounded-circle img-fluid" />
            </Link>
          </div>
        </div>
      ));
    }
  
    return (
      <div className="card">
        <h5 className="card-header">
          <i className="fa fa-heart pr-2" style={{color:"red"}}></i>
            Followings
        </h5>
        <div className="card-group">
          {followings}
        </div>
      </div>
    )
  }
}

ProfileFollowings.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect (mapStateToProps, getProfileByHandle )(withRouter(ProfileFollowings));