import React, { useEffect, useState } from 'react'
import { AdminUserNavigationProp } from '../..'
import {
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
import { GET_ALL_USER_URL } from '../../constants/urls'
import axios from '../../constants/axios'

const AdminUser = ({ navigation }: AdminUserNavigationProp) => {
  const [user, setUser] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const filteredStudents = user.filter((item) => item.role === "STUDENT");

  
  useEffect(() => {
    const getAllUser = async () => {
      console.info('Calling', GET_ALL_USER_URL)
      try {
        const data = await axios.get(GET_ALL_USER_URL)
        // console.log(data)
        if (data.data) {
          setUser(data.data)
        }
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch MY_COLLECTION', error)
        setLoading(false)
      }
    }

    getAllUser()
  }, [])
  return (
    <ScrollView mt={20}>
      <Text fontWeight={700} fontSize={20} textAlign='center'>
        User Management
      </Text>

      {loading ? (
        <Center flex={1} justifyContent="center" alignItems="center" mt="80%">
          <ActivityIndicator size="large" color="#00ff00" />
        </Center>
      ) : (
        filteredStudents.map((item, index) => (
          <Center>
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
              key={item.id}
              onPress={() => {
                navigation.navigate('AdminSubscription')
              }}
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
                    uri: item.feImageName
                  }}
                  alt="bg"
                />
              </HStack>
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
                    {item.email}
                  </Text>
                  <Text fontSize={12} fontWeight="medium" color="black">
                    {item.role}
                  </Text>
                </Flex>
              </Flex>
            </Pressable>
          </Center>
        ))
      )}
    </ScrollView>
  )
}

export default AdminUser
