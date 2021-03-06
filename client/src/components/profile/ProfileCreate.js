import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux libraries
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux action
import { updateProfile } from '../../actions/profileActions';

import InputField from '../common/InputField';
import TextAreaField from '../common/TextAreaField';


// ProfileCreate is a subset of ProfileUpdate.
// The only difference is that this component does not attempt
// to reach React store for profile information when it starts

class ProfileCreate extends Component {
  constructor (props) {
    super (props);
    this.state = {
      handle: '',
      bio: '',
      website: '',
      city: '',
      country: '',     
      interests: '',
      joinDate: Date.now,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  // Update errors
  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  };

  // Subscribring to changes in user input
  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  };

  // When user click on Save button
  onSave (e) {
    e.preventDefault();
    
    // Package up user inputs
    const profileData  = {
      handle: this.state.handle,
      bio: this.state.bio,
      website: this.state.website,
      city: this.state.city,
      country: this.state.country,
      interests: this.state.interests,
    };

    // Fire Redux action and amd make API call
    this.props.updateProfile (profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    
    return (
      <div className="profileUpdate">
        <div className="container">
          <div className= "row">
            {/* Display user and avatar */}
            <div className= "col-md-7 card bg-dark text-white">
              <h5 className="card-header">More about 
                <img 
                src= {user.avatar} 
                alt= ""
                className = "rounded-circle mx-3"
                style = {{width:'25px'}}
                />
                {user.name}...
              </h5>
              
              {/* Form asked for: handle, bio, website, location and interests */}
              <form className="card-body" onSubmit={this.onSave}>
                <InputField
                  placeholder="Profile Handle (required)"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Handle: Should be unique like you!"
                />
                <TextAreaField
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="bio: Let's construct an essay!"
                />
                <InputField
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Website: One more place to share your ideas."
                />
                <InputField
                  placeholder="Interests"
                  name="interests"
                  value={this.state.interests}
                  onChange={this.onChange}
                  error={errors.interests}
                  info="Interests: Please use comma separated values (eg. landscape,people,food)."
                />
                <InputField
                  placeholder="City"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  info="City: Mind your spelling... "
                />
                <InputField
                  placeholder="Country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                  info="Country: Let me guess... USA?"
                />
                <div className="text-right">         
                  <Link className = "btn btn-dark mx-4" to = '/profile/'>
                    <i className="fas fa-times-circle pr-2" title = "Cancel"></i>
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    value="Save"
                    className="btn btn-dark mx-4">
                    <i className="fas fa-save pr-2" style={{color:"red"}} title="Save"/>
                    Save
                  </button>
                </div>
              </form>
            </div>
            {/* Place a picture on the right */}
            <div className = "col-md-4 m-auto">
              {/* hide picture when device is smaller than md */}
              <div className = "profile-image d-none d-md-block rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileCreate.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect (mapStateToProps, { updateProfile })(withRouter(ProfileCreate));
