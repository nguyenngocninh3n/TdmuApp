import { useContext } from 'react'
import { Context } from './Context'

const useCustomContext = () => {
  const [state, dispatch] = useContext(Context)
  return [state, dispatch]
}
export default useCustomContext
