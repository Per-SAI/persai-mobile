import ProgressNav from '../components/progress-nav'
import Card from '../components/flashcard-question-box'
import { VStack, Center, HStack, Button, View } from 'native-base'
import ProgressBar from '../components/progress-bar'
import LearnOptions from '../components/learn-options'
import { useEffect, useState } from 'react'
import { FlashcardScreenNavigationProp } from '..'
import axios from '../constants/axios'
import { GET_STUDY_SET_BY_ID_URL } from '../constants/urls'

type QuestionResponses = {
  id: number
  question: string
  answers: Array<string>
  correctAnswer: string
  fullGptAnswer: null
  note: string | null
  gptGenerated: boolean
}

type Props = {
  id: number
  studySetName: string
  feImageName: string
  creator: {
    userId: string
    userFullName: string
    userEmail: string
    userAvatar: string
  }
  visibility: string
  status: boolean
  createdAt: string
  updatedAt: string
  questionResponses: Array<QuestionResponses>
} | null

const FlashcardScreen = ({
  navigation,
  route
}: FlashcardScreenNavigationProp) => {
  const [studySet, setStudySet] = useState<QuestionResponses[]>([])
  const [current, setCurrent] = useState(0)
  const [started, setStarted] = useState(false)

  const handleOnStarted = () => {
    setStarted((e) => !e)
  }

  console.log(started)

  useEffect(() => {
    const getStudySet = async () => {
      try {
        const id = route.params.id
        const link = `${GET_STUDY_SET_BY_ID_URL}/${id}`
        const data = await axios.get(link)
        if (data) {
          setStudySet(data.data.questionResponses)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getStudySet()
  }, [route.params.id])

  const onPrevious = () => {
    if (studySet) {
      if (current === 0) {
        setCurrent(0)
      } else {
        setCurrent((prev) => prev - 1)
      }
    }
  }

  const onNext = () => {
    if (studySet) {
      const max = studySet.length
      if (current === max - 1) {
        setCurrent(max - 1)
      } else {
        setCurrent((prev) => prev + 1)
      }
    }
  }

  return (
    <VStack alignItems="center" space={3} h="full">
      <ProgressNav showOnUI={started} />
      <HStack top="50%" mx={3}>
        <Button onPress={onPrevious}>{'<'}</Button>
        <Center flex={1} justifyContent="center" alignItems="center">
          {studySet.length >= 1 && (
            <Card position={0} questions={studySet} current={current} />
          )}
          {/* <Card position={1} />
            <Card position={0.5} />
            <Card position={0} /> */}
        </Center>
        <Button onPress={onNext}>{'>'}</Button>
      </HStack>

      <VStack
        flex={1}
        justifyContent="center"
        justifyItems="center"
        w="full"
        bottom="-50%"
        space={4}
      >
        {started ? (
          <View flex={1}>
            <ProgressBar current={current} total={studySet.length} />
          </View>
        ) : (
          <LearnOptions showOnUI={started} onStarted={handleOnStarted} />
        )}
      </VStack>
    </VStack>
  )
}

export default FlashcardScreen
