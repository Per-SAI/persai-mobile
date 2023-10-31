import {
  Button,
  Center,
  HStack,
  Modal,
  ScrollView,
  View,
  Text
} from 'native-base'
import ProgressNav from '../components/progress-nav'
import MultipleTestQuestionBox from '../components/multiple-test-question-box'
import { useCallback, useMemo, useRef, useState } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableOpacity
} from '@gorhom/bottom-sheet'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import NumericInput from 'react-native-numeric-input'
import { Alert } from 'react-native'
import { MultipleChoiceNavigationProp } from '..'

const MultipleTestScreen = ({ navigation }: MultipleChoiceNavigationProp) => {
  const [started, setStarted] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [key, setKey] = useState<number>(0)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
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

  return (
    <>
      <ScrollView bg="#F4F6F8" contentInsetAdjustmentBehavior="automatic">
        <ProgressNav
          handleOnStartedSession={handleOnStartedSession}
          handleOnStopSession={handleOnStopSession}
          started={started}
          openPomodoro={handlePresentModalPress}
        />
        <MultipleTestQuestionBox />
      </ScrollView>
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

export default MultipleTestScreen
