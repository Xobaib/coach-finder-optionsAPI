export default {
  requests(state) {
    return state.requests;
  },

  hasRequests(state) {
    // WAY 1:
    // if (state.requests.length > 0) {
    //   return true;
    // } else {
    //   return false;
    // };

    // WAY 2:
    // return state.requests.length > 0 ? true : false;

    // WAY 3:
    return state.requests && state.requests.length > 0;
  },
};
