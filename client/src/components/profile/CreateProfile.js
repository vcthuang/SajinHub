import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux action
import { getCurrentProfile } from '../../actions/profileActions';

import Spinner from '../common/Spinner';
import InputField from '../common/InputField';

class CreateProfile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      editButtonClicked: true,
      handle: '',
      bio: '',
      website: '',
      city: '',
      country: '',
      interest: '',
      joinDate: Date.now,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    // if the user is in his or her own profile
    // userEdit = true
    this.props.getCurrnetProfile();
    
    // if the user is in other user's profile
    // this.props.getProfilebyHandle
    // userEdit = false
  } 
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.profile) {
      // place user info on the screen
      this.setState({
        bio: nextProps.bio,
        website: nextProps.website,
        city: nextProps.city,
        country: nextProps.country,
        interest: nextProps.interest,
        joinDate: nextProps.joinDate
      })
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSave (e) {
    e.preventDefault();

    const profileData  = {
      handle: '',
      bio: '',
      website: '',
      city: '',
      country: '',
      interest: '',  
    };

    this.props.createProfile (profileData, this.props.history);
  };

  onCancel (e) {
    this.setState({
      bio: this.props.bio,
      website: this.props.website,
      city: this.props.city,
      country: this.props.country,
      interest: this.props.interest,
      joinDate: this.props.joinDate
    })
  };

  render() {
    const {errors} = this.state;
    const { profile, loading } = this.props.profile;
    let editButtonClicked = true;
    let topRightbuttons;
    let profileContent;
    const firstName = profile.handle;

    // if current user is viewing it's profile, 
    //   then there should be "edit" button
    //     if "edit" button is clicked
    //       then there should be "save" and "cancel" buttons
    //   else
    //     there should be "follow" button
    if (editButtonClicked) {
      topRightbuttons = (
        <div>
          <input
            type="submit"
            value="Save"
            className="btn btn-info btn-block mt-4"
          />
          <input
            type="reset"
            value="Cancel"
            className="btn btn-info btn-block mt-4"
          />
        </div>
      )
    } else {
      topRightbuttons = 
        <input
          type="submit"
          value="Edit"
          className="btn btn-info btn-block mt-4"
        />
    }

    if (loading) {
      profileContent = <Spinner />
    } else if (profile === null) {
      profileContent = <p>Please update your profile</p>
    } else {
      profileContent = (
        <div className= "row">
          <div className= "col-md-12">
            <div className="card" style="width: 50rem;">
              <img className="card-img-top" 
                src={profile.user.avatar} 
                alt="" />
              <div className="card-body">
                <h5 className="card-title">{firstName}'s Profile</h5>
                <p className="card-text">Joined since {profile.joinDate}...</p>
              </div>

              <small className="d-block pb-3">* = required fields</small>
              <form className="card-body" onSubmit={this.onSave}>
                <input
                  type="submit"
                  value="Save"
                  className="btn btn-info btn-block mt-4"
                />
                <InputField
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <InputField
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website"
                />
                <InputField
                  placeholder="Interest"
                  name="interest"
                  value={this.state.interest}
                  onChange={this.onChange}
                  error={errors.interest}
                  info="Please use comma separated values (eg.
                    black and white,landscape,people,food"
                />
                <InputField
                  placeholder="City"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  info="City (eg. Boston)"
                />
                <InputField
                  placeholder="Country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                  info="Country (eg. USA)"
                />
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          {profileContent}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect (mapStateToProps, { getCurrentProfile })(withRouter(CreateProfile));
