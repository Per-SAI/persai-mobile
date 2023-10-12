import MainScreen from './screens/main-screen'
import UserInfoScreen from './screens/userinfo-screen'
import MyCollectionScreen from './screens/my-collection-screen'
import LoginScreen from './screens/login-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Button } from 'native-base'
import { AuthProvider, useAuth } from './context/AuthContext'
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
// https://www.youtube.com/watch?v=9vydY9SDtAo
const App = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  )
}

const Layout = () => {
  const { authState, onLogout } = useAuth()

  return (
    <Tab.Navigator screenOptions={options}>
      {authState?.authenticated ? (
        <>
          <Tab.Screen name="Main" component={MainScreen}  />
          <Tab.Screen name="MyCollection" component={MyCollectionScreen} />
          <Tab.Screen
            name="MyInfo"
            component={UserInfoScreen}
            options={{
              headerRight: () => <Button onPress={onLogout} variant='link'>Sign Out</Button>,
              headerShown: true,
              title: 'My Information'
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Login"
          options={{ tabBarStyle: { display: 'none' } }}
          component={LoginScreen}
        />
      )}
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
