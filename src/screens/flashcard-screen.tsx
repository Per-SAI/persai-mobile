import ProgressNav from '../components/progress-nav'
import Card from '../components/flashcard-question-box'
import { VStack, Center, ScrollView, Box } from 'native-base'
import ProgressBar from '../components/progress-bar'
import LearnOptions from '../components/learn-options'

const FlashcardScreen = () => {
  return (
    <ScrollView bg="#F4F6F8">
      <VStack alignItems="center" space={6} mt={6}>
        <ProgressNav />
        <Center flex={1} justifyContent="center" alignItems="center" top="90%">
          <Card position={1} />
          <Card position={0.5} />
          <Card position={0} />
        </Center>
        <VStack flex={1} justifyContent="center" justifyItems='center' w="full" bottom="-180%" space={4}>
          <ProgressBar />
          <LearnOptions />
        </VStack>
      </VStack>
    </ScrollView>
  )
}

export default FlashcardScreen
