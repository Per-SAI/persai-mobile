import { ScrollView, VStack } from 'native-base'
import ProgressNav from '../components/progress-nav'
import Question from '../components/question'
import MultipleChoice from '../components/multitple-choice'
import ProgressBar from '../components/progress-bar'
import LearnOptions from '../components/learn-options'

const LearnScreen = () => {
  return (
    <ScrollView bg="#F4F6F8">
      <VStack alignItems="center" space="6" mt="3">
        <ProgressNav />
        <Question question="Goodbye to a world" image="https://static.wikia.nocookie.net/mushokutensei/images/e/eb/Eris_LN.png/revision/latest?cb=20200709112846" />
        <MultipleChoice />
        <LearnOptions />
      </VStack>
    </ScrollView>
  )
}

export default LearnScreen
