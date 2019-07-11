import { combineReducers } from 'redux';
import user from 'src/store/user';

export default combineReducers({
  ...user
});
