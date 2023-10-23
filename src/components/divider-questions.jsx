import React, { useState, useEffect } from 'react';
import { Heading, Box } from 'native-base';
import { Divider } from 'native-base';
import { Flex } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native';

export default function DividerQuestions() {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getStudySets = async () => {
    try {
      const token =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2dW9uZ3RyYW5kaWV1YW5oMTRAZ21haWwuY29tIiwicm9sZSI6IlNUVURFTlQiLCJpYXQiOjE2OTc2MTg2MzcsImV4cCI6MTY5NzYyNTgzN30.s0H16sCkp-1SK1bFm5mBeEeKMUUVCDmmTJqkDjxbNsTSEMpdoc3GRlFU9aoT_LpV6zILZ1WR81ObsfnaiHK6Tw'; // Replace with your authentication token
      const response = await fetch(
        `http://persai-env-v1.ap-southeast-1.elasticbeanstalk.com/api/v1/study-set/39`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getStudySets();
  }, []);

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
                  bg: 'muted.800',
                }}
                _dark={{
                  bg: 'muted.50',
                }}
              />
              <Heading py="2" width="20%" fontSize="14px">
                {question.correctAnswer}
              </Heading>
            </Flex>
          ))}
      </Box>
    </SafeAreaView>
  );
}
