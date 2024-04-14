export default {
  async addNewCoach(context, payload) {
    const userId = context.rootGetters.userId;

    const newCoach = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate,
    };

    const response = await fetch(
      `https://coach-finder-4889f-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(newCoach),
      }
    );

    //const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('addNewCoach', {
      ...newCoach,
      id: userId,
    });
  },
};
