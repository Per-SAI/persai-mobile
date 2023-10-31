import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  GET_CURRENT_LOGGED_USER_URL,
  PUT_CURRENT_LOGGED_USER_URL,
  PUT_REFERRAL_CODE_URL
} from '../constants/urls'
import { Button, Center, Flex, Modal } from 'native-base'
import * as Linking from 'expo-linking'
import axios from '../constants/axios'
import { isAxiosError } from 'axios'

type userData = {
  createdAt: Date
  earnedMoney: number
  email: string
  enabled: boolean
  feImageName: string
  fullName: string
  gptRemainingUsage: number
  id: string
  referralCode: {
    referenceNumber: number
    referralCode: string
    usingReferralCode: boolean
  }
  role: 'STUDENT'
  status: string
  subscription: {
    currentSubscriptionId: string
    expiredDatetime: Date
    paidSubscriptionId: string
    paidType: string
  }
  theme: 'DEFAULT'
  updatedAt: Date
}

const ProfileScreen = () => {
  const [invitationCode, setInvitationCode] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { authState } = useAuth()
  const [userData, setUserData] = useState<userData | null>(null)
  const [updatedName, setUpdatedName] = useState<string>('')
  const [displayedName, setDisplayedName] = useState<string>('')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [size, _] = useState<string>('xs')

  useEffect(() => {
    const boostrap = async () => {
      if (authState) {
        const { accessToken } = authState
        console.log(accessToken)
        const res = await axios.get(GET_CURRENT_LOGGED_USER_URL)
        if (res.data) {
          setUserData(res.data)
          setDisplayedName(res.data.fullName)
          console.log(res.data)
          setIsLoading(false)
        }
      }
    }

    boostrap()
  }, [])

  const handleOnUpdateName = async () => {
    if (updatedName.length >= 8 && updatedName.length <= 50) {
      try {
        const res = await axios.put(PUT_CURRENT_LOGGED_USER_URL, {
          fullName: updatedName,
          theme: 'DEFAULT'
        })
        if (res.status === 200) {
          setDisplayedName(updatedName)
          setModalVisible(false)
          Alert.alert('Name Updated.')
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      Alert.alert('Name should contains at least 8 and at most 50 characters.')
      return
    }
  }

  const copyToClipboard = async () => {
    if (userData) {
      await Clipboard.setStringAsync(userData.referralCode.referralCode)
      Alert.alert('Copied.')
    }
  }

  const handleSubmitInvitationCode = async () => {
    if (invitationCode) {
      try {
        const res = await axios.put(PUT_REFERRAL_CODE_URL, {
          referralCode: invitationCode
        })
        if (res.status === 200) {
          Alert.alert(
            "Congratulations! You've got 15 days of premium. Sign out is required to take effect!"
          )
          return
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (error?.response?.status === 400) {
            Alert.alert('Invitation code not found.')
            return
          }
        }
      }
    }
  }

  if (isLoading || userData === null)
    return (
      <Center flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#00ff00" />
      </Center>
    )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerInfo}>
          <View style={styles.headerInfo_Text}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Flex flexDirection="row" mt={4}>
              <Text>{displayedName},</Text>
              <Button
                mt={-3}
                variant="link"
                onPress={() => setModalVisible((prev) => !prev)}
              >
                Edit
              </Button>
            </Flex>
          </View>
          <Image
            style={styles.avt}
            source={{
              uri: userData.feImageName
            }}
          />
        </View>
        <View style={styles.paymentCard}>
          <Image
            style={styles.cardBackground}
            source={{
              uri: 'https://i.pinimg.com/564x/f2/69/81/f26981df59567c089b154a33011e1c0a.jpg'
            }}
          />
          <View style={styles.cardTextBox}>
            <Text
              style={{
                backgroundColor: '#DADADA',
                width: 100,
                borderRadius: 16,
                padding: 6,
                color: 'black',
                textAlign: 'center'
              }}
            >
              {userData.subscription.currentSubscriptionId} PLAN
            </Text>
            {userData.subscription.currentSubscriptionId === 'PRO' ? (
              <>
                <Text style={{ color: 'white', fontSize: 24, marginTop: 86 }}>
                  Expired At{' '}
                  {new Date(
                    userData.subscription.expiredDatetime
                  ).toDateString()}
                </Text>
                {/* <Text style={{ color: 'wheat' }}>
                  Payment for upcoming charging session
                </Text> */}
              </>
            ) : (
              <Button
                mt={2}
                variant="subtle"
                onPress={() => Linking.openURL('https://me.momo.vn/PerSai')}
              >
                Upgrade Now!
              </Button>
            )}
          </View>
        </View>
        <View style={styles.detailSection}>
          <View
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              rowGap: 20
            }}
          >
            <Text style={styles.titleBox}>Your referral code</Text>

            <Pressable style={styles.detailBox} onPress={copyToClipboard}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',

                  justifyContent: 'space-between'
                }}
              ></View>
              <Text
                style={{
                  padding: 18,
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                {userData.referralCode.referralCode}
              </Text>
            </Pressable>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Flex flexDirection='row' justifyContent='space-between'>
              <TextInput
                style={styles.input}
                onChangeText={setInvitationCode}
                value={invitationCode}
                placeholder="Invitation code"
              />
              <Button onPress={handleSubmitInvitationCode} w='20%' h='50%' mt={5} bg='rgb(64, 192, 87)' borderRadius={10}>Submit</Button>
              </Flex>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={size}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Change your name</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <TextInput
                placeholder="Your name"
                onChangeText={(text) => setUpdatedName(text)}
                value={updatedName}
              ></TextInput>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                Cancel
              </Button>
              <Button onPress={handleOnUpdateName}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'column'
  },

  headerInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  headerInfo_Text: {
    marginTop: 8,
    paddingBottom: 24
  },
  avt: {
    marginTop: 18,
    objectFit: 'cover',
    width: 68,
    height: 68,
    borderRadius: 60
  },
  welcomeText: { fontWeight: 'bold', fontSize: 30 },
  paymentCard: {
    flex: 2,
    backgroundColor: 'black',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    height: 200
  },
  cardBackground: {
    flex: 2,
    opacity: 0.6
  },
  cardTextBox: { position: 'absolute', padding: 24 },
  detailSection: {
    flex: 3
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailBox: {
    width: '100%',

    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: 'white',
    borderColor: 'white',

    shadowColor: '#00ff11',
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4
  },
  titleBox: {
    width: '100%',
    fontSize: 18,
    textAlign: 'left',
    // paddingLeft: 16,
    paddingTop: 24,
    color: 'black',
    marginBottom: '4%'
  },
  input: {
    height: 40,
    textAlign: 'left',
    width: '78%',
    // margin: 12,
    borderBottomWidth: 1,
    borderColor: '#00AB55',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: '5%',
    marginTop: '5%'
  }
})

const DATA = [
  {
    title: 'STUDY SET',
    data: ['MLN', 'CSI', 'PRM', 'VNR', 'SWD']
  }
]
export default ProfileScreen
