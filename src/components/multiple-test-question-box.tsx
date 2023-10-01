import { Box, Center, HStack, VStack, useBreakpointValue } from 'native-base'
import ShuffleIcon from './icons/shuffle-icon'
import StartIcon from './icons/start-icon'
import Question from './question'
import { Options } from './multitple-choice'
import { Button } from 'native-base'
import { AlertDialog } from 'native-base'
import React from 'react'

const QuestionBox = () => {
  const width = useBreakpointValue({
    lg: 'full'
  })

  return (
    <VStack
      borderColor="white"
      shadow={2}
      rounded="lg"
      borderWidth="1.5"
      bg="white"
      p={4}
      mb={4}
      space={6}
    >
      <HStack space={4}>
        <ShuffleIcon color="black" />
        <StartIcon color="black" />
      </HStack>
      <Box alignItems="center">
        <Question question="What is the funniest false thing you were able to convince others that's true?" />
        {/* Why this Box make things worse? */}
        {/* <Box flex={1}> */}
        <HStack space="1" flex={1} py={2} width={width} maxW={'20'} justifyContent={'center'}>
          {/* {components} */}
          <Options
            answer="What is the funniest false thing you were able to convince others that's true"
            key="1"
            no="1"
            background='gray.100'
          />
          <Options answer="hi" key="2" no="2" background='gray.100' />
        </HStack>
        <HStack space="1" flex={1} py={2} width={width}>
          <Options answer="hi" key="1" no="3" background='gray.100' />
          <Options answer="hi" key="2" no="4" background='gray.100' />
        </HStack>
        </Box>
      {/* </Box> */}
    </VStack>
  )
}

const useFlexDirection = (components: Array<React.ReactNode>) => {
  console.log(components.length)
  const flexDir = useBreakpointValue({
    base: components.length <= 2 ? 'column' : 'grid',
    lg: components.length <= 4 ? 'row' : 'grid'
  })
  return flexDir
}

const MultipleTestQuestionBox = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const onClose = () => setIsOpen(false)

  const cancelRef = React.useRef(null)

  // const components = [
  //   <Options
  //     answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum interdum nisi eu scelerisque. Aliquam vitae lobortis enim. Proin neque massa,"
  //     key="1"
  //   />,
  //   <Options answer="hi" key="2" />,
  //   <Options answer="hi" key="3" />,
  //   <Options answer="hi" key="4" />
  // ]

  // const flexDir = useFlexDirection(components)

  return (
    <Box safeAreaBottom={9} m={4}>
      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
      <QuestionBox />
      <Button
        colorScheme="green"
        shadow={2}
        onPress={() => setIsOpen(!isOpen)}
        color="white"
        fontWeight="bold"
        fontSize="md"
      >
        Submit
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Submit</AlertDialog.Header>
          <AlertDialog.Body>Do you want to submit?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="green" onPress={onClose}>
                Submit
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  )
}

export default MultipleTestQuestionBox
