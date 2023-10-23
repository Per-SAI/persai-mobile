import {
  Box,
  Center,
  Container,
  Flex,
  Text,
  ScrollView,
  Button
} from 'native-base'
import { useEffect, useState } from 'react'
import axios from '../constants/axios'
import { MY_COLLECTION_URL } from '../constants/urls'
import { TouchableOpacity } from 'react-native'
import { MyCollectionNavigationProp } from '..'

type StudySet = {
  id: number
  studySetName: string
  feImageName: string
  creator: {
    userId: string
    userFullName: string
    userEmail: string
    userAvatar: string
  }
  visibility: string
  createdAt: Date
  updatedAt: Date
}

const MyCollectionScreen = ({ navigation }: MyCollectionNavigationProp) => {
  const [collections, setCollections] = useState([])

  const handleNavigateFlashcard = (id: number) => {
    navigation.navigate('DividerQuestions', { id })
  }

  useEffect(() => {
    const getMyCollection = async () => {
      console.info('Calling', MY_COLLECTION_URL)
      try {
        const data = await axios.get(MY_COLLECTION_URL)
        if (data.data) {
          setCollections(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch MY_COLLECTION', error) 
      }
    }

    getMyCollection()
  }, [])

  return (
    <ScrollView>
      <Center safeArea>
        <Container w="100%" mt={3}>
          <Button onPress={() => navigation.navigate('CreateStudySet')}>
            Create New
          </Button>
        </Container>
        {collections.map((col: StudySet) => (
          <TouchableOpacity
            key={col.id}
            onPress={() => handleNavigateFlashcard(col.id)}
          >
            <Container w="100%" my={2} bg="white" p={5}>
              <Flex
                borderColor="white"
                borderRadius="md"
                borderWidth={2}
                w="100%"
              >
                <Text fontWeight="medium">{col.studySetName}</Text>
              </Flex>
              <Text>Author: {col.creator.userFullName}</Text>
            </Container>
          </TouchableOpacity>
        ))}
      </Center>
    </ScrollView>
  )
}

export default MyCollectionScreen
