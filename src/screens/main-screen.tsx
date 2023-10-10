import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Button, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MainScreenNavigationProp } from '..'

const MainScreen = ({navigation}: MainScreenNavigationProp) => {
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    const handleScreenFirstLoad = async () => {
      const userInfo = await AsyncStorage.getItem('@user')
      if (!userInfo) {
         navigation.navigate('Login')
      }
    }

    handleScreenFirstLoad()
    
  }, [])

  const handleLogout = async () => {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('@user')
    setUserInfo(null)
  }

  return (
    <SafeAreaView>
      <Text>Main</Text>
      <Button onPress={handleLogout}>Sign Out</Button>
    </SafeAreaView>
  )
}

export default MainScreen
