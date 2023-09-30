import { Box, VStack } from 'native-base'

type Props = {
  question: string
}

const QuestionBox = (props: Props) => {
  const { question } = props
  return (
    <Box rounded="xl" background="white" p={4} _text={{ color: '#04297A', fontSize: '14', lineHeight: '22' }}>
      {question}
    </Box>
  )
}

const MultipleChoice = () => {
  return (
    <VStack space={'4'} flex={1} w="90%">
      <QuestionBox question="hehe" />
      <QuestionBox question="hehe" />
      <QuestionBox question="hehe" />
      <QuestionBox question="hehe" />
    </VStack>
  )
}

export default MultipleChoice
