import { View, Text } from 'react-native'
import React from 'react'
import { Heading, Box } from 'native-base'
// import Box from './Box'
import { Divider } from 'native-base'
import { Flex } from 'native-base'
export default function DividerQuestions() {
  const questionResponses = [
    {
      id: 46,
      question:
        '1 + 1 bang may ?deeifurffn fejueueueuueueueioeeoowoeieeieueueueuue',
      answers: ['1.0', '2.0', '3.0', '4.0'],
      correctAnswer: '2.0'
    },
    {
      id: 47,
      question: '1 + 2 bang may ?',
      answers: ['1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0'],
      correctAnswer: 'Wait for GPT feature'
    },
    {
      id: 48,
      question: '1 + 3 bang may ?',
      answers: ['1.0', '2.0', '3.0', '4.0', '5.0', '6.0'],
      correctAnswer: '4.0'
    }
  ]

  return (
    <Box mt="15%">
      <Box w="260">
        {questionResponses.map((response, index) => (
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
              {response.question}
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
              {response.correctAnswer}
            </Heading>
          </Flex>
        ))}
      </Box>
    </Box>
  )
}
