import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

import course from './store/course'
import user from './store/user'
import admin from './store/admin'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    course,
    user,
    admin
  },
  plugins: [vuexLocal.plugin]
});