import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import * as WebBrowser from 'expo-web-browser' // only work for android and ios
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin'
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from '../constants/env'

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID
})

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null)
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   androidClientId:
  //     '1013496604414-s1ulvp8e95ijrug90qfmiedj3ir110ku.apps.googleusercontent.com'
  // })

  // const handleSignInWithGoogle = async () => {
  //   const user = await AsyncStorage.getItem('@user')
  //   if (!user) {
  //     if (response?.type === 'success' && response?.authentication) {
  //       console.log(response)
  //       await getUserInfo(response.authentication.accessToken)
  //     }
  //   } else {
  //     setUserInfo(JSON.parse(user))
  //   }
  // }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const token = await GoogleSignin.getTokens()

      setUserInfo(await JSON.parse(JSON.stringify(userInfo.user.name)))
      console.log(userInfo)
      await AsyncStorage.setItem('@user', JSON.stringify(userInfo))
      navigation.navigate('Main')
      console.log(token)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   const handleSignIn = async () => {
  //     await handleSignInWithGoogle()
  //   }
  //   handleSignIn()
  // }, [response])

  const getUserInfo = async (token: string) => {
    if (!token) return
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const user = await res.json()
    } catch (e) {
      console.error('Error at getUserInfo', e)
    }
  }

  const handleLogout = async () => {
    await GoogleSignin.signOut();
    setUserInfo(null)
  }

  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
`

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column'
        }
      ]}
    >
      <Image
        source={require('../../assets/media.png')}
        style={{ flex: 2, height: '100%', width: '100%' }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            borderRadius: 2,
            borderColor: '#454F5B',
            borderWidth: 1,
            height: '40%',
            width: '70%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <SvgXml xml={xml} style={{ height: 20, width: 40 }} />
          <Text style={{ color: '#454F5B' }} onPress={signIn}>
            Login with Gmail account
            {JSON.stringify(userInfo)}
          </Text>
          <Text onPress={handleLogout}>Logout</Text>
        </View>
      </View>
      <Image
        source={require('../../assets/media1.png')}
        style={{ flex: 2, height: 100, width: '100%' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2
  }
})
export default LoginScreen
{
}
