import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Keyboard
} from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { Clipboard } from 'react-native'
import { border } from 'native-base/lib/typescript/theme/styled-system'
const ProfileScreen = () => {
  const [text, onChangeText] = React.useState('')
  const email = 'e6d55773885a'
  const copyIt = () => Clipboard.setString(email)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <View style={styles.infoLine}>
        <Image
          style={styles.avt}
          source={{
            uri: 'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/378527200_3396876093940633_2094362321451650403_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=fe8171&_nc_ohc=lpzjfDAVimQAX87L1kr&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfDFQKIEltmSN3xJobdxNFUoAUOhQs4l6ha0uBLJSTYT_Q&oe=652C54A2'
          }}
        />
        <Text style={styles.avatarName}>Đinh Long Hoàng</Text>
      </View>

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'
              },
              styles.wrapperCustom
            ]}
          >
            {({ pressed }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item}</Text>
              </View>
            )}
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      /> */}
        <View style={styles.headerInfo}>
          <View style={styles.headerInfo_Text}>
            <Text>Hi, Đinh Hoàng Long</Text>
            <Text style={styles.welcomeText}>Welcome back</Text>
          </View>
          <Image
            style={styles.avt}
            source={{
              uri: 'https://w.wallhaven.cc/full/jx/wallhaven-jxl31y.png'
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
              4 days left
            </Text>
            <Text style={{ color: 'white', fontSize: 30, marginTop: 64 }}>
              340 / $20
            </Text>
            <Text style={{ color: 'wheat' }}>
              Payment for upcoming charging session
            </Text>
          </View>
        </View>
        <View style={styles.detailSection}>
          <View
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 30,
              rowGap: 20
            }}
          >
            <Text style={styles.titleBox}>Your referral code</Text>

            <Pressable style={styles.detailBox} onPress={copyIt}>
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
                e6d55773885a
              </Text>
            </Pressable>
            <Text style={styles.titleBox}>Enter you invitation code</Text>

            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Input here ..."
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
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
    objectFit: 'cover',
    width: 68,
    height: 68,
    borderRadius: 60
  },
  welcomeText: { fontWeight: 'bold', fontSize: 30 },
  paymentCard: {
    flex: 2,
    backgroundColor: 'black',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    height: 200
  },
  cardBackground: {
    flex: 2
  },
  cardTextBox: { position: 'absolute', padding: 24 },
  detailSection: {
    flex: 3,

    paddingTop: 10,
    paddingBottom: 200
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
    shadowOpacity: 0.89,
    shadowRadius: 12,
    elevation: 4
  },
  titleBox: {
    width: '100%',
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 16,
    paddingTop: 24,
    color: 'black'
  },
  input: {
    height: 40,
    textAlign: 'left',
    width: '100%',
    margin: 12,
    borderBottomWidth: 1,
    borderColor: '#00AB55',
    fontSize: 20,
    fontWeight: '500'
  }
})

const DATA = [
  {
    title: 'STUDY SET',
    data: ['MLN', 'CSI', 'PRM', 'VNR', 'SWD']
  }
]
export default ProfileScreen
