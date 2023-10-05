import { Circle, HStack } from 'native-base'
import ShuffleIcon from './icons/shuffle-icon'
import StartIcon from './icons/start-icon'

const LearnOptions = () => {
  return (
    <HStack space={16} flex={1} justifyContent='center'>
      <Circle size={12} bg="#1890FF" shadow={2}>
        <ShuffleIcon />
      </Circle>
      <Circle size={12} bg="#1890FF" shadow={2}>
        <StartIcon />
      </Circle>
    </HStack>
  )
}

export default LearnOptions
