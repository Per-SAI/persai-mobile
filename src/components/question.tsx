import { Center, Image, Text } from 'native-base'

type Props = {
  question: string
  options: Array<string>
  image?: string
  alt?: string
}

const Question = (props: Props) => {
  const { question, options, image, alt } = props
  return (
    <Center width="90%">
      <Text color="#212B36" fontSize="16" fontWeight="semibold">
        {question}
      </Text>
      {options.map((ops, index) => (
        <Text color="#212B36" fontSize="16" fontWeight="semibold" key={index}>
          {ops}
        </Text>
      ))}
      <Text color="#212B36" fontSize="16" fontWeight="semibold"></Text>
      {image && (
        <Image source={{ uri: image }} size="xl" alt={alt ? alt : 'none'} />
      )}
    </Center>
  )
}

export default Question
