import { VStack, Circle, Flex, Text, View } from 'native-base'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DataContext from '../context/DataContext'

type Props = {
  answer: string
  no: number
  background?: string
  id: number
  setPressed: Dispatch<SetStateAction<number | null>> | null
}

const Options = (props: Props) => {
  const { answer, no, background, id, setPressed } = props

  const { handleOnUpdateSession } = useContext(DataContext)

  const handlePress = () => {
    if (handleOnUpdateSession && setPressed) {
      handleOnUpdateSession(id, answer)
      setPressed(no)
    }
  }

  return (
    <Flex
      rounded="xl"
      backgroundColor={background ? background : 'white'}
      py={3}
      _text={{ color: '#04297A', fontSize: '14', lineHeight: '22' }}
      flexDirection="row"
      align="center"
      w="45%"
      wrap="wrap"
      my={1}
    >
      <TouchableOpacity onPress={handlePress}>
        <Circle size="40px" bg="#DFE3E8" mx={4} _text={{ color: '#212B36' }}>
          {no}
        </Circle>
        <Text p={2}>{answer}</Text>
      </TouchableOpacity>
    </Flex>
  )
}

const MultipleChoice = () => {
  return (
    <VStack space={'4'} flex={1} w="90%">
      <Options answer="Answer 1" no="1" />
      <Options answer="Answer 2" no="2" />
      <Options answer="Answer 3" no="3" />
      <Options answer="Answer 4" no="4" />
    </VStack>
  )
}

export default MultipleChoice
export { Options }
