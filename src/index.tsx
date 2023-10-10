import MainScreen from './screens/main-screen'
import UserInfoScreen from './screens/userinfo-screen'
import MyCollectionScreen from './screens/my-collection-screen'
import LoginScreen from './screens/login-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
const options = {
  headerShown: false
}

type RootStackParamList = {
  Login: undefined
  Main: undefined
  MyCollection: undefined
  MyInfo: undefined
}

const Tab = createBottomTabNavigator<RootStackParamList>()

// https://reactnavigation.org/docs/auth-flow/
const App = () => {
  return (
    <Tab.Navigator initialRouteName="Login" screenOptions={options}>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="MyCollection" component={MyCollectionScreen} />
      <Tab.Screen name="MyInfo" component={UserInfoScreen} />
      <Tab.Screen name="Login" options={{tabBarStyle: {display: 'none'}}} component={LoginScreen} />
    </Tab.Navigator>
  )
}

export default App
export type MainScreenNavigationProp = BottomTabScreenProps<
  RootStackParamList,
  'Main'
>
export type LoginScreenNavigationProp = BottomTabScreenProps<
  RootStackParamList,
  'Login'
>
