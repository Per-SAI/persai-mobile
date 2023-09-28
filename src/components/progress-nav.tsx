import { Box, Center, Flex, HStack, Icon, Text } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';

const ProgressNav = () => {
  return (
    <SafeAreaView>
      <Flex direction="row" justify="space-evenly" w="full" align="center">
        <Center>
          <HStack alignItems="center" space="4">
            <Text fontSize="xl">Time left</Text>
            <Text color="#5BE584" bold fontSize="xl">
              30:10
            </Text>
          </HStack>
        </Center>
        <Center>
          <Box w="container" borderColor="green.400" rounded="lg" borderWidth="1.5" p="2">
            <HStack space="2" alignItems="center">
              <Icon
                as={<Ionicons name="settings" size={24} color="black" />}
                color="green.500"
              />
              <Text color="#5BE584" bold fontSize="md">Settings</Text>
            </HStack>
          </Box>
        </Center>
      </Flex>
    </SafeAreaView>
  )
}

export default ProgressNav
