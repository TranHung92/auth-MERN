import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer, routerStateReducer } from 'react-router-redux';
import auth from './auth_reducer';

const rootReducer = combineReducers({
	routerReducer,
	form,
	auth
});

export default rootReducer;
