export default {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    const filteredRequests = state.requests.filter(
      (request) => request.coachId === coachId
    );
    return filteredRequests;
  },

  hasRequests(state, getters) {
    // WAY 1:
    // if (state.requests.length > 0) {
    //   return true;
    // } else {
    //   return false;
    // };

    // WAY 2:
    // return state.requests.length > 0 ? true : false;

    // WAY 3:
    // return state.requests && state.requests.length > 0;
    return getters.requests && getters.requests.length > 0;
  },
};
