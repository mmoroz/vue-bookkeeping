import Vue from 'vue'
import {Vuelidate} from "vuelidate";
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin";
import Loader from "@/components/ui/Loader";
import tooltipDirective from "@/directives/tooltip.directive";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import currencyFilter from "@/filters/currency.filter";
import {getAuth, onAuthStateChanged} from "firebase/auth";



Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyC8JyNoYkY5jAx5s7VGnJewchA-OME02j0",
  authDomain: "bookkeeping-5df78.firebaseapp.com",
  projectId: "bookkeeping-5df78",
  storageBucket: "bookkeeping-5df78.appspot.com",
  messagingSenderId: "42666873331",
  appId: "1:42666873331:web:907a3ea24e6b5fd7cf0286"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

let app

onAuthStateChanged(getAuth(), (user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});


