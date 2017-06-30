import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom'

class Feature extends Component {
	componentWillMount() {
		this.props.fetchMessage();
	}

	render() {
		return (
			<div>{this.props.message}</div>
		)
	}
}

function mapStateToProps(state) {
	return { message: state.auth.message }
}

export default withRouter(connect(mapStateToProps, actions)(Feature))