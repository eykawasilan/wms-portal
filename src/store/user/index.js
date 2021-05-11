import api from '@/api'

export default {
  namespaced: true,
  state: {
    data: !localStorage.getItem('user') ? {} : {
      ...JSON.parse(localStorage.getItem('user')),
    },
    token: localStorage.getItem('token') || null,
    expiry: localStorage.getItem('expiry') || null,
  },
  mutations: {
    data: (state, value) => {
      state.data = value
    },
    expiry: (state, value) => {
      state.expiry = value
    },
    token: (state, value) => {
      state.token = value
    },
  },
  actions: {
    login: async ({ commit }, { email, password }) => {
      const res = await api.auth.login({
        email,
        password,
      })
      const { token, user, tokenExp } = res?.data
      commit('token', token)
      commit('data', user)
      commit('expiry', tokenExp)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      localStorage.setItem('expiry', tokenExp)
    },
    logout: ({ commit }) => {
      commit('data', {})
      commit('token', null)
      commit('expiry', null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('expiry')
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    companyId: state => state.data?.companyId,
    role: state => state.data?.role,
    name: state => state.data?.name,
  },
}
