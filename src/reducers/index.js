import { combineReducers } from 'redux';
import dataReducer from './DataReducer';
import reloadReducer from './ReloadReducer';
//import userReducer from './UserReducer';

export default combineReducers({
	data: dataReducer,
	reload: reloadReducer,
	//user: userReducer
});