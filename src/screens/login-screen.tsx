import { Text } from 'react-native'
import { Image, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { LoginScreenNavigationProp } from '..'
import { useAuth } from '../context/AuthContext'
import { VStack, Center } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const LoginScreen = ({ navigation }: LoginScreenNavigationProp) => {
  const { onLogin } = useAuth()

  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
`
  const logo = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2482.72 1076.43"><defs><style>.cls-1{fill:url(#linear-gradient);}.cls-2{fill:url(#linear-gradient-2);}.cls-3{fill:url(#linear-gradient-3);}.cls-4{fill:url(#linear-gradient-4);}.cls-5{fill:url(#linear-gradient-5);}.cls-6{fill:url(#linear-gradient-6);}.cls-7{fill:url(#linear-gradient-7);}.cls-8{fill:url(#linear-gradient-8);}</style><linearGradient id="linear-gradient" x1="375.24" y1="528.68" x2="507.76" y2="396.17" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6189ce"/><stop offset="0.15" stop-color="#6e91c0"/><stop offset="0.42" stop-color="#819dad"/><stop offset="0.7" stop-color="#8ba4a2"/><stop offset="1" stop-color="#8fa69e"/></linearGradient><linearGradient id="linear-gradient-2" x1="174.93" y1="791.36" x2="700.29" y2="266" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-3" x1="942.02" y1="828.52" x2="942.02" y2="484.56" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-4" x1="1276.33" y1="821.64" x2="1276.33" y2="485.93" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-5" x1="1570.75" y1="828.52" x2="1570.75" y2="335.28" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-6" x1="1979.7" y1="821.64" x2="1979.7" y2="340.1" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-7" x1="2295.09" y1="821.64" x2="2295.09" y2="340.1" xlink:href="#linear-gradient"/><linearGradient id="linear-gradient-8" x1="1145.81" y1="228.89" x2="1145.81" y2="828.53" gradientTransform="translate(95.55 -0.02)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#57e382"/><stop offset="0.19" stop-color="#51de7f"/><stop offset="0.43" stop-color="#40ce76"/><stop offset="0.71" stop-color="#25b568"/><stop offset="1" stop-color="#019455"/></linearGradient></defs><path class="cls-1" d="M540.74,461.53c0,51.64-36.44,77.83-90.14,77.83H385.92V385.86h69.5C518.05,385.86,540.74,425.08,540.74,461.53Z"/><path class="cls-2" d="M610.56,228.88H264.66a126.83,126.83,0,0,0-126.9,126.8v346a126.83,126.83,0,0,0,126.9,126.8h345.9a126.83,126.83,0,0,0,126.9-126.8v-346A126.82,126.82,0,0,0,610.56,228.88ZM449.88,626h-64V780.74h-99.7V299.21H477.4c124.54,0,167.15,79.77,167.15,159.65C644.55,573,566.82,626,449.88,626Z"/><path class="cls-3" d="M943.74,484.56c109.38,0,172.66,63.29,172.66,184.36v15.13H865.32c7.56,47.47,59.84,67.42,112.13,67.42,50.9,0,67.41-6.19,102.49-19.26l1.38,78.42c-28.2,12.38-79.11,17.89-116.95,17.89-110.75,0-196.74-50.22-196.74-172C767.63,549.22,846.05,484.56,943.74,484.56Zm-75,129.33h150c-5.5-35.77-34.39-54.35-73.61-54.35C901.77,559.54,876.32,582.93,868.75,613.89Z"/><path class="cls-4" d="M1372.29,589.81c-5.5-2.06-15.13-3.44-20.64-3.44-43.34,0-76.36,22.7-76.36,70.86V821.64H1179V491.44h95.62v66l3.44.69a43.37,43.37,0,0,1,4.12-12.39c22-40.58,50.22-59.85,91.5-59.85Z"/><path class="cls-5" d="M1423.88,714.32c35.08,13.07,73.61,23.39,111.44,23.39,37.15,0,95.62-6.88,95.62-51.59,0-34.4-34.39-43.34-66.73-53-79.8-26.14-157.53-46.78-157.53-151.34,0-100.44,83.92-146.53,179.55-146.53,42,0,81.17,3.44,125.2,15.82l-2.75,86.68c-33.71-10.32-64.67-19.26-101.13-19.26-37.83,0-98.37,4.13-98.37,55,0,37.84,48.84,48.16,75,56.41,77.74,24.77,150.66,48.16,150.66,145.84,0,112.82-81.18,152.72-183.68,152.72-43.33,0-94.93-4.13-134.83-17.89Z"/><path class="cls-6" d="M2055.37,712.26H1897.15l-28.89,109.38h-97.68l139-481.54h142.4l136.9,481.54H2083.57Zm-136.21-82.55H2034L1979.7,419.89a40.6,40.6,0,0,1-1.37-11.69h-2.07a40.6,40.6,0,0,1-1.37,11.69Z"/><path class="cls-7" d="M2245.22,340.1H2345V821.64h-99.75Z"/><path class="cls-8" d="M540.74,461.53c0,51.64-36.44,77.83-90.14,77.83H385.92V385.86h69.5C518.05,385.86,540.74,425.08,540.74,461.53Z"/><path class="cls-8" d="M610.56,228.88H264.66a126.83,126.83,0,0,0-126.9,126.8v346a126.83,126.83,0,0,0,126.9,126.8h345.9a126.83,126.83,0,0,0,126.9-126.8v-346A126.82,126.82,0,0,0,610.56,228.88ZM449.88,626h-64V780.74h-99.7V299.21H477.4c124.54,0,167.15,79.77,167.15,159.65C644.55,573,566.82,626,449.88,626Z"/><path class="cls-8" d="M943.74,484.56c109.38,0,172.66,63.29,172.66,184.36v15.13H865.32c7.56,47.47,59.84,67.42,112.13,67.42,50.9,0,67.41-6.19,102.49-19.26l1.38,78.42c-28.2,12.38-79.11,17.89-116.95,17.89-110.75,0-196.74-50.22-196.74-172C767.63,549.22,846.05,484.56,943.74,484.56Zm-75,129.33h150c-5.5-35.77-34.39-54.35-73.61-54.35C901.77,559.54,876.32,582.93,868.75,613.89Z"/><path class="cls-8" d="M1372.29,589.81c-5.5-2.06-15.13-3.44-20.64-3.44-43.34,0-76.36,22.7-76.36,70.86V821.64H1179V491.44h95.62v66l3.44.69a43.37,43.37,0,0,1,4.12-12.39c22-40.58,50.22-59.85,91.5-59.85Z"/><path class="cls-8" d="M1423.88,714.32c35.08,13.07,73.61,23.39,111.44,23.39,37.15,0,95.62-6.88,95.62-51.59,0-34.4-34.39-43.34-66.73-53-79.8-26.14-157.53-46.78-157.53-151.34,0-100.44,83.92-146.53,179.55-146.53,42,0,81.17,3.44,125.2,15.82l-2.75,86.68c-33.71-10.32-64.67-19.26-101.13-19.26-37.83,0-98.37,4.13-98.37,55,0,37.84,48.84,48.16,75,56.41,77.74,24.77,150.66,48.16,150.66,145.84,0,112.82-81.18,152.72-183.68,152.72-43.33,0-94.93-4.13-134.83-17.89Z"/><path class="cls-8" d="M2055.37,712.26H1897.15l-28.89,109.38h-97.68l139-481.54h142.4l136.9,481.54H2083.57Zm-136.21-82.55H2034L1979.7,419.89a40.6,40.6,0,0,1-1.37-11.69h-2.07a40.6,40.6,0,0,1-1.37,11.69Z"/><path class="cls-8" d="M2245.22,340.1H2345V821.64h-99.75Z"/></svg>`
  return (
    <VStack
      space={4}
      alignItems="center"
      style={{
        display: 'flex',
        height: '100%',
        marginTop: '10%',
        padding: '10%',
        width: '100%'
      }}
    >
      <Center w="64" h="20" bg="none" rounded="md" shadow={3} mt="2%">
        <SvgXml xml={logo} style={styles.svg} />
      </Center>
      <Center
        w="64"
        h="20"
        bg="transparent"
        rounded="md"
        shadow={3}
        mt="50%"
        mb="10%"
      >
        <Image
          source={require('../../assets/study1.png')}
          style={{
            height: '400%',
            width: '100%'
          }}
        />
        <Text
          style={{ display: 'flex', marginBottom: '10%', marginTop: '10%' }}
        >
          <Text style={styles.introText}>Start learning with </Text>
          <Text
            style={{
              color: '#00AB55',
              height: '60%',
              fontWeight: '800',
              fontSize: 30,
              marginLeft: '80%',
              width: '42%'
            }}
          >
            Persai
          </Text>
        </Text>
        <Text style={styles.intro}>
          Welcome to the next-generation, online learning platform.
        </Text>
      </Center>
      <Center
        w="70"
        h="20"
        bg="transparent"
        rounded="md"
        shadow={3}
        mt="60%"
        style={styles.loginGG}
      >
        <Text
          onPress={onLogin}
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {/* <SvgXml xml={xml} style={{ height: 21, width: 20 }} /> */}
          <Text style={{ fontSize: 15, height: 25, color: 'gray' }}>
            Login with Gmail account
          </Text>
        </Text>
      </Center>
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: '2%'
  },
  svg: {
    height: '200%',
    width: '100%',
    fill: '#00AB55'
  },
  loginGG: {
    height: '8%',
    width: '100%',
    borderRadius: 16,
    borderWidth: 0.2,
    borderColor: '#00AB55',
    backgroundColor: '#5BE584',
    shadowColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    color: 'white'
  },
  introText: {
    fontSize: 18,
    width: '80%',
    fontWeight: '600',
    height: '27%'
  }
})
export default LoginScreen
{
}
