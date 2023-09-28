import { Circle, HStack, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const LearnOptions = () => {
  return (
    <HStack space={16}>
      <Circle size={12} bg="#1890FF" shadow={2}>
        <Icon
          as={<Entypo name="shuffle" size={24} />}
          size="md"
          color="white"
        />
      </Circle>
      <Circle size={12} bg="#1890FF" shadow={2}>
        <Icon as={<Ionicons name="play" size={24} />} size="md" color="white" />
      </Circle>
    </HStack>
  )
}

export default LearnOptions
