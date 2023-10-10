import { Platform } from 'react-native'
import axios from 'axios'
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from './env'
import { onRequest, onRequestError } from './interceptors'

const getBaseUrl = () => {
  const platform = Platform.OS
  switch (platform) {
    case 'ios':
      return IOS_CLIENT_ID
    case 'android':
      return WEB_CLIENT_ID
    default:
      throw new Error('Platform is not supported')
  }
}

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(onRequest, onRequestError)

export default axiosInstance
