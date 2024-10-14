import { TouchableOpacity, View } from 'react-native'

const RowComponent = ({ children, style, onPress }) => {
  const defaultValue = {
    onPress: () => {},
    styles: {
      flexDirection: 'row'
    }
  }

  const customStyles = [defaultValue.styles, style]

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={customStyles}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={customStyles}>{children}</View>
  )
}

export default RowComponent
