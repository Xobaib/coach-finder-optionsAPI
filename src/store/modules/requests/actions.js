export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://coach-finder-4889f-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    // console.log(responseData);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Faild to send request');
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addNewRequest', newRequest);
  },

  async loadRequests(context) {
    const coachId = context.rootGetters.userId;

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://coach-finder-4889f-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Faild to fetch requests'
      );
      throw error;
    }

    // console.log(responseData);

    const requests = [];

    for (const key in responseData) {
      const loadedRequest = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      requests.push(loadedRequest);
    }

    context.commit('setRequests', requests);
  },
};
