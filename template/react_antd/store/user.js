const logged = (state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return payload;
    case 'LOGOUT':
      return payload;
    default:
      return state;
  }
};

export default {
  logged
};
