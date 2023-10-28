import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from '../theme'
import {
  SafeAreaProvider,
  initialWindowMetrics
} from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type Props = {
  children: React.ReactNode
}

const AppContainer = (props: Props) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <NativeBaseProvider>{props.children}</NativeBaseProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default AppContainer
