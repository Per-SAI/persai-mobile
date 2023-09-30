import { Center, Image, Text } from 'native-base'

type Props = {
  question: string,
  image?: string,
  alt?: string
}

const Question = (props: Props) => {
  const {question, image, alt} = props
  return (
    <Center width="90%">
      <Text color="light.800" fontSize="14">
        {question}
      </Text>
      {image && (
        <Image source={{uri: image}} size="xl" alt={alt ? alt : "none"} />
      )}
    </Center>
  )
}

export default Question
