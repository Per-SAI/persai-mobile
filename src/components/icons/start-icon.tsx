import { Icon } from "native-base"
import { Ionicons } from '@expo/vector-icons'

const StartIcon = () => {
  return (
    <Icon as={<Ionicons name="play" size={24} />} size="md" color="white" />
  )
}

export default StartIcon