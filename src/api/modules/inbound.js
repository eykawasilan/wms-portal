import axios from 'axios'

const instance = axios.create({
    baseURL: window.env.api.inbound,
    timeout: 30000,
})

export default {
    instance,
    createBulkItemRequest: ({
        requestId,
        bulkData,
    }) => instance({
        url: '/inbound-request-item-bulk/create',
        method: 'post',
        data: {
            requestId,
            bulkData,
        },
    }),
    createRequest: ({
        clientId,
        clientIbNo,
        toWarehouseId,
        inboundDate,
    }) => instance({
        url: '/inbound-request/create',
        method: 'post',
        data: {
            clientId,
            clientIbNo,
            toWarehouseId,
            inboundDate,
        },
    }),
}
