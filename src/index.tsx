import MainScreen from './screens/main-screen'
import ProfileScreen from './screens/profile-screen'
import MyCollectionScreen from './screens/my-collection-screen'
import LoginScreen from './screens/login-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Button } from 'native-base'
import { AuthProvider, useAuth } from './context/AuthContext'
import FlashcardScreen from './screens/flashcard-screen'
import DividerQuestions from './components/divider-questions'
const options = {
  headerShown: false
}

type RootStackParamList = {
  Login: undefined
  Main: undefined
  MyCollection: undefined
  MyInfo: undefined
  Flashcard: { id: number }
  DividerQuestions:undefined
}

const Tab = createBottomTabNavigator<RootStackParamList>()
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
          <Tab.Screen name="Main" component={MainScreen} />
          <Tab.Screen
            name="DividerQuestions"
            component={DividerQuestions}
            options={{
              headerRight: () => (
                <Button onPress={onLogout} variant="link">
                  Sign Out
                </Button>
              ),
              headerShown: true,
              title: 'Study Set'
            }}
          />
          <Tab.Screen name="MyCollection" component={MyCollectionScreen} />
          <Tab.Screen
            name="MyInfo"
            component={ProfileScreen}
            options={{
              headerRight: () => (
                <Button onPress={onLogout} variant="link">
                  Sign Out
                </Button>
              ),
              headerShown: true,
              title: 'Profile'
            }}
          />
          <Tab.Screen name="Flashcard" component={FlashcardScreen} />
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

export type FlashcardScreenNavigationProp = BottomTabScreenProps<
  RootStackParamList,
  'Flashcard'
>

export type MyCollectionNavigationProp = BottomTabScreenProps<
  RootStackParamList,
  'MyCollection'
>
export type DividerQuestionsNavigationProp = BottomTabScreenProps<
  RootStackParamList,
  'DividerQuestions'
>