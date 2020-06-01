const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload || false;
    default:
      return state;
  }
};

const surveyReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default {
  auth: authReducer,
  survey: surveyReducer,
};
