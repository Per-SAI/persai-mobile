import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from '../theme'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'

type Props = {
  children: React.ReactNode
}

const AppContainer = (props: Props) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <NativeBaseProvider>{props.children}</NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppContainer
