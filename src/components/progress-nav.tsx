import { Center, Flex } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProgressNav = () => {
  return (
    <SafeAreaView>
      <Flex direction="row" justify='space-evenly' w="full" align='center'>
        <Center>Time left 30:10</Center>
        <Center>Settings</Center>
      </Flex>
    </SafeAreaView>
  )
}

export default ProgressNav
