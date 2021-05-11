import axios from 'axios'

const instance = axios.create({
    baseURL: window.env.api.order,
    timeout: 30000,
})

export default {
    instance,
    createBulk: ({
        bulkData,
        clientId,
    }) => instance({
        url: '/order-file/create',
        method: 'post',
        data: {
            bulkData,
            clientId,
        },
    }),
    createDispute: ({ orderId, type, reason, remarks }) => instance({
        url: '/order-dispute/create',
        method: 'post',
        data: { orderId, type, reason, remarks },
    }),
    getCustomerInfo: ({
        orderId,
    }) => instance({
        url: '/order-customer-info',
        method: 'get',
        params: {
            orderId,
        },
    }),
    getList: ({
        page,
        pageSize,
        orderId = undefined,
        clientId = undefined,
        cusOrderNo = undefined,
    }) => instance({
        url: '/order',
        method: 'get',
        params: {
            page,
            pageSize,
            orderId,
            clientId,
            cusOrderNo,
        },
    }),
    getOrderByTrayCode: ({
        trayCode,
    }) => instance({
        url: '/order-by-tray',
        method: 'get',
        params: {
            trayCode,
        },
    }),
    print: ({
        orderId,
    }) => instance({
        url: '/awb/create',
        method: 'post',
        data: {
            orderId,
        },
        responseType: 'blob',
    }),
    uploadOrder: ({ orderData }) => instance({
        url: '/order/create',
        method: 'post',
        data: {
            orderData,
        },
    }),
    picking: {
        generateList: () => instance({
            url: '/order-pick/create',
            method: 'post',
        }),
        getList: ({
            page,
            pageSize,
        }) => instance({
            url: '/order-pick',
            method: 'get',
            params: {
                page,
                pageSize,
            },

        }),
        getStatistics: () => instance({
            url: '/picking-header',
            method: 'get',
        }),
    },
    packing: {
        getList: ({
            page,
            pageSize,
            orderId = undefined,
            clientId = undefined,
            orderPickTrayId = undefined,
            pickId = undefined,
            trayId = undefined,
        }) => instance({
            url: '/order-pick-tray',
            method: 'get',
            params: {
                page,
                pageSize,
                orderId,
                clientId,
                orderPickTrayId,
                pickId,
                trayId,
            },
        }),
        getHistory: ({
            page,
            pageSize,
            orderId,
            cusOrderNo,
            clientId,
        }) => instance({
            url: '/order-packing-history',
            method: 'get',
            params: {
                page,
                pageSize,
                orderId,
                cusOrderNo,
                clientId,
            },
        }),

    },
    outbound: {
        checkIn: ({
            orderCode,
        }) => instance({
            url: '/check-in-outbound-order',
            method: 'post',
            data: {
                orderCode,
            },
        }),
        getList: ({
            page,
            pageSize,
            orderId,
            clientId,
            cusOrderNo,
        }) => instance({
            url: '/outbound',
            method: 'get',
            params: {
                page,
                pageSize,
                orderId,
                clientId,
                cusOrderNo,
            },

        }),
        getStatistics: () => instance({
            url: '/outbound-header',
            method: 'get',
        }),
    },
    manifest: {
        generateOrder: () => instance({
            url: '/generate-manifest-order',
            method: 'post',
        }),
        getList: ({
            page,
            pageSize,
            manifestId = undefined,
            manifestCode = undefined,
        }) => instance({
            url: '/manifest',
            method: 'get',
            params: {
                page,
                pageSize,
                manifestId,
                manifestCode,
            },
        }),
    },
    manifestlist: {
        getManifestList: ({
            page,
            pageSize,
            manifestId = undefined,
            manifestCode = undefined,
        }) => instance({
            url: '/manifest',
            methods: 'get',
            params: {
                page,
                pageSize,
                manifestId,
                manifestCode,
            },
        }),
    },
}
