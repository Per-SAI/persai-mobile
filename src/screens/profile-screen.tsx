import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  SectionList,
  Pressable
} from 'react-native'
import React from 'react'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoLine}>
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
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  infoLine: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30
  },
  avt: {
    objectFit: 'cover',
    width: 80,
    height: 80,
    borderRadius: 60,
    borderWidth: 5,
    padding: 50,
    alignSelf: 'center'
  },

  avatarName: {
    marginTop: 26,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26
  },

  item: {},
  header: {
    margin: 24,
    marginLeft: 36,
    fontSize: 18,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 22
  },
  wrapperCustom: {
    padding: 16,
    paddingLeft: 22,

    marginVertical: 8,
    marginLeft: 32,
    marginRight: 32,
    borderRadius: 14
  }
})

const DATA = [
  {
    title: 'STUDY SET',
    data: ['MLN', 'CSI', 'PRM', 'VNR', 'SWD']
  }
]
export default ProfileScreen
