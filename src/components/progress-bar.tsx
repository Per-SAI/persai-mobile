import { Box, Center, Progress } from 'native-base'

type Props = {
  current: number
  total: number
}

const ProgressBar = (props: Props) => {
  const { current, total } = props
  return (
    <Center w="100%">
      <Box w="60%" maxW="300">
        <Progress
          value={((current + 1) / total) * 100}
          mx="2"
          size="xs"
          bg="primary.300"
        />
      </Box>
    </Center>
  )
}

export default ProgressBar
