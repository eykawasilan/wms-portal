import axios from 'axios'
import { USER_ROLE } from '@/enum/user'

const userInstance = axios.create({
    baseURL: window.env.api.user,
    timeout: 30000,
})

const warehouseInstance = axios.create({
    baseURL: window.env.api.warehouse,
    timeout: 30000,
})

export default {
    instance: [userInstance, warehouseInstance],
    getList: ({ page, pageSize }) => warehouseInstance({
        url: '/warehouse',
        method: 'get',
        params: { page, pageSize },
    }),
    user: {
        add: ({
            name,
            email,
            password,
            location,
            phoneCode,
            phoneNo,
            startDate,
            role = USER_ROLE.WAREHOUSE_USER,
            companyId,
        }) => userInstance({
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
        getList: ({
            page,
            pageSize,
            role = USER_ROLE.WAREHOUSE_USER,
            email = undefined,
            name = undefined,
        }) => userInstance({
            url: '/user',
            method: 'get',
            params: {
                page,
                pageSize,
                role,
                email,
                name,
            },
        }),
    },
}
