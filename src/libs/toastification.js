import Vue from 'vue'
import Toast from 'vue-toastification'

// Toast Notification Component Styles
import "vue-toastification/dist/index.css";

/**
 * NOTE: If you are using other transition them make sure to import it in `src/@core/scss/vue/libs/notification.scss` from it's source
 */
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 1,
})
