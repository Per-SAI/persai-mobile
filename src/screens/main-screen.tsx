import { Text } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MainScreenNavigationProp } from '..'

const MainScreen = ({ navigation }: MainScreenNavigationProp) => {
  return (
    <SafeAreaView>
      <Text>Main</Text>
    </SafeAreaView>
  )
}

export default MainScreen
