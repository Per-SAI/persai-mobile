import { Center, Text, Icon } from 'native-base'
import { mixColor, mix } from 'react-native-redash'
import Question from './question'
import Animated from 'react-native-reanimated'
import { Dimensions, View } from 'react-native'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width: wWidth } = Dimensions.get('window')
const width = wWidth * 0.7
const height = width * (425 / 294)
const borderRadius = 24

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
  position: number
  questions: Array<QuestionResponses>
  current: number
}

const Card = (props: Props) => {
  const { position, questions, current } = props
  const [shownQuestion, setShownQuestion] = useState<string>()
  const [shownOptions, setShownOptions] = useState<string[]>([])
  const [flipped, setFlipped] = useState(false)
  const backgroundColor = mixColor(position, '#C9E9E7', '#74BCB8')
  const translateY = mix(position, 0, -30)
  const scale = mix(position, 1, 0.9)

  const handleFlip = () => {
    if (!flipped) {
      setShownQuestion(questions[current].correctAnswer)
      setShownOptions([])
      setFlipped((prev) => !prev)
    } else {
      setShownQuestion(questions[current].question)
      setShownOptions(questions[current].answers)
      setFlipped((prev) => !prev)
    }
  }

  useEffect(() => {
    setShownQuestion(questions[current].question)
    setShownOptions(questions[current].answers)
    setFlipped(false)
  }, [current])

  return (
    // <Center
    //   height="80%"
    //   width="80%"
    //   shadow="2"
    //   rounded="2xl"
    //   background="white"
    // >
    //   <Icon
    //     color="black"
    //     as={<Entypo name="sound" size={24} />}
    //     size="lg"
    //     position="absolute"
    //     top={4}
    //     right={4}
    //   />

    //   <Question question="Goodbye to a world" />
    // </Center>

    <Animated.View
      style={{
        backgroundColor,
        width,
        height,
        borderRadius,
        transform: [{ translateY }, { scale }],
        position: 'absolute'
      }}
    >
      <TouchableOpacity onPress={handleFlip}>
        <Center height="full" width="full">
          {shownQuestion && <Question question={shownQuestion} options={shownOptions} />}
        </Center>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Card
