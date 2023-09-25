import { Center, Text, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'

const FlashcardQuestion = () => {
  return (
    <Center
      height="80%"
      width="80%"
      shadow="2"
      rounded="2xl"
      background="white"
    >
      <Icon
        color="black"
        as={<Entypo name="sound" size={24} />}
        size="lg"
        position="absolute"
        top={4}
        right={4}
      />

      <Text color='light.800'>This is a question!</Text>
    </Center>
  )
}

export default FlashcardQuestion
