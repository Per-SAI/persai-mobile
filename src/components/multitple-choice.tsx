import { VStack, Circle, Flex } from 'native-base'

type Props = {
  answer: string
  no?: string
}

const Options = (props: Props) => {
  const { answer, no } = props
  return (
    <Flex
      rounded="xl"
      background="white"
      py={3}
      _text={{ color: '#04297A', fontSize: '14', lineHeight: '22' }}
      flexDirection="row"
      align="center"
    >
      <Circle size="40px" bg="#DFE3E8" mx={4} _text={{ color: '#212B36' }}>
        {no}
      </Circle>
      {answer}
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
