import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';

// Redux libraries
import isEmpty from '../../validations/isEmpty';

// ProfileFollowings list all the following by:
// 1. handle
// 2. avatar
// 3. beginDate

class ProfileFollowings extends Component {
  
  render() {
    let followings;
    if ( isEmpty(this.props.followings)) {
      followings = (
        <div className="card-body">
            There are no following...!
        </div>
      );
    } else {
      followings = this.props.followings.map(following => (
        <div key={following._id} className="card border-0 text-center col-md-2">
          <div className="card-body bg-light"> 
            <h5 className="card-title">{following.name}</h5>
            <Link to={`/profile/user/${following.user}`} >
              <img src={following.avatar}
                alt=""
                style = {{width:'50px'}}
                className="rounded-circle img-fluid" />
            </Link>
            <div>
              <small>since <Moment format="YYYY/MM/DD">{following.beginDate}</Moment></small>
            </div>
          </div>
        </div>
      ));
    }
  
    return (
      <div className="row">
        <div className="card col-sm-12">
          <h5 className="card-header">
            <i className="fa fa-heart pr-2" style={{color:"red"}}></i>
              Following
          </h5>
          <div className="card-group">
            {followings}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileFollowings);