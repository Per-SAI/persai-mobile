import { createContext, useContext, useEffect, useState } from 'react'
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from '../constants/env'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGIN_URL } from '../constants/urls'
import axios from '../constants/axios'

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID
})

type Props = {
  children: React.ReactNode
}

type AuthProps = {
  authState?: { token: string | null; authenticated: boolean | null }
  onLogout?: () => Promise<any>
  onLogin?: () => Promise<any>
}

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<{
    token: string | null
    authenticated: boolean | null
  }>({ token: null, authenticated: null })

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userInfo = await AsyncStorage.getItem('@user')
      if (userInfo) {
        const userObject = JSON.parse(userInfo) as User
        setAuthState({
          token: userObject.idToken,
          authenticated: true
        })
      }
    }

    bootstrapAsync()
  })

  const getAccessToken = async (idToken: string) => {
    const res = await fetch(LOGIN_URL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        idToken
      })
    })

    const resJson = await res.json()
    return resJson
  }

  const login = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const { idToken } = userInfo
      if (idToken) {
        const data = await getAccessToken(idToken)
        await AsyncStorage.setItem('@user', JSON.stringify(userInfo))
        const accessToken = data.accessToken
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        setAuthState({
          token: userInfo.idToken,
          authenticated: true
        })
      }
    } catch (e) {
      return { error: true, msg: e }
    }
  }

  const logout = async () => {
    await GoogleSignin.signOut()
    await AsyncStorage.removeItem('@user')
    setAuthState({
      token: null,
      authenticated: null
    })
  }

  const value = {
    onLogin: login,
    onLogout: logout,
    authState
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
