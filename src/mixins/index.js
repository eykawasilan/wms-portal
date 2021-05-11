import { MANIFEST_STATUS } from '@/enum/manifest'
import { ORDER_STATUS } from '@/enum/order'

export default {
    computed: {
        labels() {
            return {
                order: {
                    status: {
                        [ORDER_STATUS.PENDING]: 'Pending',
                        [ORDER_STATUS.COMPLETED]: 'Completed',
                        [ORDER_STATUS.CONFIRMED]: 'Confirmed',
                        [ORDER_STATUS.PICKED]: 'Picked',
                        [ORDER_STATUS.CHECKED]: 'Checked',
                        [ORDER_STATUS.PACKED]: 'Packed',
                        [ORDER_STATUS.OUTBOUNDED]: 'Outbounded',
                        [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for delivery',
                        [ORDER_STATUS.DISPUTE]: 'Dispute',
                        [ORDER_STATUS.SHIPPED]: 'Shipped',
                        [ORDER_STATUS.CANCELLED]: 'Cancelled',
                        [ORDER_STATUS.IN_PICK_LIST]: 'In pick list',
                        [ORDER_STATUS.CHECKIN_OUTBOUND]: 'Checkin outbound',
                        [ORDER_STATUS.MANIFESTED_ORDER]: 'Manifested order',
                    },
                },
                manifest: {
                    status: {
                        [MANIFEST_STATUS.PENDING]: 'Pending',
                        [MANIFEST_STATUS.COMPLETED]: 'Completed',
                        [MANIFEST_STATUS.CANCELLED]: 'Cancelled',
                    },
                },
            }
        },
    },
}
