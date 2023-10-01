import { ScrollView, VStack } from "native-base"
import ProgressNav from "../components/progress-nav"
import MultipleTestQuestionBox from "../components/multiple-test-question-box"

const MultipleTestScreen = () => {
  return(
    <ScrollView bg="#F4F6F8">
      <ProgressNav />
      <MultipleTestQuestionBox />
    </ScrollView>
  )
}

export default MultipleTestScreen