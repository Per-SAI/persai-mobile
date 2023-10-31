import React, { useState, useEffect } from 'react'
import { Heading, Box, ScrollView, Center,Divider, Button,Flex  } from 'native-base'
import { ActivityIndicator } from 'react-native'

import axios from '../constants/axios'
import { GET_STUDY_SET_BY_ID_URL } from '../constants/urls'

export default function DividerQuestions({ route, navigation }) {
  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getStudySets = async () => {
      try {
        const id = route.params.id
        const response = await axios.get(`${GET_STUDY_SET_BY_ID_URL}/${id}`)
        if (response.data) {
          setData(response.data)
          setSelectedId(id)
        }
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    getStudySets()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      tabBarItemStyle: { display: 'none' },
      headerRight: () => {
        return (
          <Button
            variant="link"
            onPress={() => {
              navigation.navigate('Flashcard', { id: selectedId })
            }}
          >
            Study
          </Button>
        )
      }
    })
  }, [navigation, selectedId])

  return (
    <ScrollView>
      {isLoading ? (
        <Center flex={1} justifyContent="center" alignItems="center" mt="80%">
          <ActivityIndicator size="large" color="#00ff00" />
        </Center>
      ) : (
        <Box w="260">
          {data.questionResponses &&
            data.questionResponses.map((question, index) => (
              <Flex
                key={index}
                mx="3"
                padding={3}
                direction="row"
                justifyContent="center"
                h="40"
                w="150%"
                mb="10"
                bg="white"
                borderRadius="10"
                style={{ backgroundColor: '#DDDDDD' }}
              >
                <Heading p="2" width="60%" fontSize="14px" flex={1.5}>
                  {question.question}
                </Heading>
                <Divider
                  orientation="vertical"
                  mx="3"
                  _light={{
                    bg: 'gray.400'
                  }}
                  _dark={{
                    bg: 'muted.50'
                  }}
                />
                <Heading
                  py="2"
                  width="60%"
                  fontSize="12px"
                  flex={1}
                  textAlign="center"
                  alignItems="center"
                  style={{ fontWeight: '500' }}
                >
                  {question.correctAnswer}
                </Heading>
              </Flex>
            ))}
        </Box>
      )}
    </ScrollView>
  )
}
