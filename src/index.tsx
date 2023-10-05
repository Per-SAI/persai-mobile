import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import FlashcardScreen from './screens/flashcard-screen'
import LearnScreen from './screens/learn-screen'
import MultipleTestScreen from './screens/multiple-test-screen'
import MyCollectionScreen from './screens/my-collection-screen'
import LoginScreen from './screens/login-screen'
const options = {
  headerShown: false
}

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={options}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Flashcard" component={FlashcardScreen} />
      <Drawer.Screen name="Learn" component={LearnScreen} />
      <Drawer.Screen name="MultipleTest" component={MultipleTestScreen} />
      <Drawer.Screen name="MyCollection" component={MyCollectionScreen} />
    </Drawer.Navigator>
  )
}

export default App
