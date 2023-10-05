import { Center, Text, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { mixColor, mix } from 'react-native-redash'
import Question from './question'
import Animated from 'react-native-reanimated'
import { Dimensions, View } from 'react-native'

const { width: wWidth } = Dimensions.get('window')
const width = wWidth * 0.7
const height = width * (425 / 294)
const borderRadius = 24

type Props = {
  position: number
}

const Card = (props: Props) => {
  const { position } = props
  const backgroundColor = mixColor(position, '#C9E9E7', '#74BCB8')
  const translateY = mix(position, 0, -50)
  const scale = mix(position, 1, 0.9)
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
      <Center
        height="full"
        width="full"
      >
        <Question question="Goodbye to a world" />
      </Center>
    </Animated.View>
  )
}

export default Card
