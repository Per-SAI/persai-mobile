import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Heading, Box } from 'native-base'
import { Image } from 'native-base'
import { StyleSheet } from 'react-native'
import { Divider } from 'native-base'
import { Flex } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native'
export default function DividerQuestions() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getStudySets = async () => {
    try {
      const token =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2dW9uZ3RyYW5kaWV1YW5oMTRAZ21haWwuY29tIiwicm9sZSI6IlNUVURFTlQiLCJpYXQiOjE2OTc1NTM3OTcsImV4cCI6MTY5NzU2MDk5N30.6J8ftAeK1iMg6eRUx8dzFdksqNK5xaWDlEoHNJQQfsbzm7TmX4Mr_vuW4aoZrpcz_uZTjLttDcDjYpFbRDU5pQ'
      const response = await fetch(
        `http://persai-env-v1.ap-southeast-1.elasticbeanstalk.com/api/v1/study-set/39`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const json = await response.json()
      console.log(json)
      setData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStudySets()
  }, [])

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text> {JSON.stringify(data)}</Text>
	  
    </View>
  )
}
