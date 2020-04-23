// Create a new Post
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createPost } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaField from '../common/TextAreaField';
import classnames from 'classnames';

class PostForm extends Component {

  constructor() {
    super();
    this.state = {
      image: '',
      text: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      image: this.state.image,
      text: this.state.text
    }

    // send data to Redux Action
    this.props.createPost(newPost);

    this.setState({ text: '', image: '' })
  }

  render() {

    const { errors } = this.props;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-7 col-xl-6 align-self-center">

            <br/>
            <p style={{ fontFamily: 'Comic Neue', textAlign: 'center', fontSize: '30px' }}>Let's share your post with friends !</p>
            <br/>

            <div className="card border-dark">
              <div className="card-header">
                <div>
                  <br/>
                  <form onSubmit={this.onSubmit}>
                    <div className="input-group form-group flex-nowwrap">

                      {/* image section */}
                        <div className="input-group-prepend">
                          <span className="input-group-text">https://</span>
                        </div>
                      
                      <input
                        className={classnames("form-control", { "is-invalid": errors.image })}
                        type="text"
                        placeholder="Image URL"
                        value={this.state.image}
                        onChange={this.onChange}
                        name="image"
                        errors={errors.image}
                      />
                      <div className="invalid-feedback">{errors.image}</div>
                    </div>
                    <br/>
                    
                      {/* text section */} 
                      <TextAreaField
                        placeholder=""
                        value={this.state.text}
                        onChange={this.onChange}
                        name="text"
                        error={errors.text}
                      />
                      <button style={{ margin: '10px 5px 10px' }} type="submit" className="btn btn-dark">
                        Post
                      </button>
                  </form>
                </div>
              </div>
            </div>

            <br/>
            <Link 
            to='/feed'
            style={{ fontFamily: 'Comic Neue', fontSize: '25px', textDecoration: 'none' }}>
              <p style={{ textAlign: 'center' }}> >> Back to Feed</p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { createPost })(PostForm);
