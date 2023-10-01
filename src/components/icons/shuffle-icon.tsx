import { Icon } from "native-base"
import { Entypo } from '@expo/vector-icons'

type Props = {
  color?: string
}

const ShuffleIcon = (props: Props) => {
  const {color} = props
  return (
    <Icon as={<Entypo name="shuffle" size={24} />} size="md" color={color ? color : 'white'} />
  )
}

export default ShuffleIcon