import React from 'react'
import {
  Flex,
  Center,
  Heading,
  Button,
  Input,
  Stack,
  Text,
  useToast
} from 'native-base'
import { Alert } from 'react-native'
const CreateStudySet = () => {
  const toast = useToast()

  return (
    <Center mt={90}>
      <Heading size="md">Create new study set</Heading>
      <Stack space={4} w="75%" maxW="300px" mt="10">
        <Input variant="outline" placeholder="Study set name" />
        <Text textAlign="center">Input answers</Text>
        <Center>
          <Input variant="outline" placeholder="Enter question name" />

          <Flex direction="row">
            <Flex direction="column" mb="2.5" mt="1.5" w="50%">
              <Center size="16" w="100%">
                {' '}
                <Input variant="filled" placeholder="Answer A" />
              </Center>
              <Center size="16" w="100%">
                <Input variant="filled" placeholder="Answer B" />
              </Center>
            </Flex>
            <Flex direction="column" mb="2.5" mt="1.5" w="50%">
              <Center size="16" w="100%">
                {' '}
                <Input variant="filled" placeholder="Answer C" />
              </Center>
              <Center size="16" w="100%">
                <Input variant="filled" placeholder="Answer D" />
              </Center>{' '}
            </Flex>
          </Flex>
          <Button
            size="sm"
            colorScheme="default"
            bg="rgb(64, 192, 87)"
            w="40%"
            onPress={() =>
              toast.show({
                title: 'Save Successfully',
                placement: 'top-right',
                background: 'rgb(64, 192, 87)',
				mt:"1%"
              })
            }
          >
            Save
          </Button>
        </Center>
      </Stack>
    </Center>
  )
}

export default CreateStudySet
