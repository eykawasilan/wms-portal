import Vue from 'vue'
import { BootstrapVue, ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import * as veeRules from 'vee-validate/dist/rules';
import VueCompositionAPI from '@vue/composition-api'
import VueHtmlToPaper from 'vue-html-to-paper'
import router from './router'
import store from './store'
import App from './App.vue'
import CommonMixin from './mixins'

// APIs
import Api from './api'
import ApiHandlers from './api/handlers'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.mixin(CommonMixin);

Vue.config.productionTip = false
Object.keys(veeRules).forEach(k => extend(k, veeRules[k]));

Vue.prototype.$api = Api

const createAxiosInterceptors = (instances) => {
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i]

    instance.interceptors.request.use(
      request => ApiHandlers.requestHandler(request),
      error => ApiHandlers.errorHandler(error),
    )

    instance.interceptors.response.use(
      response => ApiHandlers.responseHandler(response),
      error => ApiHandlers.errorHandler(error),
    )
  }
}

const ApiModules = Object.values(Api)

for (let i = 0; i < ApiModules.length; i++) {
  if (Array.isArray(ApiModules[i]?.instance)) createAxiosInterceptors(ApiModules[i]?.instance)
  else createAxiosInterceptors([ApiModules[i]?.instance])
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes',
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
  ],
}

Vue.use(VueHtmlToPaper, options)
Vue.use(BootstrapVue)

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper)

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
