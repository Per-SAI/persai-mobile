import React, { useEffect, useState } from 'react'
import { MainScreenNavigationProp } from '..'
import { GET_ALL_STUDY_SET_URL, host } from '../constants/urls'
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  useSafeArea
} from 'native-base'
import { TouchableOpacity } from 'react-native'
const MainScreen = ({ navigation }: MainScreenNavigationProp) => {
  const [studySets, setStudySets] = useState<any[]>([])

  useEffect(() => {
    fetch(host + GET_ALL_STUDY_SET_URL)
      .then((response) => response.json())
      .then((data: any[]) => setStudySets(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2
  })
  return (
    <Box {...safeAreaProps} style={{ padding: 20 }}>
      <Heading fontSize="xl" p="4" pb="3" textAlign="center">
        Featured Study Set
      </Heading>
      <FlatList
        data={studySets}
        renderItem={({ item: studySet }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DividerQuestions')}
          >
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'muted.50'
              }}
              borderColor="muted.800"
              pl={['0', '4']}
              pr={['0', '5']}
              py="2"
            >
              <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar
                  size="48px"
                  source={{
                    uri: studySet.creator.userAvatar
                  }}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: 'warmGray.50'
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {studySet.studySetName}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200'
                    }}
                  >
                    {studySet.creator.userFullName}
                  </Text>
                </VStack>
                <Spacer />
                <Text
                  fontSize="xs"
                  _dark={{
                    color: 'warmGray.50'
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {studySet.createdAt}
                </Text>
              </HStack>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(studySet) => studySet.id}
      />
    </Box>
  )
}

export default MainScreen
