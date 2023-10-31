import { Box, Center, HStack, VStack, useBreakpointValue } from 'native-base'
import StartIcon from './icons/start-icon'
import Question from './question'
import { Options } from './multitple-choice'
import { Button } from 'native-base'
import { AlertDialog } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import DataContext, { DataProvider } from '../context/DataContext'
import { ActivityIndicator } from 'react-native'

type Props = {
  data: {
    answers: Array<string>
    correctAnswer: string
    fullGptAnswer?: null
    gptGenerated?: boolean
    id: number
    note?: string | null
    question: string
  }
}

const data = [
  {
    answers: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    correctAnswer: 'choice 1',
    fullGptAnswer: null,
    gptGenerated: false,
    id: 114,
    note: null,
    question: 'question 1'
  },
  {
    answers: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    correctAnswer: 'choice 1',
    fullGptAnswer: null,
    gptGenerated: false,
    id: 115,
    note: null,
    question: 'question 2'
  },
  {
    answers: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    correctAnswer: 'choice 1',
    fullGptAnswer: null,
    gptGenerated: false,
    id: 116,
    note: null,
    question: 'question 3'
  },
  {
    answers: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    correctAnswer: 'choice 1',
    fullGptAnswer: null,
    gptGenerated: false,
    id: 117,
    note: null,
    question: 'question 4'
  }
]

const SingleBox = ({ data }: Props) => {
  const { question, answers, id } = data
  const [pressed, setPressed] = useState<number | null>(null)
  const { session, mode } = useContext(DataContext)

  const setBackground = (id: number, ans: string) => {
    if (session) {
      for (let i = 0; i < session.length; i++) {
        const element = session[i]
        if (element.id === id) {
          const { selectedAnswer, correctAnswer } = element
          if (ans === correctAnswer) {
            return 'green.300'
          }
          if (ans === selectedAnswer) {
            return 'red.300'
          } else {
            return 'gray.100'
          }
        }
      }
    }
  }

  if (mode === 'RESULT') {
    return (
      <Box alignItems="center">
        <Question question={question} />
        <HStack
          space="2"
          flex={1}
          pl={5}
          justifyContent={'flex-start'}
          maxH="500"
          flexWrap="wrap"
        >
          {/* {components} */}
          {answers.map((ans, index) => (
            <Options
              answer={ans}
              key={index}
              id={id}
              no={index}
              background={setBackground(id, ans)}
              setPressed={null}
            />
          ))}
        </HStack>
      </Box>
    )
  }

  return (
    <Box alignItems="center">
      <Question question={question} />
      <HStack
        space="2"
        flex={1}
        pl={5}
        justifyContent={'flex-start'}
        maxH="500"
        flexWrap="wrap"
      >
        {/* {components} */}
        {answers.map((ans, index) => (
          <Options
            answer={ans}
            key={index}
            id={id}
            no={index}
            background={pressed === index ? 'blue.300' : 'gray.100'}
            setPressed={setPressed}
          />
        ))}
      </HStack>
      {/* <HStack space="1" flex={1} py={2}>
        <Options answer="hi" key="1" no="3" background="gray.100" />
        <Options answer="hi" key="2" no="4" background="gray.100" />
      </HStack> */}
    </Box>
  )
}

const QuestionBox = (props: Props) => {
  const { data } = props

  const width = useBreakpointValue({
    lg: 'full'
  })

  return (
    <VStack
      borderColor="white"
      shadow={2}
      rounded="lg"
      borderWidth="1.5"
      bg="white"
      p={4}
      mb={4}
      space={6}
      w={width}
    >
      <HStack space={4}>
        {/* <ShuffleIcon color="black" /> */}
        <StartIcon color="black" />
      </HStack>
      <SingleBox data={data} />
    </VStack>
  )
}

const useFlexDirection = (components: Array<React.ReactNode>) => {
  console.log(components.length)
  const flexDir = useBreakpointValue({
    base: components.length <= 2 ? 'column' : 'grid',
    lg: components.length <= 4 ? 'row' : 'grid'
  })
  return flexDir
}

const Layout = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { setStudySet, handleOnSubmit, mode, resetSession } =
    useContext(DataContext)

  const onClose = () => setIsOpen(false)

  const cancelRef = React.useRef(null)

  useEffect(() => {
    if (setStudySet) {
      setStudySet(data)
    }
  }, [data])

  const handleOnPressSubmit = () => {
    if (handleOnSubmit) {
      onClose()
      handleOnSubmit()
    }
  }

  const handleOnPressTryAgain = () => {
    if (resetSession) {
      resetSession()
    }
  }

  if (mode === 'SESSION')
    return (
      <>
        <Box safeAreaBottom={9} m={4}>
          {data.map((item) => (
            <QuestionBox data={item} key={item.id} />
          ))}
          <Button
            colorScheme="green"
            shadow={2}
            onPress={() => setIsOpen(!isOpen)}
            color="white"
            fontWeight="bold"
            fontSize="md"
          >
            Submit
          </Button>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Submit</AlertDialog.Header>
              <AlertDialog.Body>Do you want to submit?</AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="green" onPress={handleOnPressSubmit}>
                    Submit
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Box>
      </>
    )
  else if (mode === 'RESULT')
    return (
      <Box safeAreaBottom={9} m={4}>
        {data.map((item) => (
          <QuestionBox data={item} key={item.id} />
        ))}
        <Button colorScheme="green" onPress={handleOnPressTryAgain}>
          Try Again
        </Button>
      </Box>
    )
  else {
    return (
      <Center flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#00ff00" />
      </Center>
    )
  }
}

const MultipleTestQuestionBox = () => {
  return (
    <DataProvider>
      <Layout />
    </DataProvider>
  )
}

export default MultipleTestQuestionBox
