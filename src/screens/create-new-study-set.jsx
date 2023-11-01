import { useEffect, useState } from 'react'
import {
  Flex,
  Center,
  Button,
  Input,
  Text,
  useToast,
  Fab,
  Checkbox,
  ScrollView,
  Image,
  Box,
  View,
  HStack
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { ActivityIndicator, Alert, SafeAreaView, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from '../constants/axios'
import {
  GET_CURRENT_LOGGED_USER_URL,
  POST_CREATE_NEW_STUDY_SET_URL
} from '../constants/urls'
import { Formik } from 'formik'
import { printError } from '../constants/axiosError'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateStudySet = () => {
  const toast = useToast()
  // const [contentList, setContentList] = useState([])
  const [imageUri, setImageUri] = useState('')
  const [name, setName] = useState('')
  const [subscription, setSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // const addContent = () => {
  //   const newContent = (
  //     <Center key={contentList.length + 1} w="75%">
  //       <Input variant="outline" placeholder="Enter question name" w={200} />
  //       <Flex direction="row" w="75%">
  //         <Flex direction="column" mb="2.5" mt="1.5" w="50%">
  //           <Center size="16" w="100%">
  //             <Input variant="filled" placeholder="Answer A" />
  //           </Center>
  //           <Center size="16" w="100%">
  //             <Input variant="filled" placeholder="Answer B" />
  //           </Center>
  //         </Flex>
  //         <Flex direction="column" mb="2.5" mt="1.5" w="50%">
  //           <Center size="16" w="100%">
  //             <Input variant="filled" placeholder="Answer C" />
  //           </Center>
  //           <Center size="16" w="100%">
  //             <Input variant="filled" placeholder="Answer D" />
  //           </Center>
  //         </Flex>
  //       </Flex>
  //     </Center>
  //   )

  //   setContentList([...contentList, newContent])
  // }

  const handleCreateNewStudySet = async (questionList) => {
    if (!imageUri || !name || !questionList) {
      Alert.alert('Missing component!!')
      return
    }

    for (let i = 0; i < questionList.length; i++) {
      const correctAnswer = questionList[i].correctAnswer
      const answers = questionList[i].answers
      const question = questionList[i].question
      if (correctAnswer === undefined || correctAnswer === '') {
        Alert.alert('Please choose an correct answer.')
        return
      }
      for (let index = 0; index < answers.length; index++) {
        const element = answers[index]
        if (!element) {
          Alert.alert('Please insert options.')
          return
        }
      }
      if (!question) {
        Alert.alert('Please insert a question.')
        return
      }
    }

    for (let i = 0; i < questionList.length; i++) {
      questionList[i].correctAnswer =
        questionList[i].answers[questionList[i].correctAnswer]
    }
    console.log('uri: ', imageUri)
    console.log('Study set name: ', name)
    console.log('data: ', questionList)
    try {
      const formData = new FormData()
      const create_study_set_request = {
        studySetName: name,
        visibility: 'PRIVATE',
        questionsList: questionList
      }
      formData.append('image', {
        uri: imageUri.replace('file://', ''),
        type: 'image/jpg',
        name: 'image.jpg'
      })
      formData.append(
        'create_study_set_request',
        JSON.stringify(create_study_set_request)
      )
      const res = await axios.post(POST_CREATE_NEW_STUDY_SET_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res) {
        if (res.status === 200) {
          Alert.alert('Create Successfully!')
        }
      }
    } catch (error) {
      printError(error)
    }
  }

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ quality: 0 })
    setImageUri(result.assets[0].uri)
  }

  const createQuestion = () => ({
    question: '',
    answer: ['', '', '', ''],
    correctAnswer: ''
  })

  useEffect(() => {
    const boostrap = async () => {
      const subscription = await JSON.parse(
        await AsyncStorage.getItem('@subscription')
      )
      setSubscription(subscription)
      setIsLoading(false)
    }
    boostrap()
  }, [])

  if (isLoading) return <ActivityIndicator />

  return (
    <>
      <ScrollView>
        <SafeAreaView
          style={{ width: '100%', marginTop: '20%', alignItems: 'center' }}
        >
          <Text textAlign="center" fontWeight="700" fontSize="18">
            Create new study set
          </Text>
          <Button onPress={handleUploadImage} w="200" h="160">
            {imageUri ? (
              <Image
                w="200"
                h="160"
                source={{ uri: imageUri }}
                alt="image uri"
              />
            ) : (
              <Text>Upload Image</Text>
            )}
          </Button>
          {subscription.currentSubscriptionId === 'PRO' ? (
            <Flex flexDirection="row" justifyContent="flex-start" m={5}>
              <Checkbox
                value="test"
                accessibilityLabel="This is a dummy checkbox"
                aria-label="checkbox"
              />
              <Text ml={2}>Private study set</Text>
            </Flex>
          ) : null}

          <Center>
            <TextInput
              placeholder="Study Set Name"
              value={name}
              onChangeText={setName}
            />
          </Center>
          <Center>
            <Flex direction="column" w="100%" justifyContent="center">
              <Formik
                initialValues={{
                  questionsList: [
                    {
                      question: '',
                      answers: ['', '', '', ''],
                      correctAnswer: ''
                    }
                  ]
                }}
                onSubmit={async (values) =>
                  await handleCreateNewStudySet(values.questionsList)
                }
              >
                {(props) => {
                  const markCorrectAnswer = (index, position) => {
                    const newArray = [...props.values.questionsList]
                    newArray[index].correctAnswer = position
                    console.log(newArray)
                    props.setFieldValue('questionsList', newArray)
                    return
                  }
                  return (
                    <View>
                      {props.values.questionsList.map((item, index) => (
                        <Center key={index}>
                          <Box>
                            <TextInput
                              placeholder="Question"
                              onChangeText={props.handleChange(
                                `questionsList[${index}].question`
                              )}
                              onBlur={props.handleBlur(
                                `questionsList[${index}].question`
                              )}
                              value={props.values.questionsList[index].question}
                            />
                            <Flex direction="row" w="75%">
                              <Flex
                                direction="column"
                                mb="2.5"
                                mt="1.5"
                                w="50%"
                              >
                                <Center size="16" w="100%">
                                  <Input
                                    variant="filled"
                                    placeholder="Answer A"
                                    borderColor={
                                      item.correctAnswer === 0
                                        ? 'green.400'
                                        : 'gray.100'
                                    }
                                    onChangeText={props.handleChange(
                                      `questionsList[${index}].answers[0]`
                                    )}
                                  />
                                  <Button
                                    onPress={() => markCorrectAnswer(index, 0)}
                                  >
                                    Mark
                                  </Button>
                                </Center>
                                <Center size="16" w="100%">
                                  <Input
                                    variant="filled"
                                    placeholder="Answer B"
                                    borderColor={
                                      item.correctAnswer === 1
                                        ? 'green.400'
                                        : 'gray.100'
                                    }
                                    onChangeText={props.handleChange(
                                      `questionsList[${index}].answers[1]`
                                    )}
                                  />
                                  <Button
                                    onPress={() => markCorrectAnswer(index, 1)}
                                  >
                                    Mark
                                  </Button>
                                </Center>
                              </Flex>
                              <Flex
                                direction="column"
                                mb="2.5"
                                mt="1.5"
                                w="50%"
                              >
                                <Center size="16" w="100%">
                                  <Input
                                    variant="filled"
                                    placeholder="Answer C"
                                    borderColor={
                                      item.correctAnswer === 2
                                        ? 'green.400'
                                        : 'gray.100'
                                    }
                                    onChangeText={props.handleChange(
                                      `questionsList[${index}].answers[2]`
                                    )}
                                  />
                                  <Button
                                    onPress={() => markCorrectAnswer(index, 2)}
                                  >
                                    Mark
                                  </Button>
                                </Center>
                                <Center size="16" w="100%">
                                  <Input
                                    variant="filled"
                                    placeholder="Answer D"
                                    borderColor={
                                      item.correctAnswer === 3
                                        ? 'green.400'
                                        : 'gray.100'
                                    }
                                    onChangeText={props.handleChange(
                                      `questionsList[${index}].answers[3]`
                                    )}
                                  />
                                  <Button
                                    onPress={() => markCorrectAnswer(index, 3)}
                                  >
                                    Mark
                                  </Button>
                                </Center>
                              </Flex>
                            </Flex>
                          </Box>
                        </Center>
                      ))}
                      <Flex
                        flexDirection="row"
                        w="1/3"
                        justifyContent="center"
                        alignSelf="center"
                      >
                        <Button
                          size="sm"
                          colorScheme="default"
                          bg="rgb(64, 192, 87)"
                          w="70%"
                          onPress={props.handleSubmit}
                        >
                          Create
                        </Button>

                        <Button
                          size="sm"
                          colorScheme="default"
                          bg="rgb(64, 192, 87)"
                          w="70%"
                          mx={2}
                          onPress={() => {
                            props.setFieldValue('questionsList', [
                              ...props.values.questionsList,
                              createQuestion()
                            ])
                          }}
                        >
                          +
                        </Button>

                        <Button
                          size="sm"
                          colorScheme="default"
                          bg="rgb(64, 192, 87)"
                          w="70%"
                          onPress={() => {
                            const newArray = props.values.questionsList.pop()
                            props.setFieldValue('questionList', newArray)
                          }}
                        >
                          -
                        </Button>
                      </Flex>

                      {/* <Fab
                      renderInPortal={false}
                      size="sm"
                      icon={<AntDesign name="plus" size={18} color="white" />}
                      onPress={() => {
                        props.setFieldValue('questionsList', [
                          ...props.values.questionsList,
                          createQuestion()
                        ])
                      }}
                    /> */}
                    </View>
                  )
                }}
              </Formik>
            </Flex>
          </Center>
          <Center flexDirection="row" justifyContent="center" mb="10%"></Center>
        </SafeAreaView>
      </ScrollView>
    </>
  )
}

export default CreateStudySet
