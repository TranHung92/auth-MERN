import axios from 'axios';
import { push } from 'react-router-redux';
import { 
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
	FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:6060';

export function signinUser(values) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, values)
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token);
				dispatch(push('/app'));
			})
			.catch(() => dispatch(authError('Wrong Login Info')));
	}
}

export function signupUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token);
				dispatch(push('/app'));
			})
			.catch(error => dispatch(authError(error.response.data.error)));
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	return { type: UNAUTH_USER }
}

