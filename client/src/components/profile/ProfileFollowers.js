import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux libraries
import isEmpty from '../../validations/isEmpty';

// ProfileFollowers list all the followers by handle and avatar
class ProfileFollowers extends Component {

  render() {
    let followers;
    if ( isEmpty(this.props.followers)) {
      followers = (
        <div className="card">
          <div className="card-body">
            There are no followers dear.  Please go and make some friends!
          </div>
        </div>
      );
    } else {
      followers = this.props.followers.map(profile => (
        <RenderUser key={profile._id} profile={profile} />
      ));
    }
  
    return (
      <div className="card">
        <h5 className="card-header">
          <i className="fa fa-heart pr-2" style={{color:"red"}}></i>
            Followers
        </h5>
        <div className="card-group">
          {followers}
        </div>
      </div>
    )
  }
}

class RenderUser extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card border-0 text-center col-md-2">
        <div className="card-body bg-light"> 
          <h5 className="card-title">{profile.name}</h5>
          <Link to={`/profile/user/${profile.user._id}`} >
            <img src={profile.avatar}
              alt=""
              style = {{width:'50px'}}
              className="rounded-circle img-fluid" />
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileFollowers);
