const user = {
  state: {
    userInfo: {
      account: '',
      authority: ''
    },
  },
  mutations: {
    initUserInfo(state, payload) {
      state.userInfo.account = payload.account;
      state.userInfo.authority = payload.auth;
    },
    cleanUserInfo(state) {
      state.userInfo =  {
        login: false,
        account: '',
        authority: ''
      }
    }
  }
}

export default user;