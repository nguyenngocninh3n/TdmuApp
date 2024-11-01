import Navigation from './src/navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
const App = () => {
  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App
