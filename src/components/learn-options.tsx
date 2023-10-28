import { Box, Button, Circle, HStack, Square } from 'native-base'
import ShuffleIcon from './icons/shuffle-icon'
import StartIcon from './icons/start-icon'
import { TouchableOpacity } from 'react-native'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  showOnUI: boolean
  onStarted: () => void
}

const LearnOptions = (props: Props) => {
  const { showOnUI, onStarted } = props
  if (!showOnUI)
    return (
      <HStack space={16} flex={1} justifyContent="center">
        {/* <Circle size={12} bg="#1890FF" shadow={2}>
        <ShuffleIcon />
      </Circle> */}

        <Square size={12} bg="#1890FF" shadow={2} borderRadius="sm" w="1/3">
          <Button variant="unstyled" size={12} w="full" onPress={onStarted}>
            <StartIcon />
          </Button>
        </Square>
      </HStack>
    )
  return <></>
}

export default LearnOptions
