const state = {
  userName: '轩钰',
  token: ''
}

const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  }
}

const actions = {
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}

export default {
  state,
  mutations,
  actions
}
