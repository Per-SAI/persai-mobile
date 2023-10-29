import ProgressNav from '../components/progress-nav'
import Card from '../components/flashcard-question-box'
import {
  VStack,
  Center,
  HStack,
  Button,
  View,
  Text,
  Modal,
} from 'native-base'
import ProgressBar from '../components/progress-bar'
import LearnOptions from '../components/learn-options'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlashcardScreenNavigationProp } from '..'
import axios from '../constants/axios'
import { GET_STUDY_SET_BY_ID_URL } from '../constants/urls'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NumericInput from 'react-native-numeric-input'

import { Alert } from 'react-native'

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
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={0}
        {...props}
      />
    ),
    []
  )

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['5%', '50%'], [])

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
    bottomSheetModalRef.current?.expand()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [studySet, setStudySet] = useState<QuestionResponses[]>([])
  const [current, setCurrent] = useState<number>(0)
  const [started, setStarted] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [key, setKey] = useState<number>(0)

  const handleOnStartedSession = () => {
    setStarted((e) => !e)
    navigation.setOptions({
      tabBarStyle: { display: 'none' }
    })
  }

  const handleOnStopSession = () => {
    setStarted((e) => !e)
    navigation.setOptions({
      tabBarStyle: { display: 'flex' }
    })
  }

  const handleOnResetTimer = () => {
    setIsPlaying(false)
    setTime(0)
    setKey((prev) => prev + 1)
  }

  const handleOnStartTimer = () => {
    if (time <= 0) {
      Alert.alert('Time should be greater than 0.')
      return
    }
    setIsPlaying((prev) => !prev)
  }

  const handleOnCompleteTimer = () => {
    Alert.alert('Time complete')
    setTime(0)
    setIsPlaying(false)
    setKey((prev) => prev + 1)
    bottomSheetModalRef.current?.dismiss()
  }

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
    handlePresentModalPress()
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

  useEffect(() => {
    console.log(time)
  }, [time])

  return (
    <>
      <VStack alignItems="center" space={3} h="full" flex={1}>
        <ProgressNav
          handleOnStopSession={handleOnStopSession}
          handleOnStartedSession={handleOnStartedSession}
          openPomodoro={handlePresentModalPress}
          started={started}
        />
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
            <LearnOptions
              showOnUI={started}
              onStarted={handleOnStartedSession}
            />
          )}
        </VStack>
      </VStack>
      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            enableDismissOnClose={false}
            handleStyle={{ display: 'none' }}
          >
            <Center safeArea>
              <TouchableOpacity
                onPress={() => setModalVisible((prev) => !prev)}
              >
                <CountdownCircleTimer
                  key={key}
                  isPlaying={isPlaying}
                  duration={Math.round(time * 60)}
                  colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                  colorsTime={[7, 5, 2, 0]}
                  onComplete={handleOnCompleteTimer}
                >
                  {({ remainingTime }) => {
                    const hours = Math.floor(remainingTime / 3600)
                    const minutes = Math.floor((remainingTime % 3600) / 60)
                    const seconds = remainingTime % 60
                    return (
                      <Text>
                        {hours}:{minutes}:{seconds}
                      </Text>
                    )
                  }}
                </CountdownCircleTimer>
              </TouchableOpacity>

              <HStack mt={10} space={5}>
                {isPlaying ? (
                  <Button
                    variant="outline"
                    onPress={() => setIsPlaying((prev) => !prev)}
                    colorScheme="orange"
                  >
                    Pause
                  </Button>
                ) : (
                  <Button variant="outline" onPress={handleOnStartTimer}>
                    Start
                  </Button>
                )}

                <Button
                  variant="outline"
                  onPress={handleOnResetTimer}
                  colorScheme="danger"
                >
                  Reset
                </Button>
              </HStack>
            </Center>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Pomodoro</Modal.Header>
          <Modal.Body>
            <Center>
              <NumericInput
                onChange={(value) => setTime(value)}
                type="plus-minus"
                rounded={true}
                minValue={0}
                value={time}

              />
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                Set
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default FlashcardScreen
