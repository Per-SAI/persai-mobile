import { createContext, useContext, useEffect, useState } from 'react'
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from '../constants/env'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
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
  authState?: {
    idToken: string | null
    authenticated: boolean | null
    accessToken: string | null
    refreshToken: string | null
  }
  onLogout?: () => Promise<any>
  onLogin?: () => Promise<any>
  setAuthState?: React.Dispatch<
    React.SetStateAction<{
      idToken: string | null
      authenticated: boolean | null
      accessToken: string | null
      refreshToken: string | null
    }>
  >
}

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

const getIdToken = async () => {
  await GoogleSignin.hasPlayServices()
  const userInfo = await GoogleSignin.signIn()
  const { idToken } = userInfo
  return { idToken, userInfo }
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<{
    idToken: string | null
    authenticated: boolean | null
    accessToken: string | null
    refreshToken: string | null
  }>({
    idToken: null,
    authenticated: null,
    accessToken: null,
    refreshToken: null
  })

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently()
        if (userInfo.idToken) {
          const tokens = await getTokens(userInfo.idToken)
          if (tokens.userResponse.status === 'SUCCEED') {
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${tokens.accessToken}`
            setAuthState({
              idToken: userInfo.idToken,
              authenticated: true,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken
            })
          }
        }
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          console.warn('Token expried. Need to fetch another tokens.')
        }
      }
    }

    bootstrapAsync()
  }, [])

  const getTokens = async (idToken: string) => {
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
      const { idToken, userInfo } = await getIdToken()
      if (idToken) {
        const data = await getTokens(idToken)
        await AsyncStorage.setItem('@user', JSON.stringify(userInfo))
        const accessToken = data.accessToken
        await AsyncStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        setAuthState({
          idToken: idToken,
          authenticated: true,
          accessToken: accessToken,
          refreshToken: data.refeshToken
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
      idToken: null,
      authenticated: null,
      accessToken: null,
      refreshToken: null
    })
  }

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
    setAuthState
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
