import axios from 'axios'

const instance = axios.create({
    baseURL: window.env.api.auth,
    timeout: 30000,
})

export default {
    instance,
    login: ({ email, password }) => instance({
        url: '/login',
        method: 'post',
        data: { email, password },
    }),
}
