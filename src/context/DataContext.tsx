import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from 'react'

type Props = {
  children: React.ReactNode
}

type studySetProps = {
  answers: Array<string>
  correctAnswer: string
  fullGptAnswer?: null
  gptGenerated?: boolean
  id: number
  note?: string | null
  question: string
}

type sessionProps = {
  id: number
  selectedAnswer: string
  correctAnswer: string
}

type DataContextTypes = {
  session?: sessionProps[]
  setSession?: Dispatch<SetStateAction<sessionProps[]>>
  setStudySet?: (data: studySetProps[]) => void
  handleOnUpdateSession?: (id: number, selectedAnswer: string) => void
  handleOnSubmit?: () => void
  mode?: 'SESSION' | 'RESULT'
  resetSession?: () => void
}

const DataContext = createContext<DataContextTypes>({})

export const DataProvider = ({ children }: Props) => {
  const [session, setSession] = useState<sessionProps[]>([])
  const [studySet, setStudySet] = useState<studySetProps[] | null>(null)
  const [mode, setMode] = useState<'SESSION' | 'RESULT'>('SESSION')

  useEffect(() => {
    if (studySet) {
      const tempArray = []
      for (let i = 0; i < studySet.length; i++) {
        const element = studySet[i]
        const temp = {
          id: element.id,
          selectedAnswer: '',
          correctAnswer: element.correctAnswer
        }
        tempArray.push(temp)
      }
      setSession(tempArray)
    }
  }, [studySet])

  const handleOnUpdateSession = (id: number, selectedAnswer: string) => {
    const newSession = [...session]
    for (let i = 0; i < newSession.length; i++) {
      if (newSession[i].id === id) {
        newSession[i] = {
          ...newSession[i],
          selectedAnswer
        }
      }
    }
    setSession(newSession)
  }

  const handleOnSubmit = () => {
    setMode('RESULT')
  }

  const resetSession = () => {
    setSession([])
    setMode('SESSION')
  }

  const value = {
    session,
    setSession,
    setStudySet,
    handleOnUpdateSession,
    handleOnSubmit,
    mode,
    resetSession
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataContext
