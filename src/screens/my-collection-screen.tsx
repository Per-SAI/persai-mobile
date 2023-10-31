import {
  Box,
  Center,
  Container,
  Flex,
  Text,
  ScrollView,
  Button,
  HStack,
  Image,
  Spacer,
  Pressable
} from 'native-base'
import { useEffect, useState } from 'react'
import axios from '../constants/axios'
import { MY_COLLECTION_URL } from '../constants/urls'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
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
  const [loading, setLoading] = useState(true)
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
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch MY_COLLECTION', error)
        setLoading(false)
      }
    }

    getMyCollection()
  }, [])

  return (
    <ScrollView>
      <Center safeArea>
        <Container w="100%" mt={3} mb={5}>
          <Button
            onPress={() => navigation.navigate('CreateStudySet')}
            bg="rgb(64, 192, 87)"
          >
            Create New
          </Button>
        </Container>
        {loading ? (
          <Center flex={1} justifyContent="center" alignItems="center" mt="80%">
            <ActivityIndicator size="large" color="#00ff00" />
          </Center>
        ) : (
          collections.map((col: StudySet) => (
            <Pressable
              rounded="8"
              overflow="hidden"
              borderWidth="1"
              borderColor="coolGray.300"
              maxW="96"
              shadow="3"
              bg="coolGray.100"
              p="5"
              mb={4}
              key={col.id}
              onPress={() => handleNavigateFlashcard(col.id)}
            >
              <HStack
                style={{
                  alignItems: 'center',
                  width: '80%',
                  marginBottom: '10%'
                }}
                h={100}
              >
                <Spacer />
                <Image
                  w="300%"
                  h="150%"
                  style={{ resizeMode: 'cover', marginTop: '20%' }}
                  source={{
                    uri: col.creator.userAvatar
                  }}
                  alt="bg"
                />
              </HStack>
              <Text
                color="coolGray.800"
                mt="3"
                fontWeight="medium"
                fontSize="xl"
              >
                {col.studySetName}
              </Text>
              <Text mt="2" fontSize="sm" color="coolGray.700"></Text>
              <Flex
                style={{
                  position: 'absolute',
                  bottom: '0%',
                  height: '40%',
                  width: '100%',
                  backgroundColor: 'rgba(232, 232, 232, 5)'
                }}
              >
                <Flex style={{ flexDirection: 'column', padding: '2%' }}>
                  <Text fontSize={16} fontWeight="medium" color="black">
                    {col.studySetName}
                  </Text>
                  <Text fontSize={12} fontWeight="medium" color="black">
                    {col.creator.userFullName}
                  </Text>
                </Flex>
              </Flex>
            </Pressable>
          ))
        )}
      </Center>
    </ScrollView>
  )
}

export default MyCollectionScreen
