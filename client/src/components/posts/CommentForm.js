// Comment Form

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {

  constructor() {
    super();
    this.state = {
      text: '',
      disabled: true
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const postId = this.props.postId;

    const newComment = {
      text: this.state.text
    }

    // send data to Redux Action
    this.props.addComment(postId, newComment);
    // reset the state
    this.setState({ text: '', disabled: true })
  }

  render() {

    const { errors } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div class="input-group">
          <input 
          type="text" 
          className="form-control" 
          placeholder="Comment..." 
          value={this.state.text}
          onChange={this.onChange}
          name="text"
          error={errors.text}
          />

          <div class="input-group-append">
            <button 
            className="btn btn-secondary" 
            type="submit"
            disabled={this.state.text.length > 3 ? false : true }>
            Add
            </button>
          </div>
        </div>
      </form>
    )
  }
}


CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
