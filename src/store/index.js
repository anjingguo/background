import Vue from 'vue'
import Vuex from 'vuex'
import { getAdminInfo } from '@/api/getData'

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
    username: '',
    password: '',
    avatar: 'default.jpg'
  }
}
const mutations = {
  saveAdminInfo(state, obj) {
    state.adminInfo.username = obj.user_name
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
