import { useState } from 'react'
import {
  Flex,
  Center,
  Heading,
  Button,
  Input,
  Stack,
  Text,
  useToast,
  Fab,
  Checkbox,
  ScrollView
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
const CreateStudySet = () => {
  const toast = useToast()

  const [contentList, setContentList] = useState([])
  const addContent = () => {
    const newContent = (
      <Center key={contentList.length} w="75%">
        <Input variant="outline" placeholder="Enter question name" w={200} />
        <Flex flexDirection="row" justifyContent="flex-start" mt={5}>
          <Checkbox
            value="test"
            accessibilityLabel="This is a dummy checkbox"
          />
          <Text ml={2}>Private study set</Text>
        </Flex>
        <Flex direction="row" w="75%">
          <Flex direction="column" mb="2.5" mt="1.5" w="50%">
            <Center size="16" w="100%">
              <Input variant="filled" placeholder="Answer A" />
            </Center>
            <Center size="16" w="100%">
              <Input variant="filled" placeholder="Answer B" />
            </Center>
          </Flex>
          <Flex direction="column" mb="2.5" mt="1.5" w="50%">
            <Center size="16" w="100%">
              <Input variant="filled" placeholder="Answer C" />
            </Center>
            <Center size="16" w="100%">
              <Input variant="filled" placeholder="Answer D" />
            </Center>
          </Flex>
        </Flex>
        <Center flexDirection="row" justifyContent="center" mb="10%">
          <Button
            size="sm"
            colorScheme="default"
            bg="rgb(64, 192, 87)"
            w="70%"
            onPress={() => {
              toast.show({
                title: 'Save Successfully',
                placement: 'top-right',
                background: 'rgb(64, 192, 87)',
                mt: '1%'
              })
            }}
          >
            Save
          </Button>
        </Center>
      </Center>
    )

    setContentList([...contentList, newContent])
  }

  return (
    <ScrollView>
      <SafeAreaView
        style={{ width: '100%', marginTop: '20%', alignItems: 'center' }}
      >
        <Text textAlign="center" fontWeight="700" fontSize="18">
          Create new study set
        </Text>

        <Fab
          mb={-4}
          renderInPortal={false}
          right={10}
          size="sm"
          icon={<AntDesign name="plus" size={18} color="white" />}
          onPress={addContent}
        />
        <Center>
          <Flex direction="column" w="100%" justifyContent="center">
            {contentList}
          </Flex>
        </Center>
      </SafeAreaView>
    </ScrollView>
  )
}

export default CreateStudySet
