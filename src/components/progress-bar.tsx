import { Box, Center, Progress } from "native-base";

const ProgressBar = () => {
  return(
    <Center w="100%">
      <Box w="60%" maxW="300">
        <Progress value={45} mx="2" size="xs" bg="primary.300" />
      </Box>
    </Center>
  )
}

export default ProgressBar;