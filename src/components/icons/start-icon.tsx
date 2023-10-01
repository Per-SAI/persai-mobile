import { Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  color?: string
}

const StartIcon = (props: Props) => {
  const { color } = props
  return (
    <Icon
      as={<Ionicons name="play" size={24} />}
      size="md"
      color={color ? color : 'white'}
    />
  )
}

export default StartIcon
