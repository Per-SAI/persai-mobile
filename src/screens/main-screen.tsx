import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from 'native-base'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const MainScreen = () => {
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    const handleScreenFirstLoad = async () => {
      const userInfo = await AsyncStorage.getItem('@user')
      if (!userInfo) {
        
      }
    }
    
  }, [])

  return (
    <SafeAreaView>
      <Text>Main</Text>
    </SafeAreaView>
  )
}

export default MainScreen
