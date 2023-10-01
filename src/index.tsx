import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import FlashcardScreen from './screens/flashcard-screen'
import LearnScreen from './screens/learn-screen'
import MultipleTestScreen from './screens/multiple-test-screen'

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
      <Drawer.Screen name="Flashcard" component={FlashcardScreen} />
      <Drawer.Screen name="Learn" component={LearnScreen} />
      <Drawer.Screen name="MultipleTest" component={MultipleTestScreen} />
    </Drawer.Navigator>
  )
}

export default App
