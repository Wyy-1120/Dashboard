const state = {
    tasks: [],
    count:0,
}

const mutations = {
    increment(state) {
        state.count++;
        state.tasks.push({ id:count });
    },
}

// const actions = {
//     increment(context) {
//         context.commit("increment");
//     },
// }
export default {
    namespaced: true,
    state,
    mutations,
    // actions
  }