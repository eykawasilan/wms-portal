export default {
    namespaced: true,
    state: {
        clientID: null,
    },
    mutations: {
        clientID: (state, value) => {
            state.clientID = value
        },
    },
}