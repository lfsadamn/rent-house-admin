import loginApi from '@/apis/login'
import cookie from '@utils/cookie'

const LOGIN_IN = 'LOGIN_IN'
const LOGIN_OUT = 'LOGIN_OUT'
const CHANGE_INFO = 'CHANGE_INFO'

const initState = {
  authed: false,
  userInfo: {},
}

export function user (state = initState, action) {
  switch (action.type) {
    case LOGIN_IN:
      state.authed = true;
      state.userInfo = action.payload
      return state;
    case CHANGE_INFO:
      state.authed = true;
      state.userInfo = action.payload
      return state;
    case LOGIN_OUT:
      return initState;
    default:
      return state;
  }
}

export function changeUserInfo (payload) {
  return { type: CHANGE_INFO, payload }
}

export function loginIn (payload, token) {
  const config = { expires: 7, path: '/' };
  cookie.setCookie({ key: 'Authorization', value: token, config })
  return { type: LOGIN_IN, payload }
}

export async function loginOut () {
  return { type: LOGIN_OUT }
}



export function getUserInfo () {
  return (dispatch, getState) => {
    return loginApi.getUserInfo()
      .then(res => {
        console.log(res)
        if (res) {
          dispatch(changeUserInfo(res))
        }
      })
  }
}

export function login (data) {
  return (dispatch, getState) => {
    return loginApi.userLogin(data)
      .then(res => {
        console.log(res)
        if (res) {
          dispatch(loginIn(res.user, res.token))
        }
      })
  }
}