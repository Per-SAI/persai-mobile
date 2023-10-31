import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Center } from 'native-base'

const AdminTools = () => {
  const { onLogout } = useAuth()
  return (
    <SafeAreaView style={{flex: 1}}>
      <Center justifyContent='center'flex={1}>
        <Button onPress={onLogout}>Logout</Button>
      </Center>
    </SafeAreaView>
  )
}

export default AdminTools
