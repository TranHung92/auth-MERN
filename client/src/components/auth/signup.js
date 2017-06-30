import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom'

class Signup extends Component {
  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          {...field.input}
          type={field.type}
          placeholder={field.label}
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!!! </strong>{this.props.errorMessage}
        </div>
      )
    }
  }

  onSubmit(values) {
    this.props.signupUser(values)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field 
          name='email'
          type='text'
          component={this.renderField}
          label='Email'
        />
        <Field
          name='password'
          type='password'
          component={this.renderField}
          label='Password'
        />
        <Field
          name='passwordConfirm'
          type='password'
          component={this.renderField}
          label='Confirm Password'
        />
        {this.renderAlert()}
        <button type='submit' className='btn btn-primary'>Sign up</button>
      </form>
    )
  }
}

function validate(value) {
  const errors = {};
  if (!value.email) {
    errors.email = 'Please enter an email';
  }

  if (!value.password) {
    errors.password = 'Please enter a password';
  }

  if (!value.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (value.password !== value.passwordConfirm) {
    errors.passwordConfirm = 'Password must match'
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signup'
})(withRouter(connect(mapStateToProps, actions)(Signup)))