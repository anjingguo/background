import Vue from 'vue'
import Vuex from 'vuex'
import { getAdminInfo } from '@/api/getData'
import { getStore } from '@/config/mUtils.js'

Vue.use(Vuex)

const actions = {
  async getAdminData({ commit }) {
    try {
      const res = await getAdminInfo()
      if (res.status == 1) {
        commit('saveAdminInfo', res.data)
      } else {
        throw new Error(res.type)
      }
    } catch (err) {
      // console.log(err.message)
    }
  }
}
const state = {
  adminInfo: {
    username: JSON.parse(getStore('user')).username,
    password: JSON.parse(getStore('user')).password,
    avatar: 'default.jpg'
  }
}
const mutations = {
  saveAdminInfo(state, { username, password }) {
    state.adminInfo.username = username
    state.adminInfo.password = password
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
