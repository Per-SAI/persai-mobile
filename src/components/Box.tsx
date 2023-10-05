import React from 'react'
import { View } from 'react-native'

type Props = {
  children: React.ReactNode
}

const Box = (props: Props) => {
  const { children } = props
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </View>
  )
}

export default Box
