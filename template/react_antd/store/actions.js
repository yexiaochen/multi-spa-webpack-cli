import { register, login, logout } from 'src/services/user';

export const registerAction = (params, callback = () => {}) => async () => {
  let response = await register(params);
  callback(response);
};

export const loginAction = (params, callback = () => {}) => async dispatch => {
  let response = await login(params);
  console.log('login', login(params));
  dispatch({
    type: 'LOGIN',
    payload: true
  });
  callback(response);
};

export const logoutAction = (params, callback = () => {}) => async dispatch => {
  let response = await logout(params);
  dispatch({
    type: 'LOGOUT',
    payload: false
  });
  callback(response);
};
