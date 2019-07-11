import Fetch from 'common/fetch';

export const register = params => {
  return Fetch('/user/register', {
    body: params,
    method: 'POST'
  });
};

export const login = params => {
  return Fetch('/user/login', {
    body: params,
    method: 'POST'
  });
};

export const logout = () => {
  return Fetch('/user/logout', {
    body: params,
    method: 'POST'
  });
};
