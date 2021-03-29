import Vue from "vue";
import Vueledate from "vuelidate";

import App from "./App.vue";
Vue.use(Vueledate);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
