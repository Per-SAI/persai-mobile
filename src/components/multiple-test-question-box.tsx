import { Box, Center, HStack, VStack, useBreakpointValue } from 'native-base'
import StartIcon from './icons/start-icon'
import Question from './question'
import { Options } from './multitple-choice'
import { Button } from 'native-base'
import { AlertDialog } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import DataContext, { DataProvider } from '../context/DataContext'
import { ActivityIndicator } from 'react-native'
import axios from '../constants/axios'
import { GET_STUDY_SET_BY_ID_URL } from '../constants/urls'

type Props = {
  id: number
}

type dataType = {
  answers: Array<string>
  correctAnswer: string
  fullGptAnswer?: null
  gptGenerated?: boolean
  id: number
  note?: string | null
  question: string
}

type SingleBoxProps = {
  data: dataType
}

type QuestionBoxProps = {
  data: dataType
}

const SingleBox = ({ data }: SingleBoxProps) => {
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

const QuestionBox = ({ data }: QuestionBoxProps) => {
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

const Layout = ({ id }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { setStudySet, handleOnSubmit, mode, resetSession } =
    useContext(DataContext)

  const onClose = () => setIsOpen(false)
  const [data, setData] = useState<dataType[] | []>([])
  const cancelRef = React.useRef(null)

  useEffect(() => {
    const bootstrap = async () => {
      if (setStudySet && id) {
        try {
          const link = `${GET_STUDY_SET_BY_ID_URL}/${id}`
          const res = await axios.get(link)
          if (res) {
            setData(res.data.questionResponses)
            setStudySet(res.data.questionResponses)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    bootstrap()
  }, [id])

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
          {data.map((item, index) => (
            <QuestionBox data={item} key={index} />
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

const MultipleTestQuestionBox = ({ id }: Props) => {
  return (
    <DataProvider>
      <Layout id={id} />
    </DataProvider>
  )
}

export default MultipleTestQuestionBox
