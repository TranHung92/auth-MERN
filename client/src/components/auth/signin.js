import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'

class Signin extends Component {
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

  onSubmit({ email, password }) {
    this.props.signinUser({ email, password })
  }

  render() {
    const { handleSubmit, submitting } = this.props;
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
        {this.renderAlert()}
        <button type='submit' disabled={submitting} className='btn btn-primary'>Login</button>
      </form>
    )
  }
}

function validate(value) {
  const errors = {}
  if (!value.email) {
    errors.email = 'Enter an email'
  }
  if (!value.password) {
    errors.password = 'Enter a password'
  }
  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signin',
  fields: ['email', 'password']
})((connect(mapStateToProps, actions)(Signin)))