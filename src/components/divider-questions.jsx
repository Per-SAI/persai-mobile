import React, { useState, useEffect } from 'react'
import { Heading, Box } from 'native-base'
import { Divider, Button } from 'native-base'
import { Flex } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from '../constants/axios'
import { GET_STUDY_SET_BY_ID_URL } from '../constants/urls'

export default function DividerQuestions({ route, navigation }) {
  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const getStudySets = async () => {
      try {
        const id = route.params.id
        const response = await axios.get(`${GET_STUDY_SET_BY_ID_URL}/${id}`)
        if (response.data) {
          setData(response.data)
          setSelectedId(id)
        }
      } catch (error) {
        console.error(error)
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
    <SafeAreaView>
      <Box w="260">
        {data.questionResponses &&
          data.questionResponses.map((question, index) => (
            <Flex
              key={index}
              mx="3"
              direction="row"
              justify="space-between"
              h="100"
              w="150%"
              mb="10"
              bg="white"
              borderRadius="10"
              style={{ backgroundColor: '#DDDDDD' }}
            >
              <Heading p="2" width="60%" fontSize="16px" h="200%">
                {question.question}
              </Heading>
              <Divider
                orientation="vertical"
                mx="3"
                _light={{
                  bg: 'muted.800'
                }}
                _dark={{
                  bg: 'muted.50'
                }}
              />
              <Heading py="2" width="20%" fontSize="14px">
                {question.correctAnswer}
              </Heading>
            </Flex>
          ))}
      </Box>
    </SafeAreaView>
  )
}
