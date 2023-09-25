import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import FlashcardScreen from './screens/flashcard-screen'

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
    </Drawer.Navigator>
  )
}

export default App
