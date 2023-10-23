import axios from '../constants/axios'
import { useAuth } from '../context/AuthContext'
import { GET_NEW_ACCESS_TOKEN_URL } from '../constants/urls'

const useRefreshToken = () => {
  const { setAuthState } = useAuth()

  const refresh = async () => {
    const response = await axios.get(GET_NEW_ACCESS_TOKEN_URL)
    if (setAuthState) {
      setAuthState((prev) => {
        return { ...prev }
      })
    }
  }
}
