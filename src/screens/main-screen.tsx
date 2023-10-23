import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'native-base'
import { MainScreenNavigationProp } from '..'
import { VStack, Center } from 'native-base'
import { SafeAreaView } from 'react-native'
const MainScreen = ({ navigation }: MainScreenNavigationProp) => {
  const [studySets, setStudySets] = useState<any[]>([])

  useEffect(() => {
    fetch(
      'http://persai-env-v1.ap-southeast-1.elasticbeanstalk.com/api/v1/study-set'
    )
      .then((response) => response.json())
      .then((data: any[]) => setStudySets(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return (
    <ScrollView>
      <SafeAreaView>
      <Text style={{fontSize:20,textAlign:'center'}}>This is our featured courses</Text>
      <VStack space={4} alignItems="center" mt="4%">
        {studySets.map((studySet, index) => (
          <Center
            key={index}
            w="64"
            h="20"
            bg={`indigo.${index * 100}`}
            rounded="md"
            shadow={3}
          >
            <Text>{studySet.studySetName}</Text>
            <Text>Author: {studySet.creator.userFullName}</Text>
          </Center>
        ))}
      </VStack>
      </SafeAreaView>
    </ScrollView>
  )
}

export default MainScreen
