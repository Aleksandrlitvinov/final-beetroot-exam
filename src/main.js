import Vue from 'vue'
import Vuelidate from "vuelidate";
import Notifications from 'vue-notification'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Vuemoment from 'vue-moment'
import Lodash from 'lodash'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/reset.css'
import './styles/style.css'

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuelidate)
Vue.use(Vuemoment)
Vue.use(Notifications)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Lodash)

firebase.initializeApp({
  apiKey: "AIzaSyATwJIK0DSXyPNT-4jvF2J7-YRF2cJjTFU",
  authDomain: "kanban-56165.firebaseapp.com",
  databaseURL: "https://kanban-56165-default-rtdb.firebaseio.com",
  projectId: "kanban-56165",
  storageBucket: "kanban-56165.appspot.com",
  messagingSenderId: "861396413747",
  appId: "1:861396413747:web:9c8de04b853db4d9966246"
})

let app

firebase.auth().onAuthStateChanged(()=>{
  if (!app){
    app = new Vue({
      store,
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})





