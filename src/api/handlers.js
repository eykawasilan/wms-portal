import { createToastInterface } from "vue-toastification"
import store from '@/store'

const toast = createToastInterface({
    timeout: 3000,
})

const errorHandler = (...args) => {
    const [error] = args
    toast.error(error?.response?.data?.err || error.toString());
    return Promise.reject(error)
}

const requestHandler = request => {
    if (store.getters['user/isLoggedIn']) request.headers.Authorization = `Bearer ${store.state.user.token}`
    return request
}

const responseHandler = response => {
    if (/application\/json/.test(response.headers['content-type'])) {
        if (response.status == 200 && response?.data?.ret == 0) return response.data
    } else if (/application\/[pdf]/.test(response.headers['content-type'])) return response

    throw new Error(response)
}

export default {
    requestHandler,
    responseHandler,
    errorHandler,
}
