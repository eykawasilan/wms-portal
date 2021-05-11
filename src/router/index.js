import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import moment from 'moment'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'auth-login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/register',
      name: 'auth-register-v1',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/forgotpassword',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        pageTitle: 'Dashboard',
        breadcrumb: [
          {
            text: 'Dashboard',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Warehouse
    {
      path: '/warehouse',
      name: 'warehouse',
      component: () => import('@/views/warehouse/Warehouse.vue'),
      meta: {
        pageTitle: 'Warehouse',
        breadcrumb: [
          {
            text: 'Warehouse',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/warehouse/create-warehouse',
      name: 'create-warehouse',
      component: () => import('@/views/warehouse/create-warehouse/CreateWarehouse.vue'),
      meta: {
        pageTitle: 'Create Warehouse',
        breadcrumb: [
          {
            text: 'Warehouse',
          },
          {
            text: 'Create Warehouse',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/warehouse/warehouserow',
      name: 'warehouserow',
      component: () => import('@/views/warehouse/warehouserow/WarehouseRow.vue'),
      meta: {
        pageTitle: 'Warehouse Row',
        breadcrumb: [
          {
            text: 'Warehouse',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/warehouse/warehouselayout',
      name: 'warehouselayout',
      component: () => import('@/views/warehouse/warehouselayout/WarehouseLayout.vue'),
      meta: {
        pageTitle: 'Warehouse Layout',
        breadcrumb: [
          {
            text: 'Warehouse',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/warehouse/warehouserack',
      name: 'warehouserack',
      component: () => import('@/views/warehouse/warehouserack/WarehouseRack.vue'),
      meta: {
        pageTitle: 'Warehouse Rack',
        breadcrumb: [
          {
            text: 'Warehouse',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/warehouse/warehouselevel',
      name: 'warehouselevel',
      component: () => import('@/views/warehouse/warehouselevel/WarehouseLevel.vue'),
      meta: {
        pageTitle: 'Warehouse Level',
        breadcrumb: [
          {
            text: 'Warehouse',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/warehouse/warehouseposition',
      name: 'warehouseposition',
      component: () => import('@/views/warehouse/warehouseposition/index.vue'),
      meta: {
        pageTitle: 'Warehouse Position',
        breadcrumb: [
          {
            text: 'Warehouse',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // warehouse User
    {
      path: '/user/warehouseuser',
      name: 'warehouseuser',
      component: () => import('@/views/user/warehouseuser/ListUser.vue'),
      meta: {
        pageTitle: 'Warehouse User',
        breadcrumb: [
          {
            text: 'Warehouse User',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/user/warehouseuser/adduser',
      name: 'warehouseadduser',
      component: () => import('@/views/user/warehouseuser/adduser/AddUser.vue'),
      meta: {
        pageTitle: 'User',
        breadcrumb: [
          {
            text: 'User',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // client User
    {
      path: '/user/clientuser',
      name: 'clientuser',
      component: () => import('@/views/user/clientuser/ListUser.vue'),
      meta: {
        pageTitle: 'Client User',
        breadcrumb: [
          {
            text: 'Client User',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/user/clientuser/adduser',
      name: 'clientadduser',
      component: () => import('@/views/user/clientuser/adduser/AddUser.vue'),
      meta: {
        pageTitle: 'Client User',
        breadcrumb: [
          {
            text: 'Client User',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Sku
    {
      path: '/sku',
      name: 'sku',
      component: () => import('@/views/sku/Sku.vue'),
      meta: {
        pageTitle: 'SKU',
        breadcrumb: [
          {
            text: 'Create SKU',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/sku/singlesku',
      name: 'singlesku',
      component: () => import('@/views/sku/singlesku/SingleSKU.vue'),
      meta: {
        pageTitle: 'SKU',
        breadcrumb: [
          {
            text: 'Create SKU',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/sku/singlesku/singleskudetail',
      name: 'singleskudetail',
      component: () => import('@/views/sku/singlesku/singleskudetail/index.vue'),
      meta: {
        pageTitle: 'SKU',
        breadcrumb: [
          {
            text: 'Create SKU',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/sku/bulksku',
      name: 'bulksku',
      component: () => import('@/views/sku/bulksku/BulkSku.vue'),
      meta: {
        pageTitle: 'SKU',
        breadcrumb: [
          {
            text: 'Create SKU',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // inbound page
    {
      path: '/inbound',
      name: 'inbound',
      component: () => import('@/views/inbound/Inbound.vue'),
      meta: {
        pageTitle: 'Inbound',
        breadcrumb: [
          {
            text: 'Inbound',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/inbound/uploadfile',
      name: 'uploadfile',
      component: () => import('@/views/inbound/uploadfile/UploadFile.vue'),
      meta: {
        pageTitle: 'Inbound',
        breadcrumb: [
          {
            text: 'Inbound',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/inbound/uploadfile/uploadclientpo',
      name: 'uploadclientpo',
      component: () => import('@/views/inbound/uploadfile/uploadclientpo/UploadClientPo.vue'),
      meta: {
        pageTitle: 'Inbound',
        breadcrumb: [
          {
            text: 'Inbound',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/inbound/uploadfile/statusupload',
      name: 'statusupload',
      component: () => import('@/views/inbound/uploadfile/statusupload/StatusUpload.vue'),
      meta: {
        pageTitle: 'Inbound',
        breadcrumb: [
          {
            text: 'Inbound',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/inbound/createthroughlist',
      name: 'createthroughlist',
      component: () => import('@/views/inbound/createthroughlist/'),
      meta: {
        pageTitle: 'Inbound',
        breadcrumb: [
          {
            text: 'Inbound',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Racking
    {
      path: '/racking',
      name: 'racking',
      component: () => import('@/views/racking/Racking.vue'),
      meta: {
        pageTitle: 'Racking',
        breadcrumb: [
          {
            text: 'Racking',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Order
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order/'),
      meta: {
        pageTitle: 'Order',
        breadcrumb: [
          {
            text: 'Order',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // OrderList
    {
      path: '/order/orderlist',
      name: 'orderlist',
      component: () => import('@/views/order/orderlist/index.vue'),
      meta: {
        pageTitle: 'Order',
        breadcrumb: [
          {
            text: 'Order',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Picking
    {
      path: '/picking',
      name: 'picking',
      component: () => import('@/views/picking/Picking.vue'),
      meta: {
        pageTitle: 'Picking',
        breadcrumb: [
          {
            text: 'Picking',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Picking History
    {
      path: '/picking/pickinghistory',
      name: 'pickinghistory',
      component: () => import('@/views/picking/pickinghistory/'),
      meta: {
        pageTitle: 'Picking History',
        breadcrumb: [
          {
            text: 'Picking History',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Packing
    {
      path: '/packing',
      name: 'packing',
      component: () => import('@/views/packing/Packing.vue'),
      meta: {
        pageTitle: 'Packing',
        breadcrumb: [
          {
            text: 'Packing',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Packing Dispute
    {
      path: '/packing/packingdispute',
      name: 'packingdispute',
      component: () => import('@/views/packing/packingdispute/'),
      meta: {
        pageTitle: 'Packing Dispute',
        breadcrumb: [
          {
            text: 'Packing',
          },
          {
            text: 'Packing Dispute',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Packing History
    {
      path: '/packing/packinghistory',
      name: 'packinghistory',
      component: () => import('@/views/packing/packinghistory/'),
      meta: {
        pageTitle: 'Packing History',
        breadcrumb: [
          {
            text: 'Packing',
          },
          {
            text: 'Packing History',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    {
      path: '/packing/packingprint/:trayname/:id(\\d+)',
      name: 'packingprint',
      component: () => import('@/views/packing/packingprint/PackingPrint.vue'),
      meta: {
        pageTitle: 'Packing',
        breadcrumb: [
          {
            text: 'Packing',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Outbound
    {
      path: '/outboundlist',
      name: 'outboundlist',
      component: () => import('@/views/outbound/outboundlist/index.vue'),
      meta: {
        pageTitle: 'Outbound List',
        breadcrumb: [
          {
            text: 'Outbound List',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Outbound-CheckIn
    {
      path: '/outbound/checkin',
      name: 'checkin',
      component: () => import('@/views/outbound/checkin/index.vue'),
      meta: {
        pageTitle: 'Check-In',
        breadcrumb: [
          {
            text: 'Check-In',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // Manifest Page Detail
    {
      path: '/outbound/outboundlist/manifestdetail',
      name: 'manifestdetail',
      component: () => import('@/views/outbound/outboundlist/manifestdetail/index.vue'),
      meta: {
        pageTitle: 'Manifest Detail',
        breadcrumb: [
          {
            text: 'Manifest Detail',
            active: true,
          },
        ],
        requireAuth: true,
      },
    },
    // errorpage
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (store.state.user.expiry) {
    if (Number(store.state.user.expiry) <= moment().unix()) store.dispatch('user/logout')
  }

  if (to.meta.requireAuth && !store.getters['user/isLoggedIn']) return next({ name: 'auth-login' })
  if (to.meta.redirectIfLoggedIn && store.getters['user/isLoggedIn']) return next({ name: 'dashboard' })
  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
