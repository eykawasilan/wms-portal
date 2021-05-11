import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import inbound from './inbound'
import order from './order'
import sku from './sku'
import user from './user'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    inbound,
    order,
    sku,
    user,
    verticalMenu,
  },
  strict: process.env.DEV,
})
