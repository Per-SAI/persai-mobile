// const host = 'http://persai-env-v1.ap-southeast-1.elasticbeanstalk.com'
export const host = 'https://main.persai.space'
const API_VER = '/api/v1'

export const LOGIN_URL = `${host}/api/v1/login/google`
export const MY_COLLECTION_URL = `${API_VER}/study-set/current`
export const GET_STUDY_SET_BY_ID_URL = `${API_VER}/study-set`
export const GET_NEW_ACCESS_TOKEN_URL = `${API_VER}/new-access-token`
export const GET_ALL_STUDY_SET_URL = `${API_VER}/study-set`
export const GET_CURRENT_LOGGED_USER_URL = `${API_VER}/user/current`
export const PUT_CURRENT_LOGGED_USER_URL = `${API_VER}/user/current`
export const PUT_REFERRAL_CODE_URL = `${API_VER}/referral`
export const POST_CREATE_NEW_STUDY_SET_URL = `${API_VER}/study-set`