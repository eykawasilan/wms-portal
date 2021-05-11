import axios from 'axios'

const instance = axios.create({
    baseURL: window.env.api.inventory,
    timeout: 30000,
})

export default {
    instance,
    sku: {
        create: ({
            barcode,
            boxesUPM,
            carton,
            category,
            clientId,
            expiry,
            itemDesc,
            itemName,
            palletUPM,
            serial_code,
        }) => instance({
            url: '/sku/create',
            method: 'post',
            data: {
                barcode,
                boxesUPM,
                carton,
                category,
                clientId,
                expiry,
                itemDesc,
                itemName,
                palletUPM,
                serial_code,
            },
        }),
        createBulk: ({
            bulkData,
            clientId,
        }) => instance({
            url: '/sku-bulk/create',
            method: 'post',
            data: {
                bulkData,
                clientId,
            },
        }),
        getList: ({ page, pageSize, skuName = undefined }) => instance({
            url: '/sku',
            method: 'get',
            params: { page, pageSize, skuName },
        }),
    },
    batch: {
        getList: ({
            page,
            pageSize,
            skuLocationId = undefined,
            batchId = undefined,
            containerRunningCodeId = undefined,
            status = undefined,
        }) => instance({
            url: '/batch-location',
            method: 'get',
            params: {
                page,
                pageSize,
                skuLocationId,
                batchId,
                containerRunningCodeId,
                status,
            },
        }),
    },
}
