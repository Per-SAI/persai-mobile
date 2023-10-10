import { Box, Center, Container, Flex, Text, ScrollView, Button } from 'native-base'

const MyCollectionScreen = () => (
  <ScrollView>
    <Center safeArea>
      <Container w="100%" mt={3}>
        <Button>Create New</Button>
      </Container>
      <Container w="100%" mt={3}>
        <Flex
          justifyContent="center"
          borderColor="white"
          borderRadius="md"
          borderWidth={2}
          w="100%"
          bg='white'
          h='16'
          align='center'
        >
          <Text fontWeight='medium'>EXE201</Text>
        </Flex>
      </Container>

      <Container w="100%" mt={3}>
        <Flex
          justifyContent="center"
          borderColor="white"
          borderRadius="md"
          borderWidth={2}
          w="100%"
          bg='white'
          h='16'
          align='center'
        >
          <Text fontWeight='medium'>EXE201</Text>
        </Flex>
      </Container>

      <Container w="100%" mt={3}>
        <Flex
          justifyContent="center"
          borderColor="white"
          borderRadius="md"
          borderWidth={2}
          w="100%"
          bg='white'
          h='16'
          align='center'
        >
          <Text fontWeight='medium'>EXE201</Text>
        </Flex>
      </Container>
    </Center>
  </ScrollView>
)

export default MyCollectionScreen
