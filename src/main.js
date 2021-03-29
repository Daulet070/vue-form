import Vue from "vue";
import Vueledate from "vuelidate";

import "./assets/style/main.scss";

import App from "./App.vue";
Vue.use(Vueledate);
Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
