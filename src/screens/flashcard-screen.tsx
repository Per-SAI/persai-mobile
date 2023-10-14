import ProgressNav from '../components/progress-nav'
import Card from '../components/flashcard-question-box'
import { VStack, Center, ScrollView, Box, HStack, Button } from 'native-base'
import ProgressBar from '../components/progress-bar'
import LearnOptions from '../components/learn-options'
import { useState } from 'react'

const response = {
  id: 18,
  studySetName: 'Demodemo 8',
  feImageName:
    'http://persai-env-v1.ap-southeast-1.elasticbeanstalk.com/api/v1/image/StudySet-1697190118389',
  creator: {
    userId: 'c0327d44-88a1-464f-92b8-e25ee41bb1d4',
    userFullName: 'Việt Ngô',
    userEmail: 'ngoviett0202@gmail.com',
    userAvatar:
      'https://lh3.googleusercontent.com/a/ACg8ocJMMKVcd3UjvgCojV56WvnnYin_63WQyPhmZwQmDUpmOA=s96-c'
  },
  visibility: 'PUBLIC',
  status: true,
  createdAt: '2023-10-13T09:41:58.393015Z',
  updatedAt: '2023-10-13T09:41:58.413017Z',
  questionResponses: [
    {
      id: 46,
      question: '1 + 1 bang may ?',
      answers: ['1.0', '2.0', '3.0', '4.0'],
      correctAnswer: '2.0',
      fullGptAnswer: null,
      note: null,
      gptGenerated: false
    },
    {
      id: 47,
      question: '1 + 2 bang may ?',
      answers: ['1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0'],
      correctAnswer: 'Wait for GPT feature',
      fullGptAnswer: 'Wait for GPT feature',
      note: null,
      gptGenerated: true
    },
    {
      id: 48,
      question: '1 + 3 bang may ?',
      answers: ['1.0', '2.0', '3.0', '4.0', '5.0', '6.0'],
      correctAnswer: '4.0',
      fullGptAnswer: null,
      note: null,
      gptGenerated: false
    }
  ]
}

const FlashcardScreen = () => {
  const {questionResponses} = response
  const [current, setCurrent] = useState(0)

  const onPrevious = () => {
    if (current === 0) {
      setCurrent(0)
    } else {
      setCurrent(prev => prev - 1)
    }
  }
  
  const onNext = () => {
    const max = questionResponses.length
    if (current === max - 1) {
      setCurrent(max - 1)
    } else {
      setCurrent(prev => prev + 1)
    }
  }

  return (
    <ScrollView bg="#F4F6F8">
      <VStack alignItems="center" space={3}>
        <ProgressNav />
        <HStack top="50%" mx={3}>
          <Button onPress={onPrevious}>{'<'}</Button>
          <Center flex={1} justifyContent="center" alignItems="center">
            {/* {questionResponses.map((question) => {
              return <Card key={question.id} position={0} />
            })} */}
            <Card position={0} questions={questionResponses} current={current} />
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
          bottom="-150%"
          space={4}
        >
          <ProgressBar />
          <LearnOptions />
        </VStack>
      </VStack>
    </ScrollView>
  )
}

export default FlashcardScreen
