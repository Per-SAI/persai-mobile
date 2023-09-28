import ProgressNav from '../components/progress-nav'
import FlashcardQuestion from '../components/flashcard-question'
import { VStack, ScrollView } from 'native-base'
import ProgressBar from '../components/progress-bar'
import LearnOptions from '../components/learn-options'

const FlashcardScreen = () => {
  return (
    <ScrollView bg="#F4F6F8">
      <VStack alignItems="center" space={6} mt={6}>
        <ProgressNav />
        <FlashcardQuestion />
        <ProgressBar />
        <LearnOptions />
      </VStack>
    </ScrollView>
  )
}

export default FlashcardScreen
