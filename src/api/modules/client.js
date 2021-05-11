import axios from 'axios'
import { USER_ROLE } from '@/enum/user'

const instance = axios.create({
    baseURL: window.env.api.user,
    timeout: 30000,
})

export default {
    instance,
    addUser: ({
        name,
        email,
        password,
        location,
        phoneCode,
        phoneNo,
        startDate,
        role = USER_ROLE.CLIENT,
        companyId,
    }) => instance({
        url: '/user/create',
        method: 'post',
        data: {
            name,
            email,
            password,
            location,
            phoneCode,
            phoneNo,
            startDate,
            role,
            companyId,
        },
    }),
    getUserList: ({
        page,
        pageSize,
        role = USER_ROLE.CLIENT,
        email = undefined,
        name = undefined,
    }) => instance({
        url: '/user',
        methods: 'get',
        params: {
            page,
            pageSize,
            role,
            email,
            name,
        },
    }),
}
