import { Flex, HamburgerIcon, Menu, Pressable } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  handleOnStopSession: () => void
  handleOnStartedSession: () => void
  openPomodoro: () => void
  started: boolean
}

const ProgressNav = (props: Props) => {
  const { handleOnStopSession, handleOnStartedSession, openPomodoro, started } =
    props

  return (
    <SafeAreaView>
      <Flex direction="row" justify="flex-end" w="5/6" align="center">
        <Menu
          trigger={(triggerProps) => {
            console.log(triggerProps)
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <HamburgerIcon />
              </Pressable>
            )
          }}
        >
          <Menu.Item onPress={openPomodoro}>Open Pomodoro</Menu.Item>
          {started ? (
            <Menu.Item onPress={handleOnStopSession}>Unfocus</Menu.Item>
          ) : (
            <Menu.Item onPress={handleOnStartedSession}>Focus</Menu.Item>
          )}
        </Menu>
      </Flex>
    </SafeAreaView>
  )
}

export default ProgressNav
