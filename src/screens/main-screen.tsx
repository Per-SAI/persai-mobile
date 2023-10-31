import React, { useEffect, useState } from 'react'
import { MainScreenNavigationProp } from '..'
import { GET_ALL_STUDY_SET_URL, host } from '../constants/urls'
import {
  Box,
  HStack,
  Text,
  Spacer,
  Pressable,
  Flex,
  Image,
  ScrollView,
  Center
} from 'native-base'
import { ActivityIndicator } from 'react-native'
const MainScreen = ({ navigation }: MainScreenNavigationProp) => {
  const [studySets, setStudySets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(host + GET_ALL_STUDY_SET_URL)
      .then((response) => response.json())
      .then((data: any[]) => {
        setStudySets(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  return (
    <ScrollView>
      {loading ? (
        <Center flex={1} justifyContent="center" alignItems="center" mt="100%">
          <ActivityIndicator size="large" color="#00ff00" />
        </Center>
      ) : (
        <Box
          alignItems="center"
          w="100%"
          display="flex"
          flexDirection="column"
          mt="20"
        >
          {studySets.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                navigation.navigate('DividerQuestions', {
                  id: item.id
                })
              }}
              rounded="8"
              overflow="hidden"
              borderWidth="1"
              borderColor="coolGray.300"
              maxW="96"
              shadow="3"
              bg="coolGray.100"
              p="5"
              mb={4}
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
                  style={{ resizeMode: 'contain', marginTop: '20%' }}
                  source={{
                    uri: item.creator.userAvatar
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
                {item.title}
              </Text>
              <Text mt="2" fontSize="sm" color="coolGray.700">
                {item.description}
              </Text>
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
                    {item.studySetName}
                  </Text>
                  <Text fontSize={12} fontWeight="medium" color="black">
                    {new Date(item.createdAt).toLocaleString()}
                  </Text>
                </Flex>
              </Flex>
            </Pressable>
          ))}
        </Box>
      )}
    </ScrollView>
  )
}

export default MainScreen
